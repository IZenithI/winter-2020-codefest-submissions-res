import React from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import Toolbar from './components/Toolbar/Toolbar';
import SideDrawer from './components/SideDrawer/SideDrawer';
import Backdrop from './components/Backdrop/Backdrop'

const mapStyles = {
    width: '100%',
    height: '100%',
};


class MapContainer extends React.Component {
    constructor(){
        super()
        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            pins: [],
            sideDrawerOpen: false
        };
        this.renderMarkers = this.renderMarkers.bind(this);
    }

    //Side Navigation Code
    drawerToggleClickHandler = () => {
        this.setState((prevState) => {
            return { sideDrawerOpen: !prevState.sideDrawerOpen };
        });
    }
    backdropClickHandler = () => {
        this.setState({ sideDrawerOpen: false });
    };
    

    componentDidMount(){
        this.getPins();
    }
    getPins(){
        fetch('https://data.cityofnewyork.us/resource/5uac-w243.json?')
        .then(results => results.json())
        .then(data => this.setState({pins: data}))
    }

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

    renderMarkers() {
        this.state.pins.map((pin, i) => {
            return <Marker
            key={ i }
            onClick = { this.onMarkerClick }
            // title = { pin.locName }
            //position = { JSON.parse(pin.position) }
            // position={{ lat: pin.lat, lng: pin.long }}
            position={{ lat: pin.latitude, lng: pin.longitude}}
            // desc = { pin.desc }
            // name = { pin.locName } 
            />;
        });
    }


    render() {
        let backdrop;
        if (this.state.sideDrawerOpen) {
            backdrop = <Backdrop click={this.backdropClickHandler} />;
        }
        
        const markers = this.state.pins.map((pin, i) => {
            return <Marker 
                key = { i } 
                onClick = { this.onMarkerClick }
                name = { pin.ofns_desc }
                date = { pin.cmplnt_fr_dt }
                levelOfOffense = { pin.law_cat_cd }
                didComplete = { pin.crm_atpt_cptd_cd }
                position={{ lat:pin.latitude, lng:pin.longitude }}
            />
        })

        return (
            <div style={{ height: '100%' }}>
                <Toolbar drawerClickHandler={this.drawerToggleClickHandler} />
                <SideDrawer show={this.state.sideDrawerOpen} /> ;
                {backdrop}
                <main style={{ marginTop: '30px' }}>
                    <Map
                        google={this.props.google}
                        zoom={12}
                        style={mapStyles}
                        initialCenter={{ lat: 40.7, lng: -73.9 }} //increase lat, moves up increase lng moves right
                        >

                        {markers}
                        
                        <InfoWindow
                            marker={this.state.activeMarker}
                            visible={this.state.showingInfoWindow}
                            onClose={this.onClose}
                            >
                            <div>
                                <h1>{this.state.selectedPlace.name}</h1>
                                <h4>
                                    Occurring on { this.state.selectedPlace.date }, this { this.state.selectedPlace.levelOfOffense } was { this.state.selectedPlace.didComplete }.
                                </h4>
                            </div>
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