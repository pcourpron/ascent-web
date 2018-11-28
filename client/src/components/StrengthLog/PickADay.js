import React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';

class PickADay extends React.Component {
    handleSubmit = (event) => {
        event.preventDefault()
        this.props.next()
    }
    customOverlay(){
        
    }
    render() {
        return (<div>
            <div className='row justify-content-center' style={{ marginTop: '10px' }}>
                <h3> Create a lifting program </h3>
            </div>
            <form>
                <div className='row justify-content-center'>
                    <div className='col-sm-4 '>
                        <div className='row justify-content-center'>
                            <h6>Pick a start day</h6>
                        </div>

                        <div className='row justify-content-center'>
                            <DayPickerInput
                                onDayChange={day => { this.props.handleDayChange(day) }}
                                value={this.props.date} 
                                dayPickerProps={{
                                    disabledDays:[{ daysOfWeek: [1,2,3,4,5, 6] }]
                                  }}
                                />
                        </div>

                    </div>
                    <div className='col-sm-4 '>
                        <div className='row justify-content-center'>
                            <h6>Pick a duration</h6>
                        </div>

                        <div className='row justify-content-center'>
                            <select onChange={(event)=>{this.props.handleWeekChange(event)}} value={this.props.weeks}>
                                <option value={1}>1 week</option>
                                <option value={2}>2 weeks</option>
                                <option value={3}>3 weeks</option>
                                <option value={4}>4 weeks</option>
                                <option value={5}>5 weeks</option>
                                <option value={6}>6 weeks</option>
                                <option value={7}>7 weeks</option>
                                <option value={8}>8 weeks</option>
                                <option value={9}>9 weeks</option>
                                <option value={10}>10 weeks</option>
                                <option value={11}>11 weeks</option>
                                <option value={12}>12 weeks</option>
                            </select>
                        </div>

                    </div>
                    
                </div>
                
            </form>
        </div>)
    }
}
export default PickADay