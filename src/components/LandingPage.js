import React from 'react';
import NavbarTop from './Navbar';

const LandingPage = ()=>{
    return(
    <div>
        <NavbarTop/>
   

  
  

    <div className="parallax">
    <div className="container" style={{height:'100%'}}>
    <div className='row justify-content-center' style={{height:'100%'}}>
    <div className='col-sm-6 d-flex flex-wrap align-content-center justify-content-center' style= {{height:'100%'}} >
 
        <h1 style ={{color:'#D9B310'}}>Introducing Ascent</h1>
        <div className="row">
          <h5 style={{color:'white'}}> Taking data visualization and analytics to training and fitness.</h5>
        </div>
        <div className="row justify-content-center" style={{width:'100%'}}>
      
          <p className=" btn btn-lg btn-success" style={{border: 'none',marginTop:'30px', padding:'10px 15px', backgroundColor:'teal'}}>Get Started</p> 
        </div>
        </div>
        </div>
      </div>
      </div>


  <div className="container">
    <div className="section">
      <div className="row">
        <div className="col-md-4" style={{marginTop:'10px'}}>
            <div className ='row justify-content-center'>
            <i class="fas fa-bolt fa-3x" style={{marginBottom:'10px'}}></i>

            </div>
            <div className = 'row justify-content-center'>
            <h5 >Speed up Results</h5>
            <p className='text-center' style={{padding:'0 10px'}}>We do most of the heavy lifting for you and your clients.
            With a Web application for in depth analysis for trainers to better understand
            their clients' lifestyle and a mobile app to connect directly to their clients,
            keeping track of your client's progress has never been easier.
            </p>
            </div>
   
        </div>

        <div className="col-md-4" style={{marginTop:'10px'}}>
        <div className ='row justify-content-center'>
        <i class="far fa-user fa-3x" style={{marginBottom:'10px'}}></i>
        </div>
        <div className = 'row justify-content-center'>
            <h5 >User Experience</h5>

             <p className='text-center' style={{padding:'0 10px'}}>

            Our IOS App is designed with simplicity in mind. With most of the data coming from apps you 
            already use (Strava, Apple Health Kit,...) and more coming, clients will have little extra 
            data to manually upload. 
    
           </p>
           </div>
          </div>


        <div className="col-md-4" style= {{marginTop: '10px'}}>
            <div className ='row justify-content-center'>

            <i class="fas fa-sliders-h fa-3x" style={{marginBottom:'10px'}}></i>
            </div>
            <div className='row justify-content-center'>
            <h5 className="center">Customizable</h5>

             <p className='text-center' style={{padding:'0 10px'}}>
            Trainers can customize the data they wish they track from their clients,
            as well as what data they wish to see and display.
            
            </p>
          </div>
        </div>
      </div>

    </div>
  </div>
  
  </div>




    )
}

export default LandingPage