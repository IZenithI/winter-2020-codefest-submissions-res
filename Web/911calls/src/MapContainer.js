import React from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
// import PoliceDepartments from './PoliceDepartments.json';

const mapStyles = {
    width: '100%',
    height: '100%',
    marginTop: 20,
    // marginLeft: -7
};

class MapContainer extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            pins: [],
            // policePins: []
        };
    }

    componentDidMount = () => {
        this.getPinsFromApi();
        // this.getPinsFromPoliceJson();
    }
    getPinsFromApi = () => {
        fetch('https://data.cityofnewyork.us/resource/5uac-w243.json?')
        .then(results => results.json())
        .then(data => this.setState({ pins: data }))
    }

    // getPinsFromJson = () => {
    //     this.setState({
    //         pins: Result
    //     })
    // }

    // getPinsFromPoliceJson = () => {
    //     let tempPins = PoliceDepartments.map(departentInfo => {
    //         return <Marker 
    //             key = { i }
    //             onClick = { this.onMarkerClick }
    //             name = { departmentInfo.name }
    //             address = { departmentInfo.address }
    //             position = {{ lat:departmentInfo.latitude, lng:departmentInfo.longitude }}
    //         />
    //     })
    //     this.setState({
    //         policePins: tempPins;
    //     })
        
    // }

    onMarkerClick = (props, marker, e) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    }
    onClose = () => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    };

    renderMarkers = (props) => {
        let pins = this.state.pins.map((pin, i) => {
            if(this.props.whichMap === "default"){
                return <Marker 
                    key = { i } 
                    onClick = { this.onMarkerClick }
                    name = { pin.ofns_desc }
                    date = { pin.cmplnt_fr_dt }
                    levelOfOffense = { pin.law_cat_cd }
                    didComplete = { pin.crm_atpt_cptd_cd }
                    position = {{ lat:pin.latitude, lng:pin.longitude }}
                />
            }
            else if(this.props.whichMap === pin.law_cat_cd){
                return <Marker 
                key = { i } 
                onClick = { this.onMarkerClick }
                name = { pin.ofns_desc }
                date = { pin.cmplnt_fr_dt }
                levelOfOffense = { pin.law_cat_cd }
                didComplete = { pin.crm_atpt_cptd_cd }
                position = {{ lat:pin.latitude, lng:pin.longitude }}
                />
            }
        })
        return pins;
    }

    // renderInfoGraphicsText = (props) => {

    // }
    
    render(){
        return <Map
            google={this.props.google}
            zoom={12}
            style={mapStyles}
            initialCenter={{ lat: 40.7, lng: -73.9 }} //increase lat, moves up increase lng moves right
            >

            { this.renderMarkers() }  
            {/* { this.getPinsFromJson() } */}

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
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyC91naZ4TM0LlmSTRqEUIYz7ak-JDbL3us '
}) (MapContainer);