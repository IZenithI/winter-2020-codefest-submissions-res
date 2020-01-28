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
                    <option value="" onClick = {() => props.changeMapDefault()}> Default (everything) </option>
                    <option value="1" onClick = {() => props.changeMapMisdemeanor()}> Misdemeanor (small) </option>
                    <option value="2" onClick = {() => props.changeMapFelony()}> Felony (medium) </option>
                    <option value="3" onClick = {() => props.changeMapViolation()}> Violation (large) </option>
                </select>
                <a onClick = {() => props.toggleAboutMe()}>Meet The Team</a>
            </ul>
        </nav>
    );
};

export default sideDrawer;