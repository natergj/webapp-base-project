import * as React from 'react';
import { render } from 'react-dom';
import { HashRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux';
import { routerWithRedux } from './shared-components/router-with-redux';

// import polyfills
import 'isomorphic-fetch';
import 'matchmedia-polyfill';

// import main page components
import Main from './routes/home/homeContainer';
import NetworkContainer from './routes/network/networkContainer';
import { store, history } from './modules/createStore';

const MyRouter = routerWithRedux(HashRouter);
render((
  <Provider store={store} >
    <MyRouter history={history} >
      <div>
        <Route exact path="/" component={Main} />
        <Route path="/:networkId" component={NetworkContainer} />
      </div>
    </MyRouter>
  </Provider>
), document.getElementById('app'));
