import React from 'react';
import classes from './SkillPanel.css';
import Button from '../../UI/Button/Button';
import Slider from '../../UI/Slider/Slider';

const skillPanel = (props) => {
   let description = (
      <div className={classes.Description} onClick={props.editModeChange}>
            <span>{props.current.description ? props.current.description : 'Click to add description'}</span>
         </div>
   );

   if(props.editMode) {
      description = (
         <div className={classes.DescriptionEdit}>
            <textarea 
               rows="3" cols="80" 
               value={props.current.description}
               onChange={props.handleChangeDescription}></textarea>
            <Button clicked={props.editModeChange}>Close</Button>
         </div>
      );
   }

   let buttons;

   /* if skill exists (was added before) */
   if(props.exists) { 
      buttons = (
         <div className={classes.Buttons}>
            <Button 
               type='Highlight' 
               size='30'
               clicked={() => props.skillAdded(props.current.name,props.current.value,props.current.description)}>Update</Button>
            <Button 
               type='Highlight' 
               size='30'
               clicked={() => props.skillRemoved(props.current.name)}>Remove</Button>
         </div>
      );
   } else {
      buttons = (
         <div className={classes.Buttons}>
            <Button 
               type='Highlight' 
               size='30'
               clicked={() => props.skillAdded(props.current.name,props.current.value,props.current.description)}>Add</Button>
         </div>
      )
   }

   return (
      <div className={classes.SkillPanel}>
         <header>
            <h1>{props.fullName}</h1>
            {/* <h1><i class="fab fa-js"></i></h1> */}
         </header>
         { description }
         <div className={classes.SkillImportance}>
            <h4>Skill importance</h4>
            <Slider value={props.current.value} handleChange={props.handleSliderChange}/>
         </div>
         <hr/>
         { buttons }
      </div>
      
   );
}

export default skillPanel;