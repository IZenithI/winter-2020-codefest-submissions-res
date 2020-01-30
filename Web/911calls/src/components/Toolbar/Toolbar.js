import React from 'react';

import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';
import '../SideDrawer/DrawerToggleButton'
import './Toolbar.css';

const toolbar = props => (
    <header className="toolbar">
        <nav className="toolbar_navigation">
            <div>
                <DrawerToggleButton click={props.drawerClickHandler}/>
            </div>
            <div className="toolbar_logo"><a href="/">Res</a></div>
            <div className="spacer"></div>
            <div className="toolbar_navigation-items">
                {/* <ul>
                    <li><a href="/">Products</a></li>
                    <li><a href="/">Users</a></li>
                </ul> */}
            </div>
        </nav>
    </header>
);

export default toolbar;