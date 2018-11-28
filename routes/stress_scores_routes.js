const router = require("express").Router();
const axios = require('axios')
const inolChart = require('../INOL/inol.json')
const exerciseCoef = require('../INOL/exerciseCoefficient.json')
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


const musclesTargeted = {
    "Front Squat": { primary: ['quadriceps', 'glutes'], assistive: ['abdominis', 'erector'] },
    "Hang Clean": { primary: ['hamstrings', 'glutes'], assistive: ['calves', 'trapezius', 'erector', 'quadriceps'] },
    "RDL": { primary: ['hamstrings', 'glutes'], assistive: ['erector', 'trapezius'] }

}



router.post('/getLiftingScores', (req, res) => {
    let primaryLifts = req.body.primaryLifts;
    let assistiveLifts = req.body.assistiveLifts;
    let musclesUsed = []
    let placeholderMuscles = {};

    primaryLifts.forEach(lift => {

        let liftName = Object.keys(lift)[0];

        lift[liftName].forEach(set => {
            let musclesUsed = []
            let score = 0;

            // geting the adjusted INOL score for each rep of each set
            for (let rep = 0; rep < set.reps; rep++) {
                score += inolChart[set.percentage][rep] / (100 - set.percentage) * 1.13;
            }

            //multiplying the reps by the number of sets performed
            score = score * set.sets
           
            // get the primary and secondary muscles targeted
            let primaryMuscles = musclesTargeted[liftName].primary
            let assistiveMuscles = musclesTargeted[liftName].assistive
            
            // for each primary muscle, we either create the score or add to it
            primaryMuscles.forEach(muscle => {
                if (placeholderMuscles[muscle] === undefined) {
                    placeholderMuscles[muscle] = score
                }
                else {
                    placeholderMuscles[muscle] = score + placeholderMuscles[muscle]
                }
            })

            // for each assistive muscule, we either create the score or add to it
            assistiveMuscles.forEach(muscle => {
                if (placeholderMuscles[muscle] === undefined) {
                    placeholderMuscles[muscle] = score * .75
                }
                else {
                    placeholderMuscles[muscle] = score * .75 + placeholderMuscles[muscle]
                }
            })

            // placeholderMuscles[liftName] = score * (set.sets);
            // placeholderMuscles[liftName] = placeholderMuscles * set.sets
            console.log(placeholderMuscles)
            // console.log(liftName)
            // console.log(score*set.sets/(100-set.percentage)*1.13* exerciseCoef[liftName])

        })


    })
    console.log(placeholderMuscles)

    assistiveLifts.forEach(lift => {
    })



    res.send(inolChart)
})

router.put('/addINOLScores', (req, res) => {
    let workout = req.body.workout
    firestore.collection('Users').doc('o08zN3ShilgKq2hSwscQy95Kx1L2').collection('Workouts').doc(workout).get().then(
        snapshot => {
            var lifts = snapshot.data().lifts;
            var keys = Object.keys(lifts);

            let musclesUsed = {};
            keys.forEach(key => {
                let name = lifts[key].name;
                let setkeys = Object.keys(lifts[key].sets);
                let primaryMuscles = musclesTargeted[name].primary;
                let assistiveMucles = musclesTargeted[name].assistive;
                let placeholderMuscles = musclesUsed;

                setkeys.forEach(group => {
          
                    let score = 0;
                    var sets = lifts[key].sets[group];
                    var amount = sets.amount;
                    var reps = sets.reps;
                    var percentage = sets.percentage;

                    for (let rep = 0; rep < reps; rep++) {
                        score += inolChart[percentage][rep] / (100 - percentage) * 1.13 * exerciseCoef[name] ;
                    }
                    

                    primaryMuscles.forEach(muscle => {
                        if (placeholderMuscles[muscle] === undefined) {
                            placeholderMuscles[muscle] = score * amount
                        }
                        else {
                            placeholderMuscles[muscle] = score * amount + placeholderMuscles[muscle]
                        }
                    })

                    assistiveMucles.forEach(muscle => {
                        if (placeholderMuscles[muscle] === undefined) {
                            placeholderMuscles[muscle] = score * .8 * amount
                        }
                        else {
                            placeholderMuscles[muscle] = score * .8  * amount + placeholderMuscles[muscle]
                        }
                    })

                })
            

   
            })
            console.log(musclesUsed)
            console.log(snapshot.data().lifts)
        }


    )
    res.send('hi')
})

router.post('/addWeight', (req, res) => {
    req.body.forEach(day=>{
        firestore.collection('Users').doc('o08zN3ShilgKq2hSwscQy95Kx1L2').collection('Body Metrics').add({
            Date: new Date(day.Date),
            Weight: parseFloat(day.Weight.toFixed(2)),
            Sleep: day.Sleep
        }).catch(()=>{
            res.send('nope!')
        })
    })
    res.send('yay!')
})


module.exports = router