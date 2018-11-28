import React from 'react';
import queryString from 'query-string';
import axios from 'axios';
import firebase from 'firebase';
import Navbar from '../ClientPickNavbar/ClientPickNavbar'


class SyncRedirect extends React.Component {
    state = {

    }

    
    componentWillMount = () => {
        const parsed = queryString.parse(this.props.history.location.search);
        let client = parsed.client
        console.log(client)
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
            <div className='container-fluid' style={{ height: '100vh', backgroundImage: 'url(https://images.unsplash.com/photo-1493690283958-32df2c86326e?ixlib=rb-0.3.5&s=b62d34e46e0ddc9b507068c1aab921f9&auto=format&fit=crop&w=1496&q=80)' }}>
            <Navbar/>
            <div className='row justify-content-center align-items-center h-100'>
                <div className='col-md-4 align-items-center'>
                 <div className='row justify-content-center'><h3 className='text-centeer text-white'> Workouts Loaded</h3></div> 
                 <div className='row justify-content-center'><h3 className='text-centeer text-white'> Please close out this window.</h3></div> 
                
                </div>

            </div>
        </div>
        )
    }
}
export default SyncRedirect