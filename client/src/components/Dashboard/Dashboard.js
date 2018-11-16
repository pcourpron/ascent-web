import React from 'react';

import ClientPick from '../ClientPick/ClientPick.js'
import FrontDash from '../FrontDash/FrontDash.js'

import { Link } from 'react-router-dom'
import { Navbar, NavbarBrand, NavItem, NavLink, Collapse, NavbarToggler, Nav } from 'reactstrap'
import { auth, firestore } from '../firebase/firebase'

import '../../App.css';

class Dashboard extends React.Component {
    state = {
        isOpen: false
    }

   


    componentWillMount = () => {

        var clientPromise = new Promise(function (resolve, reject) {
            auth.onAuthStateChanged(function (user) {
                var newClients = []
                firestore.collection('Users').doc(user.uid).collection('Clients').get()
                    .then(
                        //grab all the clients names
                        (clients) => {
                            let wait = clients.docs.length
                            clients.forEach(client => {
                                firestore.collection('Users').doc(client.id).get()
                                    .then(
                                        (doc) => {
                                            let newClient = doc.data()
                                            newClient['id'] = client.id
                                            newClients.push(newClient)
                                            wait--
                                            if (wait === 0) {
                                                resolve(newClients)
                                            }
                                        }
                                    )
                            })
                        }
                    )
            })
        })
        clientPromise.then((value) => {

            this.props.uploadClients(value)
        })
    }
    toggle=()=>{
        this.setState({isOpen: !this.state.isOpen})
    }


    render() {
        return (
            <div className='container-fluid' style={{ height: '100vh', backgroundImage: 'linear-gradient(to right top, #0043a8, #007cdb, #00abc8, #00d27f, #a8eb12)' }}>
                <Navbar dark fixed='top' expand="md" style={{ backgroundColor: 'teal' }}>
                    <div className='container'>

                        <NavbarBrand href="/"><h3>Ascent</h3></NavbarBrand>
                        {this.props.all.picked === '' ? null :
                        <div>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            
                                <Nav className="ml-auto" navbar>
                                    <NavItem>
                                        <Link to='/LogAWorkout' style={{ textDecoration: 'none' }}> <NavLink activeClassName="active"> Log A Workout</NavLink></Link>
                                    </NavItem>
                                    <NavItem>
                                        <Link to='/Sync' style={{ textDecoration: 'none' }}> <NavLink activeClassName="active"> Sync Cardio Workout</NavLink></Link>
                                    </NavItem>
                                    <NavItem>
                                        <Link to='/LogMetrics' style={{ textDecoration: 'none' }}> <NavLink activeClassName="active"> Log Metrics</NavLink></Link>
                                    </NavItem>
                                    <NavItem>
                                        <Link to='/Graphs' style={{ textDecoration: 'none' }}> <NavLink activeClassName="active"> Graphs</NavLink></Link>
                                    </NavItem>
                                </Nav>
                            
                        </Collapse>
                        </div>
                        }
                    </div>
                </Navbar>
                {this.props.all.picked === '' ?
                    <ClientPick
                        clients={this.props.all.clients}
                        handleClientPick={this.props.handleClientPick}
                    />
                    :
                    <FrontDash
                        first={this.props.all.first}
                        last={this.props.all.last} 
                        all = {this.props.all}/>
                }
            </div>



        )
    }
}
export default Dashboard