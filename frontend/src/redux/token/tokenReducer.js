import { SET_TOKEN } from './tokenTypes.js'


const initialState = {
    token: null
}

const tokenReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TOKEN:
            return {
                token: action.token
            };
        default:
            return state;
    }
};

export default tokenReducer;
