import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import reviews from './reviews'
import profsReducer from './profs'
import coursesReducer from './courses'
import debates from './debates'
import topics from './debate_topics'

const rootReducer = combineReducers({
  session,
  reviews,
  profs: profsReducer,
  courses: coursesReducer,
  debates,
  topics
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
