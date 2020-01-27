import React from 'react';
import './SideDrawer.css';

const sideDrawer = props => {
    let drawerClasses = 'side-drawer';
    if(props.show){
        drawerClasses = 'side-drawer open';
    }
   return (
        <nav className={drawerClasses}>
            <ul>
                <a onClick = {() => props.toggleMap()}>Map</a>
                <a>Analytics</a>
                <a onClick = {() => props.toggleAboutMe()}>Meet The Team</a>
            </ul>
        </nav>
    );
};

export default sideDrawer;