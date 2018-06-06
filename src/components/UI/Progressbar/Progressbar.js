import React from 'react';

import classes from './Progressbar.css';

const progressbar = (props) => {
   return (
      <div className={classes.Meter}>
         <span style={{width: props.value+'%'}}></span>
      </div>
   );
}

export default progressbar;