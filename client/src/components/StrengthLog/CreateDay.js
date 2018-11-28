import React from 'react';

class newProgram extends React.Component{
    render(){
        return(
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
            </form>)
    }
}