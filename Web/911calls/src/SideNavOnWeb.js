import React from '.react';
import Toolbar from './components/Toolbar/Toolbar';
import SideDrawer from './components/SideDrawer/SideDrawer';
import Backdrop from './components/Backdrop/Backdrop';


class SideNavOnWeb extends React.Component{
    constructor(){
        super()
        this.state = {
            //navbar
            sideDrawerOpen: false,
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
                    toggleMap={()=> this.setState({renderingMap : true})}
                    toggleAboutMe={()=> this.setState({renderingMap : false})}
                /> 
                {backdrop}
                <main style={{ marginTop: '30px' }}>

                    {/* {this.props.content()} */}

                </main>
            </div>
        );
    }
}

export default SideNavOnWeb;