import React from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
    width: '100%',
    height: '100%',
};

  
class MapContainer extends React.Component {
    render() {
        return (
            <Map
                google={this.props.google}
                zoom={12}
                style={mapStyles}
                initialCenter={{ lat: 40.7, lng: -73.9 }} //increase lat, moves up increase lng moves right
            />
        );
      }
    
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyC91naZ4TM0LlmSTRqEUIYz7ak-JDbL3us '
}) (MapContainer);