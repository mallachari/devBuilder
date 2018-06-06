import React from 'react';

import NavItems from './../NavItems/NavItems';
import classes from './Navbar.css';
import Brand from '../Brand/Brand';

const navbar = (props) => (
   <div className={classes.Navbar}>
      <div className={classes.Navbar__Content}>
            <Brand togglerClicked={props.togglerClicked}/>
            <div className={classes.DesktopOnly}>
               <NavItems/>
            </div>
      </div>
   </div>
);

export default navbar;