import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import eventsReducer from '../reducers/events';
import locationsReducer from '../reducers/locations';
import map from '../reducers/Map';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  //Create Store
  const store = createStore(
    combineReducers({
      auth: authReducer,
      events: eventsReducer,
      locations: locationsReducer,
      map: map
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
