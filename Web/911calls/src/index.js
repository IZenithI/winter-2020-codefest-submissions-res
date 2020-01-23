import React from 'react';
import ReactDOM from 'react-dom';
import MapContainer from './MapContainer';  //google maps
//import readXlsxFile from 'read-excel-file';   //read excel   
//import $ from 'jquery'; //jquery

class App extends React.Component {
    state = { items: []};

    componentDidMount(){
        this.getItems();
    }

    getItems(){
        fetch('https://data.cityofnewyork.us/resource/5uac-w243.json?')
        .then(results => results.json())
        .then(results => this.setState({items: results}));
    }

    render() {
        return (
            //<MapContainer />
            <ul>
                {this.state.items.map(function(item, index){
                    return (
                        <div key = {index}>
                            <h1>{item.juris_desc}</h1>
                            <p>{item.vic_race}</p>
                        </div>
                    )
                })}
            </ul>
        );
    }
}

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);