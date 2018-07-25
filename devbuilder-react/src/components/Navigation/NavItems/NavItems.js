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
        <NavItem to="/" exact>Build</NavItem>
        <NavItem
          to="/about"
          hoverIn={()=>this.toggleShowHandler('about')}
          hoverOut={()=>this.toggleShowHandler('about')}>
          About
          <Tooltip 
            type="Bottom" 
            show={this.state.show.about}
            fontSize="15"
            size="80">Not yet</Tooltip>
        </NavItem>
        {this.props.isAuthenticated ? <NavItem to="/orders">Orders</NavItem> : null}
        {!this.props.isAuthenticated 
          ? <NavItem to="/auth">Auth</NavItem>
          : <NavItem to="/logout">Logout</NavItem>
        }
        
      </ul>
    );
  }
}
export default NavItems;