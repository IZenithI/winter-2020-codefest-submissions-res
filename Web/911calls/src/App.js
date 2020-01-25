import React from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

const mapStyles = {
    width: '100%',
    height: '100%',
};


class MapContainer extends React.Component {
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {}
      };
    
    onMarkerClick = (props, marker, e) =>{
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    }

    onClose = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
            showingInfoWindow: false,
            activeMarker: null
            });
        }
    };

    // componentDidMount(){
    //     this.getPins();
    // }

    // getPins(){
    //     fetch('https://data.cityofnewyork.us/resource/5uac-w243.json?')
    //     .then(results => results.json())
    //     .then(results => this.setState({pins: results}));
    // }

    renderMarkers() {
        this.state.pins.map((pin, i) => {
          return <Marker
            key={ i }
            // onClick = { this.onMarkerClick }
            onClick = {console.log("clicked")}
            // title = { pin.locName }
            //position = { JSON.parse(pin.position) }
            position={{ lat: pin.lat, lng: pin.long }}
            // desc = { pin.desc }
            // name = { pin.locName } 
            // < Marker key={index} position={{ lat: pin.lat_lon.latitude, lng:pin.lat_lon.longitude}} />
            />;
        });
        // return < Marker position={{ lat: 43.7, lng: -70.9}} />;
    }
    

    render() {
        return (
            <Map
                google={this.props.google}
                zoom={12}
                style={mapStyles}
                initialCenter={{ lat: 40.7, lng: -73.9 }} //increase lat, moves up increase lng moves right
            >
                <Marker onClick={this.onMarkerClick} name= {'My House'} position={{ lat: 40.7, lng: -73.9}} /> 
                
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    onClose={this.onClose}
                >
                    <div><h4>{this.state.selectedPlace.name}</h4></div>
               </InfoWindow>
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyC91naZ4TM0LlmSTRqEUIYz7ak-JDbL3us '
}) (MapContainer);