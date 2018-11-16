import React from 'react';
import queryString from 'query-string';
import axios from 'axios';
import firebase from 'firebase';


class SyncRedirect extends React.Component {
    state = {

    }

    
    componentWillMount = () => {
        const parsed = queryString.parse(this.props.history.location.search);
        let client = parsed.client
        firebase.firestore().collection('Users').doc(client).collection('Cardio Workouts').get()
            .then(snapshot => {
                if (snapshot.exists) {
                    snapshot.forEach(doc => {
                        console.log(doc)
                    });
                }
                else {
                    console.log('No Workouts')
                }
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    componentDidMount = () => {
        const parsed = queryString.parse(this.props.history.location.search);
        let client = parsed.client
        let code = parsed.code
        this.props.redirectClient(client)

        firebase.firestore().collection('Users').doc(client).collection('Cardio Workouts').orderBy('strava_id', 'desc').limit(1).get()
            .then(snapshot => {
                console.log(snapshot)
                let last_strava_id
                if (!snapshot.empty) {
                    last_strava_id = snapshot.docs[0].data().strava_id
                }
                else {
                    last_strava_id = 0
                }

                axios.post('/stravaDownload', { code: code, max_id: last_strava_id })
                    .then(function (response) {
                        response.data.forEach(workout => {
                            firebase.firestore().collection('Users').doc(client).collection('Cardio Workouts').doc().set(
                                workout
                            )
                        })

                    })
            })
    }
    render() {
        return (
            <div>

            </div>
        )
    }
}
export default SyncRedirect