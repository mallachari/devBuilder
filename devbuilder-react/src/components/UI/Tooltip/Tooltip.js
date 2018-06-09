import React from 'react';

import classes from './Tooltip.css';

const tooltip = (props) => {
   let classNames = [classes.Tooltip];
   if(props.type === 'Bottom') {
      classNames.push(classes.Bottom);
   }
   if(props.type === 'Top') {
      classNames.push(classes.Top);
   }
   if(props.show)
      classNames = [...classNames, classes.Active];
   return (
      <span 
         className={classNames.join(' ')}
         style={{
            fontSize: props.fontSize+'px',
            width: props.size+'px',
            marginLeft: (-props.size/2) + 'px'
         }}>{props.children}</span>
   );
}
export default tooltip;