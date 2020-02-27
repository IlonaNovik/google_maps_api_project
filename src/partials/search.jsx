import React, { Component } from 'react';
import GoogleApiWrapper from '../modules/mapContainer';

const MY_API_KEY = `${process.env.REACT_APP_API_KEY}`

class SearchPage extends Component {
    render() {
        return(
        <>
          <div className="onLoad">
            <div className="spinner"></div>
          </div>
          <GoogleApiWrapper apiKey={MY_API_KEY} />
        </>  
        )
    }
}

export default SearchPage;
