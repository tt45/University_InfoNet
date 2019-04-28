import { combineReducers } from 'redux';
import userReducer from './userReducer';
import postReducer from './postReducer';
import detailReducer from './detailReducer';

export default combineReducers({
        userReducer,
        postReducer,
        detailReducer
});
