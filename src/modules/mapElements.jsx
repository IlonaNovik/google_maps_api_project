import React, { Component, ReactDOM } from 'react';
import MapElement from '../modules/mapElement';
import placesApiObject from '../services/PlacesApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import AnimateHeight from 'react-animate-height';
import Typing from 'react-typing-animation';

import {
    NavLink
} from "react-router-dom";

const styles = {width: 200, heigth: 200, borderRadius: '20%', boxShadow: '0px 2px 1px 1px rgba(0, 0, 0, 0.7)'};

class MapElements extends Component {
    constructor(props) {
        super(props);

        this.state = {
           height: 0,
           mapElements: [],
           selected: {},
           displayPictures: "none",
           photoIndex: 0,
        };

        this.loadAllElements();
    }

    loadAllElements(){
        let places = placesApiObject.getPlaces();
        places.map(item => (this.addMapElement(item)));
    }

    loadImagesForSelected(){
        if(this.state.selected.imageUrls === undefined){
            return [];
        }
        
        
        return (
                <li className="singlePhoto">
                    <button className="awesomeIcon1" onClick={this.previousPhoto}><FontAwesomeIcon icon={faChevronLeft} /></button>
                        <div className="container">
                                <img src={this.state.selected.imageUrls[this.state.photoIndex]} />
                        </div>
                    <button className="awesomeIcon1" onClick={this.nextPhoto}><FontAwesomeIcon icon={faChevronRight} /></button>
                </li>
        )
    }

    nextPhoto = () => {
        this.setState(prevState => ({
            photoIndex: prevState.photoIndex + 1 > 9 ? 0 : prevState.photoIndex + 1,
          }));
          console.log(this.state.photoIndex)
    }


    previousPhoto = () => {
        this.setState(prevState => ({
            photoIndex: prevState.photoIndex - 1 < 0 ? 9 : prevState.photoIndex - 1,
          }));
    }

    addMapElement(item){
        if(this.searchItemByIndex(item.id) !== undefined){
            return;
        }
        
        let newMapElements = this.state.mapElements.push(
            <div onClick={() => this.selectItem(item.id)}>
                <MapElement 
                    key={item.id} 
                    id={item.id} 
                    name={item.name} 
                    lat={item.lat} 
                    lng={item.lng} 
                    imageUrls={item.imageUrls}
                />
            </div>
        );

        this.setState({
            mapElements: newMapElements
        });
    }

    removeMapElement(id) {
        let newMapElements = this.state.mapElements.filter(mapElement => mapElement.props.children.props.id !== id);

        this.setState({
            mapElements: [...newMapElements],
            selected: {}
        });

        placesApiObject.deletePlace(id);

        this.toggle();
    }

    toggle = () => { 
        this.setState(prevState => ({
          height: prevState.height === 0 ? 'auto' : 0,
        }));
      };

    closeToolbar = () => {
        this.setState({
            height:  0
          });
    }

    searchItemByIndex(id){
        for (var i=0; i < this.state.mapElements.length; i++) {
            if (this.state.mapElements[i].props.children.props.id === id) {
                return this.state.mapElements[i].props.children.props;
            }
        }
    }

    selectItem = (id) => {
        
        this.toggle();
        let selectedItem = this.searchItemByIndex(id);
        
        this.setState({
            selected: {
                id: selectedItem.id,
                lat: selectedItem.lat,
                lng: selectedItem.lng,
                imageUrls: selectedItem.imageUrls
            }
        });
    }
    showPhotos = () => {
        this.setState({
            displayPictures: "block"
        })
    }

    closePhotos = () => {
        this.setState({
            displayPictures: "none"
        })
        this.toggle();
    }

    arr = [];
    
    componentWillMount(){
        this.arr = placesApiObject.getPlaces();
    }

    renderMapElements() {
        if(this.state.mapElements.length > 0) {
            return (
                <>
                    { [...this.state.mapElements] }
                </>
            );
        }
        else {
            return (
                <h1 className="text-uppercase text-white font-weight-bold">
                    <Typing speed={200}>No maps saved :(</Typing>
                </h1>
            );
        }
    }

    render(){
        return(
            <>
                { this.renderMapElements() }
                
                <div className="gallery" style={{ display: this.state.displayPictures }}>
                    <ul className="photosList">
                        {/* {
                            [...this.loadImagesForSelected()]
                        } */
                            this.loadImagesForSelected()
                        }
                        
                        <button className="awesomeIcon2" onClick={this.closePhotos}>
                                <FontAwesomeIcon icon={faTimes} />
                        </button>
                    </ul> 
                </div>              
                
                <AnimateHeight className="toolbar" duration={500} height={this.state.height}>
                    <NavLink to={`/search?lat=${this.state.selected.lat}&lng=${this.state.selected.lng}`} className= "btn btn-primary control-btn-1 js-scroll-trigger">Show on the map</NavLink>
                    <a target="_blank" 
                        style={{paddingTop: 8}}
                        href={`https://maps.google.com/?q=${this.state.selected.lat},${this.state.selected.lng}`}
                        className= "btn btn-primary control-btn js-scroll-trigger">Link to Google
                    </a>
                    <button onClick={this.showPhotos} className= "btn btn-primary control-btn js-scroll-trigger">See pictures</button>
                    <button 
                        className= "btn btn-primary control-btn js-scroll-trigger"
                        onClick={() => this.removeMapElement(this.state.selected.id)}>
                            Delete
                    </button>
                    <div className="hideToolbar">
                        <button className="awesomeIcon" onClick={this.closeToolbar}>
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                    </div>
                </AnimateHeight>
            </>
            
        )
    }
}

 export default MapElements;