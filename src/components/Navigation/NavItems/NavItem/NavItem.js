import React from 'react';

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
         <a>{props.children}</a>
      </li>
   );
}

export default navItem;