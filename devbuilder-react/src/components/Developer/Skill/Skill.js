import React from 'react';

import classes from './Skill.css';
import Progressbar from '../../UI/Progressbar/Progressbar';

const skill = (props) => {

  const classNames = [classes.Skill, classes[props.type]];

  
   return (
      <div className={classNames.join(' ')} onClick={props.clicked}>
         {props.skill}
         <Progressbar value={props.value}/>
      </div>
   )
}

export default skill;