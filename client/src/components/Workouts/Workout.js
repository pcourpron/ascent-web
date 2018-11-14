import React from 'react';

class Workout extends React.Component {
    render() {
        return (
            <div className='row'>
                <h4 className='w-100 text-center'>{this.props.day}</h4>
                <div className='w-100'>
                    <h5>Cardio Training</h5>
                    {this.props.cardio === undefined ? 'No workout logged' : 'workout'}
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