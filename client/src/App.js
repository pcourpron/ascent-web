import React, { Component } from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';



import LandingPage from './components/LandingPage';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import ClientPage from './components/ClientPage/ClientPage'
import LogAWorkout from './components/LogAWorkout/LogAWorkout'
import SyncPage from './components/SyncPage/SyncPage'

import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDQSDfPrKEo3mwSOzTQjK2KxaZlIFEey6E",
  authDomain: "ascent-2982c.firebaseapp.com",
  databaseURL: "https://ascent-2982c.firebaseio.com",
  projectId: "ascent-2982c",
  storageBucket: "ascent-2982c.appspot.com",
  messagingSenderId: "101065531447"
};

class App extends Component {
  constructor(props){
    super(props)
    this.handleClientPick = this.handleClientPick.bind(this)
    this.upLoadClients = this.upLoadClients.bind(this)
}


  state = {
    clients: [],
    first: '',
    last: '',
    picked: ''

}

handleClientPick(client){
    this.setState({picked: client.id })
    this.setState({first : client.first })
    this.setState({last : client.last })
}

upLoadClients(clients){
  this.setState({clients: clients})
}



  componentWillMount() {

    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }
  

  }


  render() {
    console.log(this.state)
    return (
      <div>
        <Router>
          <div>
            <Switch>
              <Route exact path="/" render={() => <LandingPage />} />

              <Route exact path='/Login' render={(history) => {
                return firebase.auth().onAuthStateChanged(function(user){
                  if (user === null){
                    return <Login history = {history}/>
                  }
                  else {
                    console.log(history)
                    history.history.push('/Dashboard')
              
                  }
                  return null
                })
                
                
              }}/>
 
            {firebase.auth().onAuthStateChanged(function(user){
                if (user){
                  return null
                }
                else{
                  return <Redirect to='/login'/>
                }
              })}   


              <Route exact path='/Dashboard' render={() => {
              return(
              <Dashboard 
                all = {this.state}
                handleClientPick = {this.handleClientPick}
                uploadClients = {this.upLoadClients}

              />)}} />

              <Route exact path='/ClientPage' render={()=>
                <ClientPage/>
              }/>

              <Route exact path ='/LogAWorkout' render= {()=> {
              return(<LogAWorkout all= {this.state} />)
              }}/>
            
            <Route exact path ='/Sync' render= {()=> {
              return(<SyncPage all= {this.state} />)
              }}/>
            

            </Switch>

          </div>
        </Router>


      </div>
    );
  }
}

export default App;
