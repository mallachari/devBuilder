import React from 'react';
import classes from './SidebarToggler.css';

const sideBarToggler = (props) => (
   <div className={classes.SidebarToggler} onClick={props.togglerClicked}>
      <div></div>
      <div></div>
      <div></div>
   </div>
);

export default sideBarToggler;