import React from 'react';

import classes from './SkillList.css';
import Skill from './SkillElement/SkillElement';

const skillList = (props) => {
   const skillsArray = [];
   for (let key in props.skills) {
      skillsArray.push({
         ...props.skills[key],
         id: key
      });
   }

   return (
      <div className={classes.SkillList}>
         {skillsArray.map(skill => (
            <Skill 
               key={skill.fullName} 
               skill={skill}
               clicked={props.changeSkill}/>
         ))}
      </div>  
   );
}

export default skillList;