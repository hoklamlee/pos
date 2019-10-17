const LOGIN_REQUEST = 'USERS_LOGIN_REQUEST';
const LOGIN_SUCCESS = 'USERS_LOGIN_SUCCESS';
const LOGIN_FAILURE = 'USERS_LOGIN_FAILURE';

const LOGOUT = 'USERS_LOGOUT';

let user = JSON.parse(localStorage.getItem('user'));

const initialState = user ? { loggedIn: true, user } : {};

export const actionCreators = {

};

export const reducer = (state, action) => {
    state = state || initialState;

    if (action.type == LOGIN_REQUEST) {
        return {
            ...state,
            loggingIn: true,
            user: action.user
        }
    }

    if (action.type == LOGIN_SUCCESS) {
        return {
            ...state,
            loggedIn: true,
            user: action.user
        }
    }

    if (action.type == LOGIN_FAILURE) {
        return {
            ...state
        }
    }

    if (action.type == LOGOUT) {
        return {
            ...state
        }
    }

    return state;
};
