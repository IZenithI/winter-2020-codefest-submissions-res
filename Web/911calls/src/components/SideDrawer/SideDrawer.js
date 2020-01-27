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
                {/* <li><a href="/">Map</a></li>
                <li><a href="/">Analytics</a></li>
                <li><a href="/">Meet The Team</a></li> */}
                
                <li>Map</li>
                <li>Analytics</li>
                <li>Meet The Team</li>
            </ul>
        </nav>
    );
};

export default sideDrawer;