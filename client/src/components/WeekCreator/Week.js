import React from 'react';

class Week extends React.Component{
    render(){
        return( <div>
            <form onSubmit={(event) => { this.props.handleSubmit(event) }}>
                <div className='row justify-content-center' style={{ marginTop: '10px' }}>
                    <h3 >Week {this.props.element}</h3>
                </div>
                <div className='row justify-content-center' style={{ marginTop: '10px' }}>
                    {this.props.letterDaysPicked.map(day => {
                        return (<div className='col' style={{ borderRight: '1px solid grey' }}>
                            <div className='row justify-content-center'>
                                <h4>{day.day}</h4>
                            </div>
                            <div className='row justify-content-center'>
                                <h5 style={{ margin: '6px 5px 6px 0' }}>Lifts</h5> <button className='btn btn-sm btn-outline-primary' onClick={(event) => { this.props.addALift(event, day.value) }}> Add a Lift </button>


                                {/*   Going through each individual lift    */}
                                {Object.keys(this.props.state[day.value].lifts).map(lift => {


                                    return (
                                        <div className='row' style={{ marginTop: '20px' }}>
                                            <div className='col-sm-4 align-items-start' style={{ height: '100%' }}>
                                                <input  value={this.props.state[day.value].lifts[lift].name} name={lift} placeholder='Lift' onChange={(e) => { this.props.changeLiftName(e, day.value, lift) }} style={{ width: '150px' }} required />
                                                <button className='btn btn-success' onClick={(e) => { this.props.addASet(e, day.value, lift) }} style={{ marginBottom: '15px' }}>Add a Set</button>
                                            </div>
                                            <div className='col-sm-1'></div>

                                            {/* Going through the sets of the lift */}
                                            <div className='col-sm-5' style={{ marginBottom: '15px' }}>
                                                {Object.keys(this.props.state[day.value].lifts[lift].sets).map(set => {
                                                    return (
                                                        <div className='row'>
                                                            <input value = {this.props.state[day.value].lifts[lift].sets[set].amount} placeholder='Sets' onChange={(e) => { this.props.changeAmount(e, day.value, lift, set, 'amount') }} style={{ width: '50px', marginRight: '5px' }} required />
                                                            <input value = {this.props.state[day.value].lifts[lift].sets[set].reps}placeholder='Reps' onChange={(e) => { this.props.changeAmount(e, day.value, lift, set, 'reps') }} style={{ width: '50px', marginRight: '5px' }} required />
                                                            <input value = {this.props.state[day.value].lifts[lift].sets[set].weight}placeholder='Weight' onChange={(e) => { this.props.changeAmount(e, day.value, lift, set, 'weight') }} style={{ width: '60px', marginRight: '5px' }} required />
                                                        </div>
                                                    )
                                                })}
                                            </div>

                                        </div>
                                    )

                                })}

                            </div>
                        </div>
                        )
                    })}

                </div>
                <div className='row justify-content-center'>
                    {this.props.state.i === 0 ? null : <button type='button' className='btn btn-outline-primary' onClick={this.props.previousWeek }> Previous Week</button>}
                    <button type='submit' className='btn btn-outline-primary' > Next Week</button>
                </div>
                </form>
            }

        </div>)
    }
}
export default Week