import { userService } from '../services/userService';
import { history } from '../helpers/history';
import { actionCreators as alertAction} from './Alert';
const LOGIN_REQUEST = 'USERS_LOGIN_REQUEST';
const LOGIN_SUCCESS = 'USERS_LOGIN_SUCCESS';
const LOGIN_FAILURE = 'USERS_LOGIN_FAILURE';

const LOGOUT = 'USERS_LOGOUT';

const GETALL_REQUEST = 'USERS_GETALL_REQUEST';
const GETALL_SUCCESS = 'USERS_GETALL_SUCCESS';
const GETALL_FAILURE = 'USERS_GETALL_FAILURE';


const initialState = { loading: false, error: '', items: [] };

export const actionCreators = {
    login: (username, password) => async(dispatch, getState) => {
        return dispatch => {
            dispatch(request({ username }));

            userService.login(username, password)
                .then(
                    user => {
                        dispatch(success(user));
                        history.push('/');
                    },
                    error => {
                        dispatch(failure(error));
                        dispatch(alertAction.error(error));
                    }
                );
        };

        function request(user) {
            return {
                type: LOGIN_REQUEST, user
            }
        }

        function success(user) {
            return { type: LOGIN_SUCCESS, user }
        }

        function failure(error) {
            return { type: LOGIN_FAILURE, error }
        }
    },
    logout: () => async (dispatch, getState) => {
        userService.logout();
        return { type: LOGOUT };
    },
    getAll: () => async (dispatch, getState) => {
        return dispatch => {
            dispatch(request());

            userService.getAll()
                .then(
                    users => dispatch(success(users)),
                    error => dispatch(failure(error))
                );
        };

        function request() { return { type: GETALL_REQUEST } }
        function success(users) { return { type: GETALL_SUCCESS, users } }
        function failure(error) { return { type: GETALL_FAILURE, error } }
    }
};

export const reducer = (state, action) => {
    state = state || initialState;

    if (action.type == GETALL_REQUEST) {
        return {
            ...state,
            loading: true
        }
    }

    if (action.type == GETALL_SUCCESS) {
        return {
            ...state,
            items: action.users
        }
    }

    if (action.type == GETALL_FAILURE) {
        return {
            ...state,
            error: action.error
        }
    }
    return state;
};
