import React from 'react';

import classes from './Skill.css';
import Progressbar from '../../UI/Progressbar/Progressbar';

const skill = (props) => {
  
   return (
      <div className={classes.Skill} onClick={props.clicked}>
         {props.skill}
         <Progressbar value={props.value}/>
      </div>
   )
}

export default skill;