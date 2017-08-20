import * as React from 'react';
import { render } from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, history } from './modules/createStore';
import { routerWithRedux } from './shared-components/router-with-redux';

// import main page components
import AppLayout from './shared-components/layout/layout';

const MyRouter = routerWithRedux(HashRouter);
render((
  <Provider store={store} >
    <MyRouter history={history} >
      <AppLayout />
    </MyRouter>
  </Provider>
), document.getElementById('app'));
