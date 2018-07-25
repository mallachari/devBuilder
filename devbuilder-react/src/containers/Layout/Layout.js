import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Navbar from '../../components/Navigation/Navbar/Navbar';
import Footer from '../../components/Navigation/Footer/Footer';
import Sidebar from '../../components/Navigation/Sidebar/Sidebar';


class Layout extends Component {

  state = {
    showSidebar: false
  };

  togglerHandler = () => {
    this.setState((prevState) => {
      return {
        showSidebar: !prevState.showSidebar
      }
    });
  }

  sidebarClosedHandler = () => {
    this.setState({ showSidebar: false });
  }

  render() {
    return (
      <Fragment>
        <Navbar
          isAuthenticated={this.props.isAuthenticated}
          togglerClicked={this.togglerHandler}/>
        <Sidebar
          isAuthenticated={this.props.isAuthenticated}
          isOpen={this.state.showSidebar}
          closed={this.sidebarClosedHandler}/>
        <main>
          {this.props.children}
        </main>
        <Footer/>
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

export default connect(mapStateToProps)(Layout);