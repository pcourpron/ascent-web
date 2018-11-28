import React from 'react';

class Workout extends React.Component {
    render() {

        return (

            <div className='row'>
                <div className='col'>
                    <div className='row justify-content-center' >
                        <h4>{this.props.day}</h4>
                    </div>
                    <div className='row justify-content-center' style={{marginTop:'30px'}}>
                        <h5>Cardio Training</h5>
                    </div>
                    <div className='row justify-content-center'>
                        {this.props.workout === undefined ? 'No workout logged' :
                            this.props.workout.map(workout => {
                                return (<div>
                                    <h5>{workout.type}</h5>
                                    <h6> {`Time: ${Math.round(workout.elapsed_time / 60)} minutes`}</h6>
                                    <h6> Stress Score: {(workout.stress_score).toFixed(2)}</h6>
                                </div>)
                            })
                        }
                    </div>
                    <div className='row justify-content-center' style={{marginTop:'30px'}}>
                        <h5>Strength Training</h5>
                        </div>
                    <div className='row justify-content-center'>

                        {this.props.strength === undefined ? 'No workout logged' : 'workout'}

                    </div>
                </div>
            </div>

        )

    }
}
export default Workout