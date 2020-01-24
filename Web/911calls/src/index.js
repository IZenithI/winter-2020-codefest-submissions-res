import React from 'react';
import ReactDOM from 'react-dom';
import MapContainer from './MapContainer';  //google maps

class App extends React.Component {
    render() {
        return (
            <div>
                <MapContainer />
            </div>
        );
    }
}
