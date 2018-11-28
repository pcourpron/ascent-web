import React from 'react';
import Week from './Week'
import { isThisMonth } from 'date-fns';

class WeekCreator extends React.Component {
    state = {
        i: 0,
        weeks: []


    }
    constructor() {
        super()
        this.changeAmount = this.changeAmount.bind(this)
        this.changeLiftName = this.changeLiftName.bind(this)
        this.addALift = this.addALift.bind(this)
        this.addASet = this.addASet.bind(this)
        this.addWeekdayState = this.addWeekdayState.bind(this)


    }

    changeLiftName = (e, day, lift) => {
        var lifts = JSON.parse(JSON.stringify(this.state[day].lifts))

        lifts[lift].name = e.target.value

        this.setState({ [day]: { lifts: lifts } }, () => { console.log(this.state) })



    }
    changeAmount = (e, day, lift, set, value) => {
        var lifts = JSON.parse(JSON.stringify(this.state[day].lifts))
        lifts[lift].sets[set][value] = e.target.value
        this.setState({ [day]: {lifts:lifts} }, () => { console.log(this.state) })
    }

    addALift = (e, day) => {
        e.preventDefault()
        var dayLifts = JSON.parse(JSON.stringify(this.state[day]))

        var newLift = parseInt(Math.max.apply(null, Object.keys(dayLifts.lifts))) + 1

        dayLifts.lifts[newLift] = {
            lift: '',
            sets: {
                1: {
                    amount: '',
                    weight: '',
                    reps: ''
                }

            }
        }
        this.setState({ [day]: dayLifts })

    }


    addASet = (e, day, lift) => {
        e.preventDefault()
        console.log(this.state[day].lifts)

        var oldLift = JSON.parse(JSON.stringify(this.state[day].lifts[lift]))

        var newSet = parseInt(Math.max.apply(null, (Object.keys(oldLift.sets)))) + 1
        console.log(newSet)

        oldLift.sets[newSet] = {
            amount: '',
            weight: '',
            reps: ''
        }

        var oldLifts = JSON.parse(JSON.stringify(this.state[day]))

        console.log(oldLift)
        oldLifts.lifts[lift] = oldLift
        console.log(oldLifts)

        this.setState({ [day]: oldLifts }, () => {
            console.log(this.state)
        })

    }




    addWeekdayState = () => {

        let daysPicked = this.props.daysPicked.sort(function (a, b) { return (a - b) })

        for (let index = 0; index < this.props.weeks; index++) {
            daysPicked.forEach(day => {
                this.setState({
                    [day]: {
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
                        }
                    }
                })

            })

        }
    }


    handleSubmit= (event)=> {
        event.preventDefault();
        let daysPicked = this.props.daysPicked.sort(function (a, b) { return (a - b) })
        let placeholderObject = {}

        daysPicked.forEach(day=>{
            placeholderObject[day] = this.state[day]
        })
        var array = JSON.parse(JSON.stringify(this.state.weeks))
        array.push(placeholderObject)
        this.setState({ i: this.state.i + 1,weeks:array})
        this.addWeekdayState()
    }

    previousWeek = ()=>{
        this.setState({ i: this.state.i - 1 },()=>{
            console.log(this.state.weeks[this.state.i])
        if (this.state.weeks[this.state.i]!==undefined){
           Object.keys(this.state.weeks[this.state.i]).map((objectKey, index)=> {
                this.setState({[objectKey]:this.state.weeks[this.state.i][objectKey]})
        
            })};
        })
    }

    componentWillMount = () => {
        this.addWeekdayState()
    }

    render() {


        console.log(this.state)

        let weekNumberArray = []
        for (let index = 0; index < this.props.weeks; index++) {
            weekNumberArray.push(index + 1);
        }
        let daysPicked = this.props.daysPicked.sort(function (a, b) { return a - b })
        let letterDaysPicked = []
        daysPicked.forEach(day => {
            switch (day) {
                case 1:
                    letterDaysPicked.push({ day: 'Monday', value: 1 })
                    break;
                case 2:
                    letterDaysPicked.push({ day: 'Tuesday', value: 2 })
                    break;
                case 3:
                    letterDaysPicked.push({ day: 'Wednesday', value: 3 })
                    break;
                case 4:
                    letterDaysPicked.push({ day: 'Thursday', value: 4 })
                    break;
                case 5:
                    letterDaysPicked.push({ day: 'Friday', value: 5 })
                    break;
                case 6:
                    letterDaysPicked.push({ day: 'Saturday', value: 6 })
                    break;
                case 0:
                    letterDaysPicked.push({ day: 'Sunday', value: 0 })
                    break;
                default:
                    break;
            }
        })
        

        return (
            <div>

                {weekNumberArray.map((element, index) => {
                    return (
                        <div>
                        {index === this.state.i ?
                        <Week
                            element={element}
                            letterDaysPicked={letterDaysPicked}
                            state={this.state}
                            addALift={this.addALift}
                            addASet={this.addASet}
                            addWeekdayState={this.addWeekdayState}
                            changeLiftName = {this.changeLiftName}
                            changeAmount = {this.changeAmount}
                            handleSubmit = {this.handleSubmit}
                            previousWeek = {this.previousWeek}
                        />: null}
                        </div>

                    )
                })

                }


            </div>)
    }
}

export default WeekCreator