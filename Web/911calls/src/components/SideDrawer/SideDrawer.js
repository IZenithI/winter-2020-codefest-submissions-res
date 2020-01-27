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
                <li onClick = {() => props.toggleMap()}>Map</li>
                <li>Analytics</li>
                <li onClick = {() => props.toggleAboutMe()}>Meet The Team</li>
            </ul>
        </nav>
    );
};

export default sideDrawer;