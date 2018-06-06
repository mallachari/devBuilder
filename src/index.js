import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import devBuilder from './store/reducers/devBuilder';

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const store = createStore(devBuilder, composeEnhancers(
   applyMiddleware(thunk)
));

const app = (
   <Provider store={store}>
      <App />
   </Provider>
)

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
