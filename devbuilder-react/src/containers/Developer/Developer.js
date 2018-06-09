import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Developer.css';
import Skill from '../../components/Developer/Skill/Skill';
import Tooltip from '../../components/UI/Tooltip/Tooltip';
import * as builderActions from '../../store/actions/devBuilder';

class Developer extends Component {
   state = {
      tooltip: false
   }

   showTooltipHandler = () => {
      this.setState({tooltip: true});
   }
   
   hideTooltipHandler = () => {
      this.setState({tooltip: false});
   }

   render() {
      const skillsArray = [];
      for (let key in this.props.skills) {
         skillsArray.push(this.props.skills[key]);
      }

      let elements = skillsArray.map(skill => (
         <Skill 
            key={skill.name}
            skill={this.props.skillsList[skill.name].fullName} 
            value={10*skill.value}
            clicked={() => this.props.setCurrentSkill(skill.name)}/>
      ));
      if(skillsArray.length===0) {
         const noSkillsArray = [
            'please', 
            'start', 
            <i className="fab fa-js"></i>, 
            <i className="fab fa-html5"></i>,
            <i className="fab fa-react"></i>, 
            <i className="fab fa-angular"></i>, 
            <i className="fab fa-node"></i>, 
            <i className="fab fa-git"></i>, 
            <i className="fab fa-css3"></i>, 
            <i className="fab fa-github"></i>, 
            'adding',
            'skills'
         ];
         elements = noSkillsArray.map((text,index) => (
            <div 
               className={classes.NoSkills}
               key={index}>
               <h2>{text}</h2>
            </div>
         ));
      }

      return (
         <div className={classes.Developer}>
            {elements}
            <div 
               className={classes.Icon} 
               onMouseEnter={this.showTooltipHandler}
               onMouseLeave={this.hideTooltipHandler}
               >
               <Tooltip type="Top" show={this.state.tooltip}>
                  I do nothing yet, but I will save your order in future
               </Tooltip>
               <i className="fab fa-android"></i>
            </div>
         </div>
      )
   }
}

const mapStateToProps = state => {
   return {
      skills: state.skills,
      skillsList: state.skillsList
   }
};

const mapDispatchToProps = dispatch => {
   return {
      setCurrentSkill: (name) => dispatch(builderActions.setCurrentSkill(name))
   }
};

export default connect(mapStateToProps, mapDispatchToProps)(Developer);