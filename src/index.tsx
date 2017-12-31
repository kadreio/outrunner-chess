import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router';
import { createBrowserHistory } from 'history';
import { configureStore } from './store';
import { App } from './containers/App';
import { Login } from './containers/Login';

import firebase from '@firebase/app'
import '@firebase/auth';

import "./root.css";


const store = configureStore();
const history = createBrowserHistory();

firebase.auth().onAuthStateChanged((user) => {
  if (!user) {
    history.push('/login');
  }
});

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/login" component={Login} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);
