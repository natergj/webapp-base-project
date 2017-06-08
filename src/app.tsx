import * as React from 'react';
import { render } from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { routerWithRedux } from './shared-components/router-with-redux';

// import polyfills
import 'isomorphic-fetch';
import 'matchmedia-polyfill';

// import main page components
import LayoutPage from './shared-components/layout/layout';
import { store, history } from './modules/createStore';

const MyRouter = routerWithRedux(HashRouter);
render((
  <Provider store={store} >
    <MyRouter history={history} >
      <LayoutPage />
    </MyRouter>
  </Provider>
), document.getElementById('app'));
