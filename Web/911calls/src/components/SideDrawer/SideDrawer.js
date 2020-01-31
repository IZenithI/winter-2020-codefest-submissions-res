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
                <div onClick = {() => props.toggleMap()}>Map</div>
                <select class="ui dropdown">
                    <option value="" onClick = {() => props.changeMapDefault()}> Default (everything) </option>
                    <option value="1" onClick = {() => props.changeMapMisdemeanor()}> Misdemeanor (small) </option>
                    <option value="2" onClick = {() => props.changeMapFelony()}> Felony (medium) </option>
                    <option value="3" onClick = {() => props.changeMapViolation()}> Violation (large) </option>
                    <option value="4" onClick = {() => props.changeMapQueens()}> Queens </option>
                    <option value="5" onClick = {() => props.changeMapManhattan()}> Manhattan </option>
                    <option value="6" onClick = {() => props.changeMapBrooklyn()}> Brooklyn </option>
                    <option value="7" onClick = {() => props.changeMapBronx()}> Bronx </option>
                    <option value="8" onClick = {() => props.changeMapStatenIsland()}> Staten Island </option>

                </select>
                <div onClick = {() => props.toggleAboutMe()}>Meet The Team</div>
            </ul>
        </nav>
    );
};

export default sideDrawer;