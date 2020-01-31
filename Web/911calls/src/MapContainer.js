import React from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

import JsonPins from './nycRecentComplaintsData.json';
import PoliceDepartments from './PoliceDepartments.json';

const mapStyles = {
    position: 'absolute',
    width: '100vw',
    marginTop: 56,
    height: '92.55vh',
}

class MapContainer extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            pins: [],
            policePins: [],
            hospitalPins: []
        };
    }

    componentDidMount = () => {
        this.getPinsFromApi();
        this.getPinsFromJson();
    }

    getPinsFromApi = () => {
        //911 calls - 1000 files
        // fetch('https://data.cityofnewyork.us/resource/5uac-w243.json?')
        // .then(results => results.json())
        // .then(data => this.setState({ pins: data }))
        
        //hospitals - https://data.cityofnewyork.us/Health/NYC-Health-Hospitals-patient-care-locations-2011/f7b6-v6v3/data
        fetch('https://data.cityofnewyork.us/resource/f7b6-v6v3.json')
        .then(results => results.json())
        .then(data => this.setState({ hospitalPins: data }))
    }

    getPinsFromJson = () => {
        this.setState({
            pins: JsonPins,
            policePins: PoliceDepartments
        })
    }

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

    // renderMarkersFromApi = (props) => {
    //     let tempPins = this.state.pins.map((pin, i) => {
    //         if(this.props.whichMap === "default"){
    //             return <Marker 
    //                 key = { i } 
    //                 onClick = { this.onMarkerClick }
    //                 name = { pin.ofns_desc }
    //                 date = { pin.cmplnt_fr_dt }
    //                 levelOfOffense = { pin.law_cat_cd }
    //                 didComplete = { pin.crm_atpt_cptd_cd }
    //                 position = {{ lat:pin.latitude, lng:pin.longitude }}
    //             />
    //         }
    //         else if(this.props.whichMap === pin.law_cat_cd){
    //             return <Marker 
    //                 key = { i } 
    //                 onClick = { this.onMarkerClick }
    //                 name = { pin.ofns_desc }
    //                 date = { pin.cmplnt_fr_dt }
    //                 levelOfOffense = { pin.law_cat_cd }
    //                 didComplete = { pin.crm_atpt_cptd_cd }
    //                 position = {{ lat:pin.latitude, lng:pin.longitude }}
    //             />
    //         }
    //     })
    //     return tempPins;
    // }

    renderMarkersFromJson = (props) => {
        let tempPins = this.state.pins.map((pin, i) => {
            if(this.props.whichMap === "default"){
                return <Marker 
                    key = { i } 
                    onClick = { this.onMarkerClick }
                    name = { pin.OFNS_DESC }
                    date = { pin.CMPLNT_FR_DT }
                    levelOfOffense = { pin.LAW_CAT_CD }
                    didComplete = { pin.CRM_ATPT_CPTD_CD }
                    position = {{ lat:pin.Latitude, lng:pin.Longitude }}
                    icon= {{ url: "http://labs.google.com/ridefinder/images/mm_20_green.png"}}    //changes to smaller red pins
                />
            }
            else if(this.props.whichMap === pin.LAW_CAT_CD || this.props.whichMap === pin.BORO_NM){
                return <Marker 
                    key = { i } 
                    onClick = { this.onMarkerClick }
                    name = { pin.OFNS_DESC }
                    date = { pin.CMPLNT_FR_DT }
                    levelOfOffense = { pin.LAW_CAT_CD }
                    didComplete = { pin.CRM_ATPT_CPTD_CD }
                    position = {{ lat:pin.Latitude, lng:pin.Longitude }}
                />
            }
        })
        return tempPins;
    }

    renderPoliceMarkersFromJson = () => {
        let tempPins = this.state.policePins.map((pin, i) => {
            return <Marker 
                key = { i } 
                position = {{ lat:pin.latitude, lng:pin.longitude }}
                icon={{ url: "http://maps.google.com/mapfiles/kml/paddle/blu-stars.png" }}
                style={{ zIndex:10 }}
            />
        })
        return tempPins;
    }

    renderHospitalMarkersFromApi = () => {
        let tempPins = this.state.hospitalPins.map((pin, i) => {
            if(pin.facility_type === "Acute Care Hospital" || pin.facility_type === "Diagnostic & Treatment Center")
            return <Marker
                key = { i }
                position = {{ lat:pin.latitude, lng:pin.longitude }}
                // icon = {{ url: "http://maps.google.com/mapfiles/kml/paddle/grn-stars.png" }}
                icon = {{ url: "http://maps.google.com/mapfiles/ms/micons/hospitals.png" }}
            />
        })
        return tempPins;
    }

    render(){
        console.log(this.state.hospitalPins)
        return <Map
            google={this.props.google}
            zoom={12}
            style={mapStyles}
            initialCenter={{ lat: 40.7, lng: -73.9 }} //increase lat, moves up increase lng moves right
            >

            {/* { this.renderMarkersFromApi() }   */}
            { this.renderMarkersFromJson() }
            { this.renderPoliceMarkersFromJson() }
            { this.renderHospitalMarkersFromApi() }

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