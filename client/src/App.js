import React, { Component } from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';



import LandingPage from './components/LandingPage';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import ClientPage from './components/ClientPage/ClientPage';
import LogAWorkout from './components/LogAWorkout/LogAWorkout';
import SyncPage from './components/SyncPage/SyncPage';
import SyncRedirect from './components/SyncRedirect/SyncRedirect';
import SyncingPage from './components/SyncingPage/SyncingPage';
import Scatter from './components/Graph/Graphs'

import firebase from 'firebase';
import { firestore } from 'firebase';



const config = {
  apiKey: "AIzaSyDQSDfPrKEo3mwSOzTQjK2KxaZlIFEey6E",
  authDomain: "ascent-2982c.firebaseapp.com",
  databaseURL: "https://ascent-2982c.firebaseio.com",
  projectId: "ascent-2982c",
  storageBucket: "ascent-2982c.appspot.com",
  messagingSenderId: "101065531447"
};

class App extends Component {
  constructor(props) {
    super(props)
    this.handleClientPick = this.handleClientPick.bind(this);
    this.upLoadClients = this.upLoadClients.bind(this);
    this.redirectClient = this.redirectClient.bind(this);
  }


  state = {
    clients: [],
    first: '',
    last: '',
    picked: '',
    stress_scores: []

  }

  handleClientPick(client) {
    this.setState({ picked: client.id, first: client.first, last: client.last }, () => {
      this.getStressScores()
    })
  }
  
  formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

  getStressScores = () => {
    firestore().collection('Users').doc(this.state.picked).collection('Cardio Workouts').orderBy('start_date_local', 'asc').get()
      .then(snapshot => {
        var stressArray = [];
        var cardioArrayYesterday = [];
        var today = new Date()
        var yesterday = new Date(today- 86400000)
        let formattedToday = this.formatDate(today)
        let formattedYesterday = this.formatDate(yesterday)

        
        snapshot.forEach(doc => {
          let docDate = doc.data().start_date_local.slice(0,10)
          stressArray.push({ date: docDate, score: doc.data().stress_score })
          
          if (docDate === formattedYesterday){
            cardioArrayYesterday.push(doc.data())
          }
        });

        this.setState({cardioArrayYesterday: cardioArrayYesterday})
   

        var fullStressArray = [];

        for (let i = 0; i < stressArray.length; i++) {
          fullStressArray.push(stressArray[i])

          if (i < stressArray.length - 1) {

            var date1 = new Date(stressArray[i].date);
            var date2 = new Date(stressArray[i + 1].date);


            var dayDifference = (date2 - date1) / 86400000;

            if (dayDifference > 1) {
              for (let x = 1; x < dayDifference; x++) {
                if (x === 1) {
                  fullStressArray.push({ date: new Date(date1.setDate(date1.getDate() + 2)), score: 0 })

                }
                else {
                  fullStressArray.push({ date: new Date(date1.setDate(date1.getDate() + 1)), score: 0 })
                }
              }
            }
          }


          else {
            // adds zeros to the end of the array to reach today's date if needed.
            let lastWorkoutDate = new Date(stressArray[stressArray.length - 1].date.slice(0, 10));
            let daysSinceLastWorkout = Math.floor((today - lastWorkoutDate) / (1000 * 60 * 60 * 24));
            if (daysSinceLastWorkout > 0) {
              for (let i = 1; i < daysSinceLastWorkout; i++) {
                if (i === 1) {
                  fullStressArray.push({ date: new Date(lastWorkoutDate.setDate(lastWorkoutDate.getDate() + 2)), score: 0 })

                }
                else {
                  fullStressArray.push({ date: new Date(lastWorkoutDate.setDate(lastWorkoutDate.getDate() + 1)), score: 0 })
                }
              }
            }
          }

        }

        this.setState({ stress_scores: fullStressArray }, () => {
          this.getAllScores()
        })
     

      })

  }

  getAllScores = () => {
    //grab stress scores
    var stressArray = this.state.stress_scores;
    // fitness
    let fitness = 0;
    let fitnessArray = [];
    let fitnessMultiplier = (2 / 43);

    //fatigue
    let fatigue = 0;
    let fatigueArray = [];
    let faitgueMultiplier = (1 / 4);

    // freshness
    let freshness = 0;
    let freshnessArray = []
    let stress

    for (let i = 0; i <= stressArray.length-1; i++) {
      
      if (i === stressArray.length-1){
        console.log(stress)
      fitness += (stress - fitness) * fitnessMultiplier;
      fitnessArray.push(fitness);

      fatigue += (stress - fatigue) * faitgueMultiplier;
      fatigueArray.push(fatigue)

      freshness= fitness - fatigue
      freshnessArray.push(freshness)
      }
      else{
      stress = stressArray[i].score

      if (stressArray[i].date === stressArray[i+1].date){
        stress += stressArray[i+1].score
      }
  
      else{
      fitness += (stress - fitness) * fitnessMultiplier;
      fitnessArray.push(fitness);

      fatigue += (stress - fatigue) * faitgueMultiplier;
      fatigueArray.push(fatigue)

      freshness= fitness - fatigue
      freshnessArray.push(freshness)
      }
    }
  }

    this.setState({ fitness: fitnessArray, fatigue: fatigueArray, freshness: freshnessArray }, () => {
      console.log(this.state)
    })


  }



  upLoadClients(clients) {
    this.setState({ clients: clients })
  }

  redirectClient(client) {
    this.setState({ picked: client }, () => {
      console.log(this.state)
    })
  }



  componentWillMount() {
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }
  }


  render() {
    return (
      <div>
        <Router>
          <div>
            <Switch>
              <Route exact path="/" render={() => <LandingPage />} />

              <Route exact path='/Login' render={(history) => {
                return firebase.auth().onAuthStateChanged(function (user) {
                  if (user === null) {
                    return <Login history={history} />
                  }
                  else {
                    console.log(history)
                    history.history.push('/Dashboard')

                  }
                  return null
                })


              }} />

              {firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                  return null
                }
                else {
                  return <Redirect to='/login' />
                }
              })}


              <Route exact path='/Dashboard' render={() => {
                return (
                  <Dashboard
                    all={this.state}
                    handleClientPick={this.handleClientPick}
                    uploadClients={this.upLoadClients}

                  />)
              }} />

              <Route exact path='/ClientPage' render={() =>
                <ClientPage />
              } />

              <Route exact path='/LogAWorkout' render={() => {
                return (<LogAWorkout all={this.state} />)
              }} />

              <Route exact path='/Sync' render={(history) => {
                return (
                  <SyncPage
                    history={history}
                    all={this.state} />)
              }} />

              <Route path='/redirect_page' render={(history) => {
                return <SyncRedirect
                  redirectClient={this.redirectClient}
                  history={history} />
              }} />

              <Route exact path='/syncingPage' render={(history) => {
                return (<SyncingPage />)
              }} />

              <Route exact path='/Graphs' render = {(history) =>{
                return(<Scatter/>)
              }}/>

              <Route path='*' render={() => {
                return (<Redirect to='/' />)
              }} />

            </Switch>

          </div>
        </Router>


      </div>
    );
  }
}

export default App;
