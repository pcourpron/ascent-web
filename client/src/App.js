import React, { Component } from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import moment from 'moment';


import LandingPage from './components/LandingPage';
import Login from './components/Login/Login.js';
import Dashboard from './components/Dashboard/Dashboard';
import ClientPage from './components/ClientPage/ClientPage';
import LogAWorkout from './components/LogAWorkout/LogAWorkout';
import SyncPage from './components/SyncPage/SyncPage';
import SyncRedirect from './components/SyncRedirect/SyncRedirect';
import SyncingPage from './components/SyncingPage/SyncingPage';
import Scatter from './components/Graph/Graphs'
import LoadingPage from './components/LoadingPage/LoadingPage'


import firebase from 'firebase';
import { firestore } from 'firebase';
import { isThisSecond } from 'date-fns';



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
    stress_scores: [],
    weight: [],
    sleep: [],
    
  }

  handleClientPick(client) {
    this.setState({ picked: client.id, first: client.first, last: client.last }, () => {
      this.getStressScores()
      this.getBodyWeights()
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
        var cardioArrayToday = [];
        var today = new Date()
        var yesterday = new Date(today - 86400000)
        let formattedToday = this.formatDate(today)
        let formattedYesterday = this.formatDate(yesterday)


        snapshot.forEach(doc => {
          let docDate = doc.data().start_date_local.slice(0, 10)
          stressArray.push({ date: docDate, score: doc.data().stress_score })

          if (docDate === formattedYesterday) {
            cardioArrayYesterday.push(doc.data())
          }
          if (docDate === formattedToday) {
            cardioArrayToday.push(doc.data())
          }
        });
        this.setState({ cardioArrayToday: cardioArrayToday })
        this.setState({ cardioArrayYesterday: cardioArrayYesterday })

        var fullStressArray = [];

        for (let i = 0; i < stressArray.length; i++) {

          fullStressArray.push(stressArray[i])

          if (i < stressArray.length - 1) {

            var date1 = moment(stressArray[i].date);
            var date2 = moment(stressArray[i + 1].date);
            var dayDifference = (date2 - date1) / 86400000;

            if (dayDifference > 1) {
              for (let x = 1; x < dayDifference; x++) {
                date1 = moment(date1).add(1, 'days').format('Y-MM-DD')
                fullStressArray.push({ date: date1, score: 0 })

              }
            }
          }

          else {
            // adds zeros to the end of the array to reach today's date if needed.
            let lastWorkoutDate = new Date(stressArray[stressArray.length - 1].date.slice(0, 10));
            let daysSinceLastWorkout = Math.floor((today - lastWorkoutDate) / (1000 * 60 * 60 * 24));
            if (daysSinceLastWorkout > 0) {
              for (let i = 1; i < daysSinceLastWorkout + 1; i++) {
                lastWorkoutDate = moment(lastWorkoutDate).add(1, 'days').format('Y-MM-DD')
                fullStressArray.push({ date: lastWorkoutDate, score: 0 })
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



    for (let i = 0; i < stressArray.length; i++) {

      // Reached the end on the stress Array. We don't want to throw and error 
      // by checking the next index ( doesn't exist)

      if (i === stressArray.length - 1) {
        let date = moment(stressArray[i].date)
        stress = stress + stressArray[i].score
        console.log(stress)

        fitness += (stress - fitness) * fitnessMultiplier;
        fatigue += (stress - fatigue) * faitgueMultiplier;
        freshness = fitness - fatigue;


        fitnessArray.push({ x: date, y: Math.round(fitness) });
        fatigueArray.push({ x: date, y: Math.round(fatigue) })
        freshnessArray.push({ x: date, y: Math.round(freshness) })
      }


      else {

        stress = stressArray[i].score

        if (stressArray[i].date === stressArray[i + 1].date) {
          stress += stressArray[i + 1].score

        }
        else {

          let date = moment(stressArray[i].date)


          fitness += (stress - fitness) * fitnessMultiplier;
          fitnessArray.push({ x: date, y: Math.round(fitness) });

          fatigue += (stress - fatigue) * faitgueMultiplier;
          fatigueArray.push({ x: date, y: Math.round(fatigue) })

          freshness = fitness - fatigue
          freshnessArray.push({ x: date, y: Math.round(freshness) })
        }
      }
    }

    this.setState({ fitness: fitnessArray, fatigue: fatigueArray, freshness: freshnessArray }, () => {
      this.getBodyWeights()
    })


  }

  fillInBodyWeights = () => {
    let fullBodyWeight = [{x: moment('2017-02-08'),y:null}]
    let start = moment(this.state.fitness[0].x._i)
    let weightStart = moment(this.state.weight[0].x._i)
    var dayDifference = (weightStart - start) / 86400000;

    if (dayDifference > 1) {
      for (let x = 1; x < dayDifference; x++) {
        start = moment(start).add(1, 'days').format('Y-MM-DD')
        fullBodyWeight.push({ date: moment(start), y: null })
      }
    }

    this.state.weight.forEach(day=>{
      fullBodyWeight.push(day)
    })
    console.log(fullBodyWeight)
    this.setState({weight:fullBodyWeight},()=>{
      console.log(this.state)
    })
  }

  getBodyWeights = () => {
    firestore().collection('Users').doc(this.state.picked).collection('Body Metrics').orderBy('Date', 'asc').get()
      .then(snapshot => {
        let weightArray = []
        let sleepArray = []
        snapshot.forEach(doc => {
          let placeholderWeight = {};
          let placeholderSleep = {};
          placeholderWeight.x = moment(doc.data().Date.seconds * 1000)
          placeholderWeight.y = doc.data().Weight
          weightArray.push(placeholderWeight)

          placeholderSleep.x = moment(doc.data().Date.seconds * 1000)
          placeholderSleep.y = doc.data().Sleep
          sleepArray.push(placeholderSleep)

        })
        

        this.setState({ weight: weightArray, sleep: sleepArray }, () => {
          this.fillInBodyWeights()
        })
      })
  }
  upLoadClients(clients) {
    this.setState({ clients: clients })
  }

  redirectClient(client) {
    this.setState({ picked: client })
  }



  componentWillMount() {
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({ user: user }, () => {
        console.log(this.state)
      })
    })


  }


  render() {
console.log(this.state)
    return (
      <div>
        <Router>
          <div>
            <Switch>
              <Route exact path="/" render={() => <LandingPage />} />
              {this.state.user === undefined ? <LoadingPage /> : null}
              }
              <Route exact path='/Login' render={(history) => {
                if (this.state.user === null) {
                  return <Login history={history} />
                }
                else {
                  return <Redirect to='/Dashboard' />
                }

              }} />

              {this.state.user === null ? <Redirect to="/Login" /> : null}


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

              <Route exact path='/Graphs' render={(history) => {
                return (<Scatter
                  fitness={this.state.fitness}
                  fatigue={this.state.fatigue}
                  freshness={this.state.freshness}
                  sleep={this.state.sleep}
                  weight={this.state.weight}
                />)
              }} />

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
