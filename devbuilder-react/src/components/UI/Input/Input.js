import React from 'react';

import classes from './Input.css';

const input = (props) => {
  const inputClasses = [classes.InputElement];

  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid);
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      <input 
        className={inputClasses.join(' ')}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed} />
    </div>
  );
}

export default input;