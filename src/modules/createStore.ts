import { Map } from 'immutable';
import { hashHistory } from 'react-router';
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux';
import { compose, applyMiddleware, createStore } from 'redux';
import { combineReducers } from 'redux-immutable';
import { apiMiddleware } from './apiMiddleware';

// Application Modules
import * as CitybikModule from './citybik';
import * as Routing from './routing';

// Merge application modules' reducers into a single reducer
const reducers = combineReducers({
  [CitybikModule.ModuleName]: CitybikModule.reducer,
  [Routing.ModuleName]: Routing.reducer,
});

// Compose all middleware functions into the redux execution chain (ordering may be important to you)
const composedMiddleware = compose(
  applyMiddleware(routerMiddleware(hashHistory)),
  applyMiddleware(apiMiddleware),
);

// Combine all reducer states into a single redux store and export for use with react-router
export const store = createStore(
  reducers,
  composedMiddleware,
);

// Merge history events with redux store and export for use with react-router
export const history = syncHistoryWithStore(
  hashHistory,
  store,
  {
    selectLocationState: (state: Map<string, any>) => {
      return state.get(Routing.ModuleName).toJS();
    },
  },
);
