import { SET_USERNAME } from './usernameTypes.js';

const initialState = {
    username: null
};

const usernameReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERNAME:
            return {
                username: action.username
            };
        default:
            return state;
    }
};

export default usernameReducer;
