import React from 'react';
import classes from './Brand.css';
import Toggler from '../Sidebar/SidebarToggler/SidebarToggler';

const brand = (props) => (
   <div className={classes.Brand}>
      <Toggler togglerClicked={props.togglerClicked}/>
      <div className={classes.Brand__Title}>Dev Builder</div>
   </div>
);

export default brand;