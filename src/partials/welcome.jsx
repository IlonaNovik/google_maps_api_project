import React, { Component } from 'react';
import Typing from 'react-typing-animation';



class WelcomePage extends Component {
    render() {
        return(
            <header className="masthead">
            <div className="container h-100">
              <div className="row h-100 align-items-center justify-content-center text-center">
                <div className="col-lg-10 align-self-end">
                  <h1 className="text-uppercase text-white font-weight-bold">
                  <Typing speed={200}>Explore the world</Typing>
                    </h1>
                  <hr className="divider my-4" />
                </div>
                <div className="col-lg-8 align-self-baseline">
                  <h2 className="text-white-75 font-weight-light mb-5"><Typing speed={200} startDelay={3000}>with Google Maps!</Typing></h2>
                  <a className="btn btn-primary btn-xl js-scroll-trigger" href="/#/search">Search</a>
                </div>
              </div>
            </div> 
          </header>
        )
    }
}

export default WelcomePage;