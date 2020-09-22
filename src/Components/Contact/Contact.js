import React from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

const Contact = () => {
    return (
        <div style={{backgroundColor: '#afeeee', margin: '100px'}}>
            <h2> This is Contact router. Here i was showing google map. Due to not available of google map API key, I am only showing the procedure of import see on top then formula and bit change on footer. In the footer the api key is fake just to prove my functionality of showing Google map on React Js. Just to notice you i have installed  npm install --save google-maps-react. Thanks</h2>
            <div>
                {/* <Map google={this.props.google} zoom={14}>

                    <Marker onClick={this.onMarkerClick}
                        name={'Current location'} />

                    <InfoWindow onClose={this.onInfoWindowClose}>
                        <div>
                        <h1>{this.state.selectedPlace.name}</h1>
                        </div>
                    </InfoWindow>
                </Map> */}
            </div>

        </div>
    );
};

export default GoogleApiWrapper({
    apiKey: ("AIzaSyBJmIEFuZKTndYisEqx_bHbM7XBfWDIMcY")
  })(Contact)