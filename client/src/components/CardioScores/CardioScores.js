import React from 'react';

class CardioScores extends React.Component {
    render() {
        return (
            <div className='row justify-content-center' style={{width:'300px'}}>
            {/*Fatigue*/}

                 <div className='container' style={{height:'90px',width:'110px',backgroundColor:'orange',borderRadius:'8px', margin:' 15px -15px 0 0'}} >
                <div className='row justify-content-center align-items-center' style = {{height:'70%'}}>
                { this.props.all.fatigue === undefined ? '-' : <h3>{Math.round(this.props.all.fatigue[this.props.all.fatigue.length-1].y)}</h3>}
                </div>
                <div className='row justify-content-center align-items-center' style = {{height:'30%',borderTop:'1px black solid'}}>
                    <span style={{color:'white'}}>Fatigue</span>
                </div>

                </div>

            {/*Freshness */}
            <div className='container' style={{height:'90px',width:'110px',backgroundColor:'green',borderRadius:'8px',zIndex:10}} >
                <div className='row justify-content-center align-items-center' style = {{height:'70%'}}>
                { this.props.all.freshness === undefined ? '-' : <h3>{Math.round(this.props.all.freshness[this.props.all.freshness.length-1].y)}</h3>}
                
                </div>
                <div className='row justify-content-center align-items-center' style = {{height:'30%',borderTop:'1px black solid'}}>
                    <span style={{color:'white'}}>Freshness</span>
                </div>

                </div>


            {/*Fitness*/}

                <div className='container' style={{height:'90px',width:'110px',backgroundColor:'blue',borderRadius:'8px', margin:' 15px 0 0 -15px'}} >
                <div className='row justify-content-center align-items-center' style = {{height:'70%'}}>
                { this.props.all.fitness === undefined ? '-' : <h3>{Math.round(this.props.all.fitness[this.props.all.fitness.length-1].y)}</h3>}
                
                </div>
                <div className='row justify-content-center align-items-center' style = {{height:'30%',borderTop:'1px black solid'}}>
                    <span style={{color:'white'}}>Fitness</span>
                </div>

                </div>
            </div>)
    }
}

export default CardioScores