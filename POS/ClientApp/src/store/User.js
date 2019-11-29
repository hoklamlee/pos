import { userService } from '../services/userService';
import { history } from '../helpers/history';
import { actionCreators as alertAction } from './Alert';
const LOGIN_REQUEST = 'USERS_LOGIN_REQUEST';
const LOGIN_SUCCESS = 'USERS_LOGIN_SUCCESS';
const LOGIN_FAILURE = 'USERS_LOGIN_FAILURE';

const LOGOUT = 'USERS_LOGOUT';

const GETALL_REQUEST = 'USERS_GETALL_REQUEST';
const GETALL_SUCCESS = 'USERS_GETALL_SUCCESS';
const GETALL_FAILURE = 'USERS_GETALL_FAILURE';

const GET_USER_REQUEST = 'USERS_GET_REQUEST';
const GET_USER_SUCCESS = 'USERS_GET_SUCCESS';
const GET_USER_FAILURE = 'USERS_GET_FAILURE';

const ADD_REQUEST = 'USERS_ADD_REQUEST';
const ADD_SUCCESS = 'USERS_ADD_SUCCESS';
const ADD_FAILURE = 'USERS_ADD_FAILURE';

const UPDATE_REQUEST = 'USERS_UPDATE_REQUEST';
const UPDATE_SUCCESS = 'USERS_UPDATE_SUCCESS';
const UPDATE_FAILURE = 'USERS_UPDATE_FAILURE';

const DELETE_REQUEST = 'USERS_DELETE_REQUEST';
const DELETE_SUCCESS = 'USERS_DELETE_SUCCESS';
const DELETE_FAILURE = 'USERS_DELETE_FAILURE';


const initialState = { loading: false, error: '', items: [], item : null};

export const actionCreators = {
    updatePassword: (userId,password,passwordConfirm) => async (dispatch, getState) => {
        dispatch({ type: UPDATE_REQUEST });

        userService.updatePassword(userId, password, passwordConfirm)
            .then(
                user => {
                    dispatch({ type: LOGIN_SUCCESS, user });
                    dispatch({ type: UPDATE_SUCCESS });

                    dispatch(alertAction.success("Update Password Success"));
                },
                error => {
                    dispatch({ type: UPDATE_FAILURE, error });
                    dispatch(alertAction.error(error));
                }
            );
    },
    updateUserInfo: (userId, firstName, lastName, email, username) => async (dispatch, getState) => {
        dispatch({ type: UPDATE_REQUEST });

        userService.updateUserInfo(userId, firstName, lastName, email, username)
            .then(
                user => {
                    dispatch({ type: LOGIN_SUCCESS, user });
                    dispatch({ type: UPDATE_SUCCESS });

                    dispatch(alertAction.success("Update Info Success"));
                },
                error => {

                    dispatch({ type: UPDATE_FAILURE, error });
                    dispatch(alertAction.error(error));
                }
        );
    },
    logout: () => async (dispatch, getState) => {
        dispatch({
            type: LOGOUT
        });
        userService.logout();
    },
    login: (username, password) => async (dispatch, getState) => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => {
                    dispatch(success(user));
                    dispatch(alertAction.clear());
                    history.push('/');
                },
                error => {
                    console.log(error)

                    dispatch(failure(error));
                    dispatch(alertAction.error(error));
                }
            );


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

    getAllUsers: () => async (dispatch, getState) => {
        dispatch({ type: GETALL_REQUEST });

        userService.getAll()
            .then(
                items => {
                    dispatch({ type: GETALL_SUCCESS, items });
                },
                error => {
                    dispatch({ type: GETALL_FAILURE, error });
                    dispatch(alertAction.error(error));
                }
            );
    },
    getUserById: (id) => async (dispatch, getState) => {
        dispatch({ type: GET_USER_REQUEST });

        userService.getUserById(id)
            .then(
                item => {
                    console.log(item);
                    dispatch({ type: GET_USER_SUCCESS, item });
                },
                error => {
                    dispatch({ type: GET_USER_FAILURE, error });
                    dispatch(alertAction.error(error));
                }
            );
    },
    addUser: (firstName, lastName, username, email, password, displayname) => async (dispatch, getState) => {
        dispatch({ type: ADD_REQUEST });

        return new Promise((resolve, reject) => {
            userService.addUser(firstName, lastName, username, email, password, displayname)
                .then(
                    item => {
                        dispatch({ type: ADD_SUCCESS, item });
                        resolve(true);
                    },
                    error => {
                        dispatch({ type: ADD_FAILURE, error });
                        dispatch(alertAction.error(error));
                        resolve(false);

                    }
                );

        });

    },
    updateUser: (UserId, firstName, lastName, username, email, password, displayname) => async (dispatch, getState) => {
        dispatch({ type: UPDATE_REQUEST });

        return new Promise((resolve, reject) => {
            userService.updateUser(UserId, firstName, lastName, username, email, password, displayname)
                .then(
                    item => {
                        dispatch({ type: UPDATE_SUCCESS, item });
                        resolve(true);
                    },
                    error => {
                        dispatch({ type: UPDATE_FAILURE, error });
                        dispatch(alertAction.error(error));
                        resolve(false);

                    }
                );

        });
    },
    deleteUser: (userId) => async (dispatch, getState) => {
        dispatch({ type: DELETE_REQUEST });

        userService.deleteUser(userId)
            .then(
                item => {
                    dispatch({ type: DELETE_SUCCESS, item });
                },
                error => {
                    dispatch({ type: DELETE_FAILURE, error });
                    dispatch(alertAction.error(error));
                }
            );
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
            items: action.items
        }
    }

    if (action.type == GETALL_FAILURE) {
        return {
            ...state,
            error: action.error
        }
    }


    if (action.type == GET_USER_REQUEST) {
        return {
            ...state,
            loading: true
        }
    }

    if (action.type == GET_USER_SUCCESS) {

        return {
            ...state,
            item: action.item,
            loading: false
        }
    }

    if (action.type == GET_USER_FAILURE) {
        return {
            ...state,
            error: action.error,
            loading: false
        }
    }


    if (action.type == ADD_REQUEST) {
        return {
            ...state,
            loading: true
        }
    }

    if (action.type == ADD_SUCCESS) {
        return {
            ...state,
            //items: state.items.push(action.item),
            loading: false
        }
    }

    if (action.type == ADD_FAILURE) {
        return {
            ...state,
            error: action.error,
            loading: false
        }
    }

    if (action.type == DELETE_REQUEST) {
        return {
            ...state,
            loading: true
        }
    }

    if (action.type == DELETE_SUCCESS) {
        var newItems = state.items.filter(function (obj) {
            return obj.userId !== action.item.userId;
        });

        return {
            ...state,
            items: newItems,
            loading: false
        }
    }

    if (action.type == DELETE_FAILURE) {
        return {
            ...state,
            error: action.error,
            loading: false
        }
    }

    if (action.type == UPDATE_REQUEST) {
        return {
            ...state,
            loading: true,
        }
    }

    if (action.type == UPDATE_SUCCESS) {
        return {
            ...state,
            item: action.item,
            loading: false,
        }
    }

    if (action.type == UPDATE_FAILURE) {
        return {
            ...state,
            loading: false,
        }
    }

    return state;
};
