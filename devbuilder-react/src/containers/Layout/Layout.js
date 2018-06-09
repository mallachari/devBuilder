import React, { Component, Fragment } from 'react';

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
               togglerClicked={this.togglerHandler}/>
            <Sidebar
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

export default Layout;