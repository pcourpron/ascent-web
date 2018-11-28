const router = require("express").Router();
const axios = require('axios')

const firebase = require('firebase')

const config = {
    apiKey: "AIzaSyDQSDfPrKEo3mwSOzTQjK2KxaZlIFEey6E",
    authDomain: "ascent-2982c.firebaseapp.com",
    databaseURL: "https://ascent-2982c.firebaseio.com",
    projectId: "ascent-2982c",
    storageBucket: "ascent-2982c.appspot.com",
    messagingSenderId: "101065531447"
};


if (!firebase.apps.length) {
    firebase.initializeApp(config);
}
const firestore = firebase.firestore()
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

router.get('/test',(req,res)=>{
    res.send('hi')
})

router.post('/stravaDownload', (req, res) => {
    // Strava OAuth process
    axios.post(`https://www.strava.com/oauth/token?client_id=29032&client_secret=0f9f5324b2a4ee9c2c68fcacf7013755710a91ec&code=${req.body.code}`)
        //Strava response
        .then(function (token_response) {
            // Grab user access token
            let user_access_token = token_response.data.access_token

            // Grab past 200 activities from strava
            axios.get(`https://www.strava.com/api/v3/athlete/activities?access_token=${user_access_token}&per_page=200`)
                // Strava response
                .then(function (activities) {
                    // Unwrap parameters to filter out information we want
                    let unwrap = ({ distance, has_heartrate, elapsed_time, type, start_date_local, heartrate_data, heartrate_time, strava_id }) => ({ distance, has_heartrate, elapsed_time, type, start_date_local, heartrate_data, heartrate_time, strava_id });

                    // Workouts to add to firestore
                    var workouts = []

                    var workoutsLength = 0
                    var allWorkoutsAdded = 0

                    //Promise to make sure that we grab all of the information
                    let responsePromise = new Promise(function (resolve, reject) {
                        activities.data.forEach(workout => {
                            if (!(req.body.max_id >= workout.id)) {

                                workoutsLength++
                                // grab workout id
                                let strava_id = workout.id;

                                // grab heartrate if it's there. 
                                if (workout.has_heartrate === true) {
                                    axios.get(`https://www.strava.com/api/v3/activities/${workout.id}/streams?access_token=${user_access_token}&keys=heartrate&key_by_type=true`)
                                        .then(function (response) {
                                            // set heartrate array in the workout object
                                            workout.heartrate_data = response.data.heartrate.data
                                            // set strava id in the workout object
                                            workout.strava_id = strava_id
                                            // add workout to workouts array
                                            workouts.push(unwrap(workout))

                                            allWorkoutsAdded++
                                            // Check to make sure all the workouts have been added
                                            if (allWorkoutsAdded === workoutsLength) {
                                                resolve(workouts)
                                            }
                                        })
                                        .catch(function (err) {
                                            console.log(err)
                                        })
                                }

                                // Else to heartrate present
                                else {
                                    // Adding workouts even without heartrate
                                    workouts.push(unwrap(workout))
                                    // Adding strava id to workout
                                    workout.strava_id = strava_id
                                    allWorkoutsAdded++
                                    if (allWorkoutsAdded === workoutsLength) {
                                        resolve(workouts)
                                    }
                                }
                            }
                        });
                    });

                    responsePromise.then((workouts) => {
                        res.send(workouts)
                    })
                })
        })
})


router.post('/getScores', (req, res) => {
    firebase.firestore().collection('Users').doc(req.body.client).collection('Cardio Workouts').orderBy('start_date_local', 'asc').get()
        .then(snapshot => {
            var array= []
            snapshot.forEach(doc => {
                array.push({date:doc.data().start_date_local, score: doc.data().stress_score})
            });
            res.send(array)

        })
        .catch((err) => { 
            res.send(err) })
})


router.put('/updateScores', (req, res) => {
    firestore.collection('Users').doc(req.body.client).collection('Cardio Metrics').get()
        .then(snapshot => {
            var max_heartrate = snapshot.docs[0].data().max_heartrate
            var lthr = max_heartrate*.9
            firestore.collection('Users').doc(req.body.client).collection('Cardio Workouts').orderBy('start_date_local', 'asc').get()
                .then(snapshot => {
                    snapshot.forEach(doc => {
                        let doc_id = doc.id;
                        let heartrate = doc.data().heartrate_data;
                        if (heartrate !== undefined){
                        let stressScore = 0;
                        heartrate.forEach(sec =>{
                            if(sec < lthr*.75){
                                stressScore += 20/3600
                            }
                            //zone 1b
                            else if (sec >= lthr*.75 &  sec < lthr*.78){
                                stressScore += 30/3600
                            }
                            //zone 1c
                            else if (sec >= lthr*.78 &  sec < lthr*.81){
                                stressScore += 40/3600  
                            }
                            //zone 2 low
                            else if (sec >= lthr*.81 &  sec < lthr*.845){
                                stressScore += 50/3600
                            }
                            //zone 2 high
                            else if (sec >= lthr*.845 &  sec < lthr*.88){
                                stressScore += 60/3600
                            }
                            //zone 3
                            else if (sec >= lthr*.88 &  sec < lthr*.93){
                                stressScore += 70/3600
                            }
                            //zone 4
                            else if (sec >= lthr*.93 &  sec < lthr*1.00){
                                stressScore += 80/3600
                            }
                            //zone 5a
                            else if (sec >= lthr*1.00 &  sec < lthr*1.025){
                                stressScore += 100/3600
                            }
                            //zone 5b
                            else if (sec >= lthr*1.025 &  sec < lthr*1.05){
                                stressScore += 120/3600
                            }
                            // zone 5b
                            else if (sec >= lthr*1.05){
                                stressScore += 140/3600
                            }

                        })
                        
                        firestore.collection('Users').doc(req.body.client).collection('Cardio Workouts').doc(doc_id).update({stress_score:stressScore})
                    }
                    else{}

                    });
                    res.send('yay')

                })
                .catch((err) => res.send(err) )

        })
})





module.exports = router