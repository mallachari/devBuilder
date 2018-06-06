import React, { Component } from 'react';

import NavItem from './NavItem/NavItem';
import classes from './NavItems.css';
import Tooltip from '../../UI/Tooltip/Tooltip';

class NavItems extends Component {

   state = {
      show: {
         about: false,
         sign: false
      }
   }

   toggleShowHandler = (type) => {
      this.setState(prevState => {
         return {
            show: {
               ...prevState.show,
               [type]: !prevState.show[type]
            }
         }
      });
   }

   render() {
      return (
         <ul className={classes.NavItems}>
            <NavItem>Build</NavItem>
            <NavItem 
               hoverIn={()=>this.toggleShowHandler('about')}
               hoverOut={()=>this.toggleShowHandler('about')}>
               About
               <Tooltip 
                  type="Bottom" 
                  show={this.state.show.about}
                  fontSize="15"
                  size="80">Not yet</Tooltip>
            </NavItem>
            <NavItem
               hoverIn={()=>this.toggleShowHandler('sign')}
               hoverOut={()=>this.toggleShowHandler('sign')}>Sign In
               <Tooltip 
                  type="Bottom" 
                  show={this.state.show.sign}
                  fontSize="15"
                  size="80">Not yet</Tooltip>
            </NavItem>
         </ul>
      );
   }
}
export default NavItems;