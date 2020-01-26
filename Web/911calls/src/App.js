import React from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

//Arthur's sideNav
import Toolbar from './components/Toolbar/Toolbar';
import SideDrawer from './components/SideDrawer/SideDrawer';
import Backdrop from './components/Backdrop/Backdrop'
//

const mapStyles = {
    width: '100%',
    height: '100%',
};


class MapContainer extends React.Component {
    state = {
        sideDrawerOpen: false,
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {}
      };

    //Side Navigation Code
    drawerToggleClickHandler = () => {
        this.setState((prevState) => {
            return { sideDrawerOpen: !prevState.sideDrawerOpen };
        });
    }
    backdropClickHandler = () => {
        this.setState({ sideDrawerOpen: false });
    };
    //End Side Navigation Code
    
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
        // Side Navigation code
        let backdrop;
        if (this.state.sideDrawerOpen) {
            backdrop = <Backdrop click={this.backdropClickHandler} />;
        }
        // End Side Navigation code
        return (
            //Side Nav code
            <div style={{ height: '100%' }}>
                <Toolbar drawerClickHandler={this.drawerToggleClickHandler} />
                <SideDrawer show={this.state.sideDrawerOpen} /> ;
                {backdrop}
                <main style={{ marginTop: '31px' }}>
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
                </main>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyC91naZ4TM0LlmSTRqEUIYz7ak-JDbL3us '
}) (MapContainer);