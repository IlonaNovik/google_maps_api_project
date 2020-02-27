import React, { Component } from 'react';

const styles = {width: 150, borderRadius: '20%', boxShadow: '0px 2px 1px 1px rgba(0, 0, 0, 0.7)'};

class MapElement extends Component {
    
    render(){

        const plaseNameStyle = {
            textAlign: "center", 
            color: "white", 
            paddingTop: "5px", 
            fontSize: "1.2rem", 
            lineHeight: "1.2rem", 
            fontWeight: 500, 
            marginBottom: 0
        }
        const lngLatStyle = {
            textAlign: "center", 
            color: "white", 
            fontSize: "1rem"
        }
        
        return(
            <div style={{width: 200, margin: 10, cursor: "pointer"}}>
                <img style={styles} src={require('../img/Googlemap.jpg')} alt={this.props.name} />
                <p style={plaseNameStyle}>{this.props.name}</p>
                <p style={lngLatStyle}>lat: {Math.round(this.props.lat * 100) / 100} lng: {Math.round(this.props.lng * 100) / 100}</p>
            </div>
        )
    }
}

 export default MapElement;