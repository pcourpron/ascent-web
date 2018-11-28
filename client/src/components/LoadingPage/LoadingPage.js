import React from 'react';

class LoadingPage extends React.Component {
    render() {
        let quotes = [`If at first you don't succeed, skydiving is not for you.`,
            `I used to think I was indecesive, but now I'm not so sure.`,
            `The more you weigh, the more harder you are to kidnap. Eat more cake.`]

        return (
            <div className='container-fluid' style={{ height: '100vh', backgroundImage: 'linear-gradient(to right top, #0043a8, #007cdb, #00abc8, #00d27f, #a8eb12)' }}>
                <div className='row justify-content-center align-items-center h-100'>
                    <div className='col-md-4 d-flex align-items-center'>
                        <h3 className='text-center text-white'>{quotes[Math.floor(Math.random() * quotes.length)]}
                        </h3>
                    </div>

                </div>
            </div>
        )

    }

}

export default LoadingPage