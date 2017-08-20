import { compose, applyMiddleware, createStore } from 'redux';
import { combineReducers } from 'redux-immutable';
import { apiMiddleware } from './apiMiddleware';
import createHistory from 'history/createBrowserHistory';

// Application Modules
import * as CitybikModule from './citybik';
import * as Routing from './routing';

export const history = createHistory();

// Merge application modules' reducers into a single reducer
const reducers = combineReducers({
  [CitybikModule.ModuleName]: CitybikModule.reducer,
  [Routing.ModuleName]: Routing.reducer,
});

// Compose all middleware functions into the redux execution chain
const middleware = [
  apiMiddleware,
];
const composedMiddleware = compose(applyMiddleware(...middleware));

// Combine all reducer states into a single redux store and export for use with react-router
export const store = createStore(
  reducers,
  composedMiddleware,
);
