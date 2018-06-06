import React from 'react';

import classes from './Button.css';

const button = (props) => {
   const classNames = [classes.Button, classes[props.type]];
   if(props.border)
      classNames.push(classes.BorderLeft);
   return (
      <button
         style={{fontSize: props.size+'px'}}
         className={classNames.join(' ')} 
         onClick={props.clicked}>{props.children}</button>
   )
};

export default button;