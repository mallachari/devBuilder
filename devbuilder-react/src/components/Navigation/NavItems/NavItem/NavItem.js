import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavItem.css';

const navItem = (props) => {
   const classNames = [classes.NavItem];
   if(props.disabled)
      classNames.push(classes.Disabled);

   return (
      <li 
      className={classNames.join(' ')}
      onMouseEnter={props.hoverIn}
      onMouseLeave={props.hoverOut}>
         <NavLink className={classes.Link}
          to={props.to}
          exact={props.exact}
          activeClassName={classes.active}>{props.children}</NavLink>
      </li>
   );
}

export default navItem;