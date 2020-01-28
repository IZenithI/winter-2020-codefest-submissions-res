import React from 'react';
import MapContainer from './MapContainer'

import Toolbar from './components/Toolbar/Toolbar';
import SideDrawer from './components/SideDrawer/SideDrawer';
import Backdrop from './components/Backdrop/Backdrop';

import AboutMe from './components/AboutMe/AboutMe';

export default class App extends React.Component {
    constructor(){
        super()
        this.state = {
            //Map display
            displayWhichMap: "default",

            //navbar
            sideDrawerOpen: false,

            //content
            renderingMap: true 
        };
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
    
    //render map or about me
    renderContent(){
        if(this.state.renderingMap){
            if(this.state.displayWhichMap === 'default') {
                return <MapContainer />;
            }
            else if(this.state.displayWhichMap === 'felony'){
                console.log(this.displayWhichMap)
                return <MapContainer whichMap = {this.displayWhichMap} />
            }
        }else{
            return <AboutMe />;
        }
    }


    render() {
        let backdrop;
        if (this.state.sideDrawerOpen) {
            backdrop = <Backdrop click={this.backdropClickHandler} />;
        }

        return (
            <div style={{ height: '100%' }}>
                <Toolbar drawerClickHandler={this.drawerToggleClickHandler} />
                <SideDrawer 
                    show={this.state.sideDrawerOpen} 
                    toggleMap= {()=> this.setState({renderingMap : true})}
                    toggleAboutMe= {()=> this.setState({renderingMap : false})}
                    changeMapFelony= {() => this.setState({ displayWhichMap : 'felony' })}
                /> 
                {backdrop}
                <main style={{ marginTop: '30px' }}>
                    {this.renderContent()}
                </main>
            </div>
        );
    }
}