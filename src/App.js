import React, { Component } from 'react';
import './App.css';
import { Route, Switch} from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Login from './components/Login/Login'

var config = {
  apiKey: "AIzaSyDQSDfPrKEo3mwSOzTQjK2KxaZlIFEey6E",
  authDomain: "ascent-2982c.firebaseapp.com",
  databaseURL: "https://ascent-2982c.firebaseio.com",
  projectId: "ascent-2982c",
  storageBucket: "ascent-2982c.appspot.com",
  messagingSenderId: "101065531447"
};
/*
firebase.initializeApp(config);
const firestore = firebase.firestore();
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);
*/
class App extends Component {
  componentDidMount(){
    /*
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log(user)
      } else {
        console.log('hit')
      }
    });*/
  }
  render() {
    return (
      <div>
        <Router>
        <div>
          <Switch>
            <Route exact path="/" render={() => <LandingPage/>} />
            <Route exact path='/Login' render ={()=><Login/>}/>
          </Switch>
        </div>
      </Router>
            

      </div>
    );
  }
}

export default App;
