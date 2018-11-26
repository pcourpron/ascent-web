import React from 'react';
import DNavbar from '../DashboardNavbar/DNavbar'
import StrengthLog from '../StrengthLog/StengthLog';


import 'react-day-picker/lib/style.css';

const styling = {
    options: {
        height: '50px',
        width: '100px',
        backgroundColor: 'whitesmoke',
        borderRadius: '10px'
    }
}

class LogAWorkout extends React.Component {
    constructor(){
        super()
        this.handleDayChange = this.handleDayChange.bind(this)
    }

    state = {
        pickedWorkout: 'strength',
        date: new Date()

    }
    handleWorkoutChoice(workoutType) {
        this.setState({ pickedWorkout: workoutType })
    }

    handleDayChange = (day) => {
        this.setState({ date: day },()=>{
            console.log(this.state)
        });
        
    }
    componentDidMount = () => {
        console.log(this.props)
    }

    render() {
      
        return (
            <div>
                <DNavbar
                    all={this.props.all}
                />
                <div className='container-fluid' style={{ backgroundImage: 'linear-gradient(to right top, #0043a8, #007cdb, #00abc8, #00d27f, #a8eb12)', minHeight: '100vh' }}>
                    <div className='row justify-content-center' style={{ paddingTop: '100px' }}>
                        <div onClick={() => { this.handleWorkoutChoice('strength') }} style={styling.options} className={`d-flex justify-content-center align-items-center`}>
                            <h6> Strength Workout </h6>

                        </div>
                        <div onClick={() => { this.handleWorkoutChoice('cardio') }} style={styling.options} className='d-flex justify-content-center align-items-center'>
                            <h6> Cardio Workout </h6>
                        </div>
                    </div>
                    <div className='row' >
                    
                        <div className='col' style={{ backgroundColor: 'whitesmoke', paddingRight: '20px', borderRadius: '10px', marginRight: '20px' }}>
                            {this.state.pickedWorkout === 'strength' ?
                                <StrengthLog
                                    picked={this.props.all.picked}
                                    date={this.state.date}
                                    handleDayChange = {this.handleDayChange}
                                />

                                :
                                null
                            }
                        </div>



                    </div>

                </div>




            </div>
        )
    }
}

export default LogAWorkout