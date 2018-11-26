import React from 'react';
import firebase from 'firebase'
import { firestore } from 'firebase';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import Weekday from './weekday'
import { isThisSecond } from 'date-fns';


class StrengthLog extends React.Component {
    state = {
        lifts: {
            1: {
                name: '',
                sets: {
                    1: {
                        amount: '',
                        weight: '',
                        reps: ''
                    },

                }
            }
        },
        daysPicked: []
    }
    constructor() {
        super()
        this.pickDay = this.pickDay.bind(this)
    }

    addASet = (e, lift) => {
        e.preventDefault()
        var oldLift = JSON.parse(JSON.stringify(this.state.lifts[lift]))
        var newSet = parseInt(Math.max.apply(null, (Object.keys(oldLift.sets)))) + 1

        oldLift.sets[newSet] = {
            amount: '',
            weight: '',
            reps: ''
        }

        var oldLifts = JSON.parse(JSON.stringify(this.state.lifts))


        oldLifts[lift] = oldLift

        this.setState({ lifts: oldLifts }, () => {
            console.log(this.state)
        })

    }

    addALift = (e) => {
        e.preventDefault()
        var lifts = JSON.parse(JSON.stringify(this.state.lifts))

        var newLift = parseInt(Math.max.apply(null, Object.keys(lifts))) + 1

        lifts[newLift] = {
            lift: '',
            sets: {
                1: {
                    amount: '',
                    weight: '',
                    reps: ''
                }

            }
        }
        this.setState({ lifts: lifts })

    }

    changeLiftName = (e, lift) => {
        var lifts = this.state.lifts
        lifts[lift].name = e.target.value
        this.setState({ lifts: lifts }, () => { console.log(this.state) })

    }
    changeAmount = (e, lift, set, value) => {
        var lifts = this.state.lifts
        lifts[lift].sets[set][value] = e.target.value
        this.setState({ lifts: lifts }, () => { console.log(this.state) })
    }
    handleSubmit = (event) => {
        event.preventDefault()
        firebase.firestore().collection('Users').doc(this.props.picked).collection('Workouts').doc().set({ lifts: this.state.lifts, date: this.props.date })
    }

    pickDay = (day) => {
        var days = this.state.daysPicked
        var index = days.indexOf(day)
        if (index === -1) {
            days.push(day)
            this.setState({ daysPicked: days }, () => {
                console.log(this.state)
            })
        }
        else {
            days.splice(index, 1)
            this.setState({ daysPicked: days })
        }




    }

    componentDidMount() {
        console.log(this.props)
    }



    render() {

        var days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat']

        return (
            <div>
                <div className='row justify-content-center' style={{ marginTop: '10px' }}>
                    <h3> Create a lifting program </h3>
                </div>
               
                <div className='row justify-content-around'>
                    <div className='col-sm-4 '>
                        <div className='row justify-content-center'>
                            <h6>Pick a start day</h6>
                        </div>

                        <div className='row justify-content-center'>
                            <DayPickerInput onChange={this.props.handleDayChange} />
                        </div>
                    </div>
                    <div className='col-sm-5'>
                        <div className='row justify-content-center'>
                            <h5>Pick your workout days</h5>
                        </div>
                        <div className='row justify-content-center'>
                            {days.map(day => {
                                return <Weekday
                                    day={day}
                                    picked={this.state.daysPicked.indexOf(day) === -1 ? false : true}
                                    pickDay={this.pickDay} />
                            })}
                        </div>
                    </div>
                </div>

                <div className='row justify-content-center' style={{ marginTop: '20px' }}>

                </div>




                <form onSubmit={this.handleSubmit}>
                    <button onClick={this.addALift}> Add a Lift </button>
                    <button className='btn btn-primary' type='submit'>Submit</button>

                    {/*   Going through each individual lift    */}
                    {Object.keys(this.state.lifts).map(lift => {
                        return (
                            <div className='row' style={{ marginTop: '20px' }}>
                                <div className='col-sm-3 align-items-start' style={{ height: '100%' }}>
                                    <input name={lift} placeholder='Lift' onChange={(e) => { this.changeLiftName(e, lift) }} required />
                                    <button className='btn btn-success' onClick={(e) => { this.addASet(e, lift) }} style={{ marginBottom: '15px' }}>Add a Set</button>
                                </div>


                                {/* Going through the sets of the lift */}
                                <div className='col-sm-9' style={{ marginBottom: '15px' }}>
                                    {Object.keys(this.state.lifts[lift].sets).map(set => {
                                        return (
                                            <div className='row'>
                                                <input placeholder='Sets' onChange={(e) => { this.changeAmount(e, lift, set, 'amount') }} required />
                                                <input placeholder='Reps' onChange={(e) => { this.changeAmount(e, lift, set, 'reps') }} required />
                                                <input placeholder='Weight' onChange={(e) => { this.changeAmount(e, lift, set, 'weight') }} required />
                                            </div>
                                        )
                                    })}
                                </div>



                            </div>
                        )

                    })}
                </form>
            </div >
        )
    }
}

export default StrengthLog