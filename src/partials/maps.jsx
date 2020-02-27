import React, { Component } from 'react';
import MapElements from '../modules/mapElements';


class MapsPage extends Component {
    render() {
        return(
            <header className="mapSection">
              <div className="container h-100">
                <div className="row h-100 align-items-center justify-content-center text-center">
                  <div className="maps col-lg-10 align-self-end">
                      <MapElements/>
                    </div>
                    <div className="col-lg-8 align-self-baseline">
                    </div>
                    <div className="col-lg-8 align-self-baseline">
                    </div>
                </div>
              </div> 
          </header>
        )
    }
}

export default MapsPage;