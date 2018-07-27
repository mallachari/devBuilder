import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import classes from './Developer.css';
import Builder from '../Builder/Builder';
import Skill from '../../components/Developer/Skill/Skill';
import Tooltip from '../../components/UI/Tooltip/Tooltip';
import * as builderActions from '../../store/actions/devBuilder';
import * as orderActions from '../../store/actions/order';
import { setTimeout } from 'timers';
import Modal from '../../components/UI/Modal/Modal';
import Checkout from '../../components/Developer/Checkout/Checkout';

class Developer extends Component {
   state = {
      tooltip: false,
      tooltipText: 'Click me to make an order',
      checkout: false
   }

  componentWillReceiveProps(nextProps) {
    if(!nextProps.token) {
      this.setState({
        tooltipText: 'You should login first to make an order'
      })
    } else if(!nextProps.skills) {
      this.setState({
        tooltipText: 'You should add some skills before ordering'
      })
    } else {
      this.setState({
        tooltipText: 'Click me to make an order'
      })
    }

    //if order was just received
    if(nextProps.purchased && !this.props.purchased) {
      this.setState({
        tooltip: true,
        tooltipText: 'Order sent'
      })
    }

  }

  componentDidUpdate() {
    if(this.props.purchased) {
      setTimeout(() => {
        this.props.resetSkills();
        this.props.initOrder();
      }, 1500);
    }
  }

  // componentDidMount() {
  //   this.props.initOrder();
  // }

   showTooltipHandler = () => {
      this.setState({tooltip: true});
   }
   
   hideTooltipHandler = () => {
      this.setState({tooltip: false});
   }

   modalClosed = () => {
     this.setState({checkout: false});
   }

   checkoutHandler = () => {
    if(!this.props.skills || !this.props.token) {
      return;
    }

     this.setState({checkout: true});
   }

   orderHandler = (title, description) => {
     const order = {
       title,
       description,
       skills: []
     }
     
     for(let key in this.props.skills) {
       order.skills.push({
        type: key,
        description: this.props.skills[key].description,
        value: this.props.skills[key].value
       });
     }

     this.props.addOrder(order, this.props.token);

     this.setState({checkout: false});
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
        <Fragment>    
         <div className={classes.Developer}>
            {elements}
            <div 
               className={classes.Icon} 
               onMouseEnter={this.showTooltipHandler}
               onMouseLeave={this.hideTooltipHandler}
               onClick={this.checkoutHandler}
               >
               <Tooltip type="Top" show={this.state.tooltip}>
                  {this.state.tooltipText}
               </Tooltip>
               <i className="fab fa-android"></i>
            </div>
         </div>
         <Modal
            show={this.state.checkout}
            modalClosed={this.modalClosed}>
            <Checkout onSend={this.orderHandler}/>
          </Modal>
         <Builder/>
        </Fragment>
      )
   }
}

const mapStateToProps = state => {
   return {
      skills: state.devBuilder.skills,
      skillsList: state.devBuilder.skillsList,
      token: state.auth.token,
      purchased: state.order.purchased
   }
};

const mapDispatchToProps = dispatch => {
   return {
      setCurrentSkill: (name) => dispatch(builderActions.setCurrentSkill(name)),
      resetSkills: () => dispatch(builderActions.resetSkills()),
      initOrder: () => dispatch(orderActions.orderInit()),
      addOrder: (order, token) => dispatch(orderActions.addOrder(order, token))
   }
};

export default connect(mapStateToProps, mapDispatchToProps)(Developer);