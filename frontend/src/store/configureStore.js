import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../reducer/rootReducer';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux'

export default function configureStore() {
  return createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware),
  );
}
