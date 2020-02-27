import React, { Component } from 'react';
import Map, { GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import Geosuggest from 'react-geosuggest';
import placesApiObject from '../services/PlacesApi';

const mapStyles = {
  width: '100%',
  height: '100%'
};

const leftMenuStyles = {
    width: '270px', 
    height: '100%', 
    backgroundColor: 'rgba(89, 89, 89, 0.9)', 
    position: 'Absolute',
    paddingTop: '50px',
    paddingLeft: '10px',
    zIndex: 99998
};

const styles = {
  left: 'left'
}


export class MapContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showingInfoWindow: false,  //Hides or the shows the infoWindow
            activeMarker: {},          //Shows the active marker upon click
            selectedPlace: {},          //Shows the infoWindow to the selected place upon a marker
            position: {
              lat: 52.2296756, 
              lng: 21.012228700000037,
              name: 'Warszawa',
              id: '0',
            },
            mapZoom: 4,
            showSpan: "none"
            
        };

        this.urlParams = {};
        this.getUrlParams();

        if(this.urlParams.lat !== undefined && this.urlParams.lng !== undefined){
          this.state.position.lat = this.urlParams.lat;
          this.state.position.lng = this.urlParams.lng;
          this.state.mapZoom = 7;
        }
    }

    map = {};

    getUrlParams(){
      if(document.location.hash.indexOf('?') == -1){
        return;
      }
      
      let paramStrings = document.location.hash.split('?')[1].split('&');
      for(let i in paramStrings){
          let split = paramStrings[i].split('=');
          this.urlParams[split[0]] = split[1];
      }
    }

    onMarkerClick = (props, marker, e) =>
        this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
        }
    );

    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
          this.setState({
            showingInfoWindow: false,
            activeMarker: null
          })
        }
      };

    onClose = props => {
        if (this.state.showingInfoWindow) {
        this.setState({
            showingInfoWindow: true,
            activeMarker: null
        });
        }
    };

    fetchPlaces(mapProps, map) {
        const {google} = mapProps;
        const service = new google.maps.places.PlacesService(map);
    }    

    suggestSelect(suggest) {
      if(suggest != undefined){
        let photoAray = [];
        
        if(suggest.gmaps.photos !== undefined) {
          photoAray = suggest.gmaps.photos.map(photo => photo.getUrl());
        }
        
        this.setState({position: {
          lat: suggest.location.lat, 
          lng: suggest.location.lng,
          name: suggest.label,
          id: suggest.placeId,
          imageUrls: photoAray

        }
      });
      
      this.setState({
        mapZoom : 7        
      });
      
      this._map.setState({
        currentLocation : {
          lat: suggest.location.lat, 
          lng: suggest.location.lng
        }
      });

      }
    } 
      
    addPlace(){

      this.setState({
        showSpan: "block"
      })
      
      placesApiObject.addPlace(
        this.state.position.id,
        this.state.position.lat,
        this.state.position.lng,
        this.state.position.name,
        this.state.position.imageUrls
        );

        this._geoSuggest.blur();
        this._geoSuggest.focus();
        this._geoSuggest.clear();
      console.log(placesApiObject.getPlaces());

      setTimeout(() => {
        this.setState({
          showSpan: "none"
        })
      }, 3000)

    }
    
        
    render() {

      
      return (
        <>
        <div style={leftMenuStyles}>
          <div style={{display: "block", height: 20}}>
            <span className={styles.left} style={{color: "#FF715B", display: this.state.showSpan}}>Go to see "my maps" section</span>
          </div>
          <div className={styles.left}>
            <form className= "geosuggest"style={{marginTop: 10}} onSubmit={this.onSubmit}>
              <Geosuggest 
                ref={el=>this._geoSuggest=el}
                placeholder=" Search for places" 
                onSuggestSelect={(suggest) => {this.suggestSelect(suggest)}}
               />
            </form>
            <button className= "btn btn-primary search-btn js-scroll-trigger" style={{marginTop: 12}} onClick={() => {this.addPlace()}}>Save</button>
          </div>
        </div>
        <Map
          ref={el=>this._map=el}
          className='map'
          google={this.props.google}
          zoom={this.state.mapZoom}
          style={mapStyles}
          onReady={this.fetchPlaces}
          onClick={this.onMapClicked(this)}
          initialCenter={{
           lat: this.state.position.lat,
           lng: this.state.position.lng,
          }}
        >
            
            <Marker
            onClick={this.onMarkerClick}
            draggable={true}
            name={'Warsaw'}
            position={this.state.position}
            />
            <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}
            >
            <div>
                <h2>{this.state.selectedPlace.name}</h2>
            </div>
            </InfoWindow>
        </Map>
        </>
      );
    }
  }

  const LoadingContainer = (props) => (
    <div> </div>
  )
  export default GoogleApiWrapper(
    (props) => ({
      apiKey: `${process.env.REACT_APP_API_KEY}`,
      language: props.language,
      LoadingContainer: LoadingContainer
    }
  ))(MapContainer)
