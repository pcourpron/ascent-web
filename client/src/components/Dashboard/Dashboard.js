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
        if(this.props.all.picked !==''){
            this.props.getStressScores()
            this.props.getBodyWeights()
        }
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
            <div className='container-fluid' style={{ minHeight: '100vh', backgroundImage: 'url(https://images.unsplash.com/photo-1493690283958-32df2c86326e?ixlib=rb-0.3.5&s=b62d34e46e0ddc9b507068c1aab921f9&auto=format&fit=crop&w=1496&q=80)', paddingTop: '100px' }}>
          <div style={{backgroundColor:'rgba(255,255,255,.5)',height:'100%',width:'100%',position:'absolute',marginTop:'-100px',marginLeft:'-15px'}}></div>
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