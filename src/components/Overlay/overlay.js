import React from 'react';

const Overlay = (props)=>{
    return(
    <div onClick={props.toggle} style={{position:'absolute',
    height:'100vh',
     width: '100vw',
     zIndex:10,
     display: props.display,
    transition:'.5',
    backgroundColor:'rgba(0,0,0,.6)'}}>

    </div>)

}
export default Overlay