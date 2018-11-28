import React from 'react';
import DNavbar from '../DashboardNavbar/DNavbar'
import StrengthLog from '../StrengthLog/StengthLog';
import { Alert } from 'reactstrap';


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
    constructor() {
        super()
        this.handleDayChange = this.handleDayChange.bind(this)
        this.pickDay = this.pickDay.bind(this)
        this.onDismiss = this.onDismiss.bind(this);
        this.handleWeekChange = this.handleWeekChange.bind(this)
    }

    state = {
        pickedWorkout: 'strength',
        date: '',
        daysPicked: [],
        invalid: false,
        stage: 1,
        weeks: 1,


    }
    handleWorkoutChoice(workoutType) {
        this.setState({ pickedWorkout: workoutType })
    }

    pickDay = (day) => {
        var days = this.state.daysPicked
        var index = days.indexOf(day)
        if (index === -1) {
            days.push(day)
            this.setState({ daysPicked: days })
        }
        else {
            days.splice(index, 1)
            this.setState({ daysPicked: days })
        }
    }


    handleDayChange = (day) => {
        this.setState({ date: day });

    }

    handleWeekChange =(event) =>{
        this.setState({weeks: event.target.value})
    }
    handleNext = () => {
        switch (this.state.stage) {
            case 1:
                if (this.state.daysPicked.length < 3) {
                    this.setState({ invalid: 'Pick more workout days!'})
                }
                else if (this.state.date === '') {
                    this.setState({invalid:'Pick a start date!'})
                }
                else (
                    this.setState({ stage: this.state.stage + 1 },()=>{
                        console.log(this.state)
                    })
                )



                break;
            
            case 2 :
            break;
            default:
                break;
        }


    }
    handleBack = ()=>{
        this.setState({stage: this.state.stage -1 })
    }
    onDismiss() {
        this.setState({ invalid: false });
    }

    render() {

        return (
            <div>
               
                <div className='container-fluid' style={{ backgroundImage: 'linear-gradient(to right top, #0043a8, #007cdb, #00abc8, #00d27f, #a8eb12)', minHeight: '100vh' }}>

                    <div className='row' style={{ paddingTop: '100px' }}>

                        <div className='col' style={{ backgroundColor: 'whitesmoke', paddingRight: '20px', borderRadius: '10px', margin: '0 20px' }}>
                            {this.state.pickedWorkout === 'strength' ?
                                <StrengthLog
                                    picked={this.props.all.picked}
                                    date={this.state.date}
                                    handleDayChange={this.handleDayChange}
                                    pickDay={this.pickDay}
                                    daysPicked={this.state.daysPicked}
                                    handleNext={this.handleNext}
                                    stage={this.state.stage}
                                    handleWeekChange={this.handleWeekChange}
                                    weeks= {this.state.weeks}
                                    handleBack = {this.handleBack}
                                />
                                :
                                null
                            }
                        </div>



                    </div>
                    <div className='row justify-content-center'>
                        {this.state.invalid ?
                            <Alert key='alert' color="danger" style={{ marginTop: '20px', width: '300px' }} toggle={this.onDismiss}>
                                <span className='text-center'> {this.state.invalid}</span>
                            </Alert> :
                            null
                        }
                    </div>
                </div>




            </div>
        )
    }
}

export default LogAWorkout