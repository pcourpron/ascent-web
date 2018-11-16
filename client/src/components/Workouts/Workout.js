import React from 'react';

class Workout extends React.Component {
    render() {
        return (
            <div className='row'>
                <h4 className='w-100 text-center'>{this.props.day}</h4>
                <div className='w-100'>
                    <h5>Cardio Training</h5>
                    {this.props.workouts === undefined ? 'No workout logged' :
                this.props.workouts.map(workout =>{
                    return(<div>
                        <h5>{workout.type}</h5>
                        <h6> Time :{(workout.elapsed_time/60).toFixed(2)} minutes</h6>
                        <h6> Stress Score: {(workout.stress_score).toFixed(2)}</h6>
                    </div>)
                })
                }
                </div>
                <div className='w-100'>
                    <h5>Strength Training</h5>
                    {this.props.strength === undefined ? 'No workout logged' : 'workout'}

                </div>
            </div>

        )

    }
}
export default Workout