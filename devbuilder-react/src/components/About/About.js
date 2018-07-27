import React from 'react';

import classes from './About.css';

const about = (props) => (
  <div className={classes.About}>
    <div className={classes.Content}>
      <i className="fab fa-react"></i>
      <p><b>The purpose of the app is to provide a simple interface for companies to request their need of development skills from author.</b></p>
      <p>This app is built with React/Redux. It communicates with backend responsible for data storage, authorization and orders management.</p>
      <p>Backend was written with Node.js. It uses Modgodb for data storage, Express for REST exposition and express-graphql for GraphQL server implementation. All operations are available within REST and GrapghQL queries.</p>
      <p>The next steps are adding GraphQL implementation of the client and to create the same front end with Angular.</p>
      <i className="fab fa-react"></i>
      <p>Contact: <a href="mailto:mallachari@gmail.com">mallachari@gmail.com</a></p>
    </div>
  </div>
);

export default about;