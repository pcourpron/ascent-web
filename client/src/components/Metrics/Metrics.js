import React from 'react';

class Metrics extends React.Component {
    render() {
        return (
            <div className='row justify-content-center'>
                <h3 className='w-100 text-center' >Metrics</h3>
                <div className='col'>
                    <div className='row justify-content-center'>
                        <span> {`Weight: 220lbs `} <i style={{color:'red'}} class="fas fa-angle-down"></i> </span>
                    </div>
                    <div className='row justify-content-center'>
                        <span> {`Sleep: 7 hours`} <i style={{color:'red'}} class="fas fa-angle-down"></i> </span>
                    </div>
                    <div className='row justify-content-center'>
                        <span> {`Stress: 4 `} <i style={{color:'lightgreen'}} class="fas fa-angle-down"></i> </span>
                    </div>
                    <div className='row justify-content-center'>
                        <span> {`Weight: 220lbs `} <i style={{color:'red'}} class="fas fa-angle-down"></i> </span>
                    </div>
                </div>
            </div>
        )
    }
}
export default Metrics