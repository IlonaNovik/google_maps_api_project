import React, {Component} from 'react';
import GoogleMapLoader from 'react-google-maps-loader';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import GooglePlacesSuggest from 'react-google-places-suggest';

const MY_API_KEY = `${process.env.REACT_APP_API_KEY}`;

const mapStyles = {
    width: '100%',
    height: '100%'
  };
 
export class GoogleSuggest extends Component {
    state = {
        search: "",
        value: "",
        lat: 52.1554317, 
        lng: 21.0178126,
        showingInfoWindow: false,  
        activeMarker: {},          
        selectedPlace: {}
    }
 
    handleInputChange = e => {
        this.setState({search: e.target.value, value: e.target.value})
    }
 
    handleSelectSuggest = (geocodedPrediction, originalPrediction) => {
        let lat = geocodedPrediction.geometry.location.lat();
        let lon = geocodedPrediction.geometry.location.lng();

        this.setState({
            search: "", 
            value: geocodedPrediction.formatted_address,
            lat: geocodedPrediction.geometry.location.lat(),
            lng: geocodedPrediction.geometry.location.lng()
        })
    }

    onMarkerClick = (props, marker, e) =>
        this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
        }
    );

    onClose = props => {
        if (this.state.showingInfoWindow) {
        this.setState({
            showingInfoWindow: true,
            activeMarker: null
        });
        }
    };
 
    render() {
        const {search, value} = this.state
        return (
            <GoogleMapLoader
                params={{
                    key: MY_API_KEY,
                    libraries: "places,geocode",
                }}
                render={googleMaps =>
                    googleMaps && (
                        <GooglePlacesSuggest
                            googleMaps={googleMaps}
                            autocompletionRequest={{
                                input: search,
                            }}
                           
                            onSelectSuggest={this.handleSelectSuggest}
                            textNoResults="My custom no results text" 
                            customRender={prediction => (
                                <div className="customWrapper">
                                    {prediction
                                        ? prediction.description
                                        : "My custom no results text"}
                                </div>
                            )}
                        >
                            <input
                                type="text"
                                value={value}
                                placeholder="Search a location"
                                onChange={this.handleInputChange}
                            />
                            <Map
                                google={this.google}
                                zoom={14}
                                style={mapStyles}
                                initialCenter={{
                                lat: this.state.lat,
                                lng: this.state.lng,
                                }}
                                >
                                </Map>
                        </GooglePlacesSuggest>
                    )
                }
            />
        )
    }
}

export default GoogleApiWrapper({
        apiKey: `${process.env.REACT_APP_API_KEY}`
    })(GoogleSuggest);
