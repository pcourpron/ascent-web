import React from 'react';

class Weekday extends React.Component{
    state={
        picked:false
    }
    
    render(){
        let style ={
            height:'50px',
            width:'50px',
            borderRadius:'25px', 
            backgroundColor:'grey' , 
            marginRight:'10px'
        }
        if (this.props.picked === true){
            style.backgroundColor = 'lightblue'
        }
        else{
            style.backgroundColor = 'grey'
        }
       

        return(
            <div className='align-items-center d-flex justify-content-center' 
            style={style} 
            onClick={()=>this.props.pickDay(this.props.day)}>
            {this.props.day}
            </div>

        )
    }
}

export default Weekday