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
                <select class="ui dropdown">
                    <option value="">Sort</option>
                    <option value="0" onClick ={() => props.changeMapFelony()}>Felony</option>
                    <option value="1">Male</option>
                    <option value="2">Female</option>
                </select>
                <a onClick = {() => props.toggleAboutMe()}>Meet The Team</a>
            </ul>
        </nav>
    );
};

export default sideDrawer;