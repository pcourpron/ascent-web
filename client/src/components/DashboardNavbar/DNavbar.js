import React from 'react';
import {Link} from 'react-router-dom'
import {Nav,Navbar,NavbarBrand,NavbarToggler,NavItem,NavLink,Collapse} from 'reactstrap';

class DNavbar extends React.Component {
    state = {
        isOpen: false
    }
 render(){
     return(
        <Navbar dark fixed='top' expand="md" style={{ backgroundColor: 'teal' }}>
        <div className='container'>

            <NavbarBrand href="/"><h3>Ascent</h3></NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
            { this.props.all.picked === ''? null:
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <Link to='/LogAWorkout' style={{textDecoration:'none'}}>Log A Workout</Link>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/LogMetrics">Log Metrics</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/Graphs">Graphs</NavLink>
                    </NavItem>
                </Nav>
            }
            </Collapse>
        </div>
    </Navbar>
     )
 }
}
export default DNavbar