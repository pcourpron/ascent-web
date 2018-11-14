import React from 'react';
import {Navbar, NavbarBrand, NavbarToggler,Nav,Collapse,NavItem,NavLink} from 'reactstrap'



class ClientPage extends React.Component {
    state = {
        date: new Date(),
      
    }

    onChange = date => this.setState({ date })

    render() {
        return (
            <div>
            <Navbar dark fixed = 'top' expand="md" style={{backgroundColor:'teal'}}>
            <div className='container'>
    
              <NavbarBrand href="/"><h3>Ascent</h3></NavbarBrand>
              <NavbarToggler onClick={this.toggle} />
        
              </div>
            </Navbar>
            <div className='container'>
                <div className='row justify-content-center'>
                    <div></div>
                    <h3> {`${this.state.first} ${this.state.last}`}</h3>
                </div>
                <div className='row'>
                </div>

                <div className='row'>
                </div>
            </div>
            
          </div>
        );
    }
}


export default ClientPage
