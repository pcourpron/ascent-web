import React from 'react';

class Weekday extends React.Component {
   

    render() {
        let style = {
            height: '50px',
            width: '50px',
            borderRadius: '25px',
            backgroundColor: 'grey',
            marginRight: '10px'
        }
        if (this.props.picked === true) {
            style.backgroundColor = 'lightblue'
        }
        else {
            style.backgroundColor = 'grey'
        }

        var days = [{day:'Sun',value:0}, {day:'Mon',value:1}, {day:'Tues',value:2},
         {day:'Wed',value:3}, {day:'Thurs',value:4} ,{day:'Fri',value:5}, {day:'Sat',value:6}]
      


        return (
            <div>
                <div className='row justify-content-center' style={{marginTop:'10px'}}>
                    <h5>Pick your workout days</h5>
                </div>
                <div className='row justify-content-center'>
                    {days.map(day =>
                        <div className='align-items-center d-flex justify-content-center'
                            style={this.props.daysPicked.indexOf(day.value) === -1 ?{
                                height: '50px',
                                width: '50px',
                                borderRadius: '25px',
                                backgroundColor: 'grey',
                                marginRight: '10px'
                            } :{
                                height: '50px',
                                width: '50px',
                                borderRadius: '25px',
                                backgroundColor: 'lightblue',
                                marginRight: '10px'
                            } }
                            onClick={() => this.props.pickDay(day.value)}>
                            {day.day}
                        </div>
                    )}
                </div>
            </div>




        )
    }
}

export default Weekday