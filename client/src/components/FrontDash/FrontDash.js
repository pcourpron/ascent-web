import React from 'react';
import CardioScores from '../CardioScores/CardioScores.js';
import Metrics from '../Metrics/Metrics';
import Workout from '../Workouts/Workout';
import Body from '../Body/Body'

class FrontDash extends React.Component {

    render() {
        return (
            <div>
                <div className='row justify-content-center align-items-center'  >
                    <div style={{ height: '80px', width: '80px', zIndex: '10', borderRadius: '40px', backgroundColor: 'grey' }}></div>
                    <h3 style={{ marginLeft: '15px', zIndex: '10' }}>{`${this.props.first} ${this.props.last}`}</h3>
                </div>
                <div className='row'>
                    <div className='col'>
                        <Workout
                            day={`Today's Workouts`}
                            workout = {this.props.all.cardioArrayToday}
                        />
                    </div>

                    <div className='col d-flex justify-content-center flex-wrap'>

                        <h3 className='w-100 text-center' >Cardio Scores</h3>
                        <CardioScores
                            all={this.props.all}
                        />
                        <Metrics />

                    </div>


                    <div className='col'>
                        <h3 className='w-100 text-center'> Muscle Stress</h3>
                        <Body />


                    </div>

                </div>
                {/*<div className='row' style={{ marginTop: '20px', padding: '0px 20px' }}>

                    <div className='col'>
                        <Workout
                            day={`Yesterday's Workout`}
                            workouts={this.props.all.cardioArrayYesterday}
                        />
                    </div>


                    <div className='col'>
                       

                    </div>


                    <div className='col'>
                        <Workout
                            day={`Tomorrow's Workout`}
                        />
                    </div>

        </div>*/}
            </div>
        )
    }
}

export default FrontDash