import React from 'react';

class LoadingPage extends React.Component {
    render() {
        let quotes = [`If at first you don't succeed, skydiving is not for you.`,
            `I used to think I was indecesive, but now I'm not so sure.`,
            `The more you weigh, the more harder you are to kidnap. Eat more cake.`]

        return (
            <div className='container-fluid' style={{ height: '100vh', backgroundImage: 'url(https://images.unsplash.com/photo-1493690283958-32df2c86326e?ixlib=rb-0.3.5&s=b62d34e46e0ddc9b507068c1aab921f9&auto=format&fit=crop&w=1496&q=80)' }}>
                <div className='row justify-content-center align-items-center h-100'>
                    <div className='col-md-4 d-flex align-items-center'>
                       <img alt='loading' src = 'https://steemitimages.com/DQmTWvU8mjzBQA7U1mvWWcCUhQVcBCoj4Hvikd3tihoRzJQ/loading-animation2.gif'/>                     
                    </div>

                </div>
            </div>
        )

    }

}

export default LoadingPage