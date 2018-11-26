import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,

} from 'reactstrap';
import { Link } from 'react-router-dom'



class ClientPickNavbar extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (

            <div>
                <Navbar dark fixed='top' expand="lg" style={{ backgroundColor: 'teal' }}>
                    <div className='container'>

                        <NavbarBrand href="/"><h3>Ascent</h3></NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />

                        {this.props.picked === '' ?
                            <Collapse isOpen={this.state.isOpen} navbar>
                                <Nav className="ml-auto" navbar>
                                    <NavItem>
                                        <NavLink href="/">Personal Dashboard</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="/Signout">Sign Out</NavLink>
                                    </NavItem>
                                </Nav>
                            </Collapse>
                            :

                            <Collapse isOpen={this.state.isOpen} navbar>
                                <Nav className="ml-auto" navbar>
                                    <NavItem>
                                        <NavLink href="/">Personal Dashboard</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <Link to='/LogAWorkout' className={'nav-link'}>Log A Workout</Link>
                                    </NavItem>
                                    <NavItem>
                                        <Link to='/LogMetrics' className={'nav-link'}>Log Metrics</Link>
                                    </NavItem>
                                    <NavItem>
                                        <Link to='/Graphs' className={'nav-link'}>Graphs</Link>
                                    </NavItem>
                                    <NavItem>
                         

                                        <NavLink href="/dashboard">Change Clients</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="/Signout">Sign Out</NavLink>
                                    </NavItem>
                                </Nav>
                            </Collapse>
                        }

                    </div>
                </Navbar>
            </div>
        );
    }
}

export default ClientPickNavbar;