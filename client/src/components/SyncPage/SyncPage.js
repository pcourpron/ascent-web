import React from 'react';

class SyncPage extends React.Component {
    render(){
        return(
            <div className='container-fluid' style={{backgroundImage: 'linear-gradient(to right top, #0043a8, #007cdb, #00abc8, #00d27f, #a8eb12)',minHeight:'100vh'}}>
            <div className = 'row' style={{paddingTop: '100px'}}>
            <a target='_blank' href='https://www.strava.com/oauth/authorize?client_id=29032&redirect_uri=http://localhost:3000&response_type=code&scope=activity:read_all'> <img alt='strava-logo' style={{height:'25px'}} src='https://help.rideamigos.com/wp-content/uploads/2017/06/strava-logo-jpg.jpg'/></a>
            </div>


            </div>
        )
    }
}
export default SyncPage