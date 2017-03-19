import * as React from 'react';
import { render } from 'react-dom';
import { IndexRoute, Route, Router, hashHistory } from 'react-router';
import { Provider } from 'react-redux';

// import polyfills
import 'isomorphic-fetch';
import 'matchmedia-polyfill';

// import main page components
import Main from './routes/home/homeContainer';
import NetworkContainer from './routes/network/networkContainer';
import { store, history } from './modules/createStore';

render((
  <Provider store={store} >
    <Router history={history}>
      <Route path="/">
        <IndexRoute component={Main} />
        <Route path=":networkId" component={NetworkContainer} />
      </Route>
    </Router>
  </Provider>
), document.getElementById('app'));
