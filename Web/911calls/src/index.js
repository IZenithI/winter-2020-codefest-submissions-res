import React from 'react';
import ReactDOM from 'react-dom';
import MapContainer from './MapContainer';
  
class App extends React.Component {
    render() {
        return (
            <MapContainer />
        );
    }
    
}

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);