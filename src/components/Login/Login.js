import React from 'react';

class Login extends React.Component {
    state = {
        email: '',
        password: ''

    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {


        return (
            <div className='container-fluid' style={{ height: '100vh', backgroundImage: 'linear-gradient(to right top, #0043a8, #007cdb, #00abc8, #00d27f, #a8eb12)' }}>
                <div className='row justify-content-center align-items-center' style={{ height: '100%' }}>
                    <div className=' d-flex justify-content-center shadow-lg' style={{ height: '400px', width: '300px', borderRadius: '20px', backgroundColor: 'white' }}>



                        <form>
                            <div class="form-group d-flex flex-wrap justify-content-center" style={{ paddingTop: '30px', backgroundColor: 'whitesmoke', borderRadius: '20px 20px 0 0 ' }}>
                                <h3>Ascent</h3>
                            </div>
                            <div class="form-group d-flex flex-wrap justify-content-center">
                                <label for="email">E-mail</label>

                                <input style={{ width: '90%' }} name='email' type="email" class="form-control" id="email" placeholder="Email" required />
                                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                            <div class="form-group d-flex flex-wrap justify-content-center">
                                <label for="password">Password</label>
                                <input style={{ width: '90%' }}  name ='password' type="password" class="form-control" id="password" placeholder="Password" required />
                            </div>
                            <div class="form-group d-flex flex-wrap justify-content-center" >

                                <button type="submit" class="btn btn-primary" style={{border:'white', backgroundImage: 'linear-gradient(to right top, #0066ff, #027dff, #2d91ff, #50a5ff, #72b7ff)', width: '75%' }}>Submit</button>
                            </div>
                            <div class="form-group d-flex flex-wrap justify-content-center" >
                            <a>Forgot your password?</a>
                            </div>
                        </form>
                    </div>

                </div>
            </div>




        );
    }
}



export default Login;


