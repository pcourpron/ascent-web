import React from 'react';

import ClientPick from '../ClientPick/ClientPick.js'
import FrontDash from '../FrontDash/FrontDash.js'

import { Link } from 'react-router-dom'
import Navbar from '../ClientPickNavbar/ClientPickNavbar'
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
            <div className='container-fluid' style={{ minHeight: '100vh', backgroundImage: 'linear-gradient(to right top, #0043a8, #007cdb, #00abc8, #00d27f, #a8eb12)', paddingTop: '100px' }}>
          
                {this.props.all.picked === '' ?
                <div>
                <Navbar
                picked={this.props.all.picked}/>
                    <ClientPick
                        clients={this.props.all.clients}
                        handleClientPick={this.props.handleClientPick}
                    />
                    </div>
                    :
                    <div>
                        <Navbar
                        picked={this.props.all.picked}/>
                    <FrontDash
                        first={this.props.all.first}
                        last={this.props.all.last} 
                        all = {this.props.all}/>
                        </div>
                }
            
            </div>



        )
    }
}
export default Dashboard