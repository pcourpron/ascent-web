import React from 'react';
import Navbar from '../ClientPickNavbar/ClientPickNavbar'

class SyncPage extends React.Component {
    render(){
        return(
           
            <div className='container-fluid' style={{backgroundImage: 'url(https://images.unsplash.com/photo-1493690283958-32df2c86326e?ixlib=rb-0.3.5&s=b62d34e46e0ddc9b507068c1aab921f9&auto=format&fit=crop&w=1496&q=80)',minHeight:'100vh'}}>
            <Navbar/>
            <div className = 'row' style={{paddingTop: '100px'}}>
             <h6>Sync with strava: </h6>      <a target='_blank' href={`https://www.strava.com/oauth/authorize?client_id=29032&redirect_uri=http://localhost:3000/redirect_page?client=${this.props.all.picked}&&response_type=code&scope=activity:read_all`}> <button><img alt='strava-logo' style={{height:'25px'}} src='https://help.rideamigos.com/wp-content/uploads/2017/06/strava-logo-jpg.jpg'/></button></a>
            </div>


            </div>
        )
    }
}
export default SyncPage