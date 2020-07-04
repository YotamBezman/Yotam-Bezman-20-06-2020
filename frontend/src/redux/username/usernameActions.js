import { SET_USERNAME } from './usernameTypes.js';

export const setUsername = username => ({
    type: SET_USERNAME,
    username: username
});
