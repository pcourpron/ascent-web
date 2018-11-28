import React from 'react';
import firebase from 'firebase'
import Weekday from './weekday'
import PickADay from './PickADay'
import posed, { PoseGroup } from 'react-pose';
import WeekCreator from '../WeekCreator/WeekCreator'


class StrengthLog extends React.Component {



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



    render() {

        const { stage } = this.props;
        let Transition = posed.div({
            enter: {
                x: 0,
                opacity: 1,
                delay: 300,
                transition: ({ from, to }) => {

                    return ({
                        type: 'keyframes',
                        values: [500, to],
                        times: [0, 1],
                        duration: 1000
                    }
                    )
                }
            }
            ,
            exit: {
                x: -500,
                opacity: 0,
                transition: { duration: 500 }
            }
        });



        return (
            <div className='container-fluid'>
                <PoseGroup>
                    {stage === 1 &&
                        [<Transition key="shade">
                            <PickADay
                                next={this.next}
                                handleDayChange={this.props.handleDayChange}
                                handleWeekChange={this.props.handleWeekChange}
                                date={this.props.date}
                                weeks={this.props.weeks} /></Transition>,


                        <Transition key="shade1" >
                            <Weekday
                                pickDay={this.props.pickDay}
                                daysPicked={this.props.daysPicked}
                            />
                            <div key='button' className='row justify-content-center' style={{ margin: '20px 0' }}>
                                <button class='btn btn-outline-primary' type='submit' onClick={this.props.handleNext}> Next</button>
                            </div>
                        </Transition>

                        ]}
                    {stage === 2 &&
                        <Transition key='third'><WeekCreator key='weekcreator'
                            weeks={this.props.weeks}
                            daysPicked={this.props.daysPicked} />
                            <div key='button' className='row justify-content-center' style={{ margin: '20px 0' }}>
                                <button class='btn btn-outline-danger' type='submit' onClick={this.props.handleBack} style={{ marginRight: '20px' }}> Back</button>
                                <button class='btn btn-outline-primary' type='submit' onClick={this.props.handleNext}> Next</button>

                            </div>
                        </Transition>
                    }



                </PoseGroup>


            </div >
        )
    }
}

export default StrengthLog