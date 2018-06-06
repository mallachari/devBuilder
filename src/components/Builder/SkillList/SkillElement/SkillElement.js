import React from 'react';

import classes from './SkillElement.css';
import Button from '../../../UI/Button/Button';

const skill = (props) => {
   return (
      <div className={classes.Skill}>
         <Button 
            type='Highlight' 
            border
            size="16" 
            clicked={() => props.clicked(props.skill.name)}>{props.skill.fullName}</Button>
      </div>
   )
}

export default skill;