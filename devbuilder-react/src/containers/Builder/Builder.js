import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Builder.css';
import SkillList from '../../components/Builder/SkillList/SkillList';
import SkillPanel from '../../components/Builder/SkillPanel/SkillPanel';
import * as builderActions from '../../store/actions/devBuilder';

class Builder extends Component {

   state = {
      description: '',
      value: 1,
      editMode: false,
      loaded: ''
   }

   componentDidMount() {
      this.props.onInitSkills();
   }

   static getDerivedStateFromProps(props, state) {
      if(props.skills && props.skills[props.current]
         && (props.skills[props.current].description !== state.description
         || props.skills[props.current].value !== state.value)
         && props.current !== state.loaded
      ) {
         return {
            description: props.skills[props.current].description,
            value: props.skills[props.current].value,
            loaded: props.current,
            editMode: false
         }
      } else {
         return null;
      }
   }

   changeSkillhandler = (skillName) => {
      if(this.props.skills && this.props.skills[skillName]) {  // if skill exists (was added before)
         this.setState({ 
            description: this.props.skills[skillName].description,
            value: this.props.skills[skillName].value,
            editMode: false,
            loaded: skillName
         });
      } else {
         this.setState({ 
            value: 1,
            description: '',
            editMode: false,
            loaded: skillName 
         });
      }

      this.props.setCurrentSkill(skillName);
   }

   handleSliderChange = (event) => {
      this.setState({
         value: event.target.value
      });
   }

   changeEditModeHandler = () => {
      this.setState((prevState) => {
         return { editMode: !prevState.editMode };
      })
   }

   changeDescriptionHandler = (event) => {
      this.setState({
         description: event.target.value
      });
   }

   render() {
      return (
         <div className={classes.Controller}>
            <SkillList 
               skills={this.props.skillsList}
               changeSkill={this.changeSkillhandler} />
            <SkillPanel
               exists={this.props.skills && this.props.skills[this.props.current]} 
               current={{
                  name: this.props.current,
                  description: this.state.description,
                  value: this.state.value
               }}
               fullName={this.props.skillsList ? this.props.skillsList[this.props.current].fullName : 'loading'}
               handleSliderChange={this.handleSliderChange}
               editMode={this.state.editMode}
               editModeChange={this.changeEditModeHandler}
               handleChangeDescription={this.changeDescriptionHandler}
               skillAdded={this.props.onSkillAdded}
               skillRemoved={this.props.onSkillRemoved} />
         </div>
         
      );
   }
}

const mapStateToProps = state => {
   return {
      skills: state.skills,
      skillsList: state.skillsList,
      current: state.current
   }
}

const mapDispatchToProps = dispatch => {
   return {
      onSkillAdded: (name, val, desc) => dispatch(builderActions.addSkill(name, val, desc)),
      onSkillRemoved: (name) => dispatch(builderActions.removeSkill(name)),
      onInitSkills: () => dispatch(builderActions.initSkills()),
      setCurrentSkill: (name) => dispatch(builderActions.setCurrentSkill(name))
   }
};

export default connect(mapStateToProps, mapDispatchToProps)(Builder);