import React from 'react';

import classes from './Slider.css';

const slider = (props) => {
      return (
         <div className={classes.Container}>
            <input 
               type="range" 
               min="1" max="10" 
               className={classes.Slider}
               value={props.value}
               onChange={props.handleChange} 
               id="skillRange"/>
         </div>      
      );
}

export default slider;