import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import classes from  './App.css';
import Layout from './containers/Layout/Layout';
import Developer from './containers/Developer/Developer';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import Orders from './containers/Orders/Orders';
import About from './components/About/About';

import * as actions from './store/actions/auth';


class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth}/>
        <Route path="/about" component={About}/>
        <Route path="/" exact component={Developer}/>
        <Redirect to="/" />
      </Switch>
    );

    if( this.props.isAuthenticated ) {
      routes = (
        <Switch>
          <Route path="/auth" component={Auth}/>
          <Route path="/about" component={About}/>
          <Route path="/logout" component={Logout}/>
          <Route path="/orders" component={Orders}/>
          <Route path="/" exact component={Developer}/>
          <Redirect to="/" />
        </Switch>
      )
    }

    return (
      <div className={classes.App}>
        <Layout>
          { routes }
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch( actions.authCheckState() )
  };
};

export default withRouter( connect(mapStateToProps, mapDispatchToProps)(App) );
