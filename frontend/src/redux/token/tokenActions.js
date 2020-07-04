import { SET_TOKEN } from './tokenTypes.js';

export const setToken = token => ({
    type: SET_TOKEN,
    token: token
});
