import { combineReducers } from 'redux';
import usernameReducer from './username/usernameReducer.js';
import tokenReducer from './token/tokenReducer.js';

const rootReducer = combineReducers({
    username: usernameReducer,
    token: tokenReducer
});

export default rootReducer;
