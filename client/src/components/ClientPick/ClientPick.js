import React from 'react';

class ClientPick extends React.Component {

    render() {
        return (
            <div className='row justify-content-center align-items-center' style={{ height: '90%' }}>
                <div className='col-sm-4 justify-content-center shadow-lg' style={{ minHeight: '400px', minWidth: '300px', borderRadius: '20px', backgroundColor: 'white' }}>
                    <div className='row text-center' style={{ borderBottom: '1px solid grey' }}> <h3 style={{ margin: '0 auto' }}>Clients</h3></div>
                    
                    {this.props.clients.map(client => {
                        return (
                            <div onClick={() => { this.props.handleClientPick(client) }} className='row' style={{ marginTop: '10px' }}>

                                <div className='col-sm-5 d-flex justify-content-center'>
                                    <div className='d-flex justify-content-center align-items-center' 
                                    style={{ height: '60px', width: '60px', borderRadius: '30px', backgroundColor: 'whitesmoke', overflow:'hidden' }}>
                                       {client.first==='Pierre'? <img style={{height: '80px', zIndex: '10',marginLeft:'40px'}} src = 'https://uclaclubsports.com/images/2015/1/30/10922541_400089400168628_7184843557926444544_n.jpg?width=300' alt='profile'/>
                                     : <i class="fas fa-user fa-3x"></i>}
                                   
                                    </div>
                                </div>

                                <div className='col-sm-7 d-flex justify-content-center align-items-center'>
                                {client.first} {client.last}
                                </div>

                            </div>)
                    })}
                </div>
            </div>
        )

    }
}
export default ClientPick