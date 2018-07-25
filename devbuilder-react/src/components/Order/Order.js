import React, { Component } from 'react';

import classes from './Order.css';
import Skill from '../Developer/Skill/Skill';
import Button from '../UI/Button/Button';
import Tooltip from '../UI/Tooltip/Tooltip';

class Order extends Component {

  state = {
    tooltip: false,
    tooltipText: null,
    current: null
  }

   showTooltipHandler = (skill) => {
     const text = (
      <div>
        {skill.description}
      </div>
     );
      this.setState({
        tooltip: true,
        tooltipText: text,
        current: skill._id
      });
   }
   
   hideTooltipHandler = () => {
      this.setState({
        tooltip: false
      });
   }

  render() {
    return (
      <div className={classes.Order}>
        <h3>{this.props.name}</h3>
        <span>{this.props.description}</span>
        <div className={classes.Skills}>
          {this.props.skills.map(skill => (
            <div className={classes.Skill}
              key={skill._id}
              onMouseEnter={() => this.showTooltipHandler(skill)}
              onMouseLeave={this.hideTooltipHandler}>
              <Skill
                clicked={() => this.setState({
                  current: skill
                })}
                skill={skill.type.fullName}
                value={10*skill.value} />
              <Tooltip 
                type="Top" 
                show={
                    this.state.tooltip 
                    && skill.description
                    && this.state.current === skill._id
                  }>
                  {this.state.tooltipText}
               </Tooltip>
            </div>
          ))}
        </div>
        <hr/>
        <div className={classes.Buttons}>
          <Button 
              type='Highlight' 
              size='30'
              clicked={this.props.remove}>Remove</Button>
        </div>
      </div>
    )
  }
  
}

export default Order;