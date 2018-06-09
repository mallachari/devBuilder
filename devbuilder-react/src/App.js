import React, { Component } from 'react';

import classes from  './App.css';
import Layout from './containers/Layout/Layout';
import Developer from './containers/Developer/Developer';
import Builder from './containers/Builder/Builder';

class App extends Component {
  render() {
    return (
      <div className={classes.App}>
        <Layout>
          <Developer/>
          <Builder/>
        </Layout>
      </div>
    );
  }
}

export default App;
