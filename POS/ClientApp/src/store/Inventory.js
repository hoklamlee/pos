import { inventoryService } from '../services/inventoryService';
import { history } from '../helpers/history';
import { actionCreators as alertAction } from './Alert';



const GETALL_REQUEST = 'INVENTORY_GETALL_REQUEST';
const GETALL_SUCCESS = 'INVENTORY_GETALL_SUCCESS';
const GETALL_FAILURE = 'INVENTORY_GETALL_FAILURE';

const UPDATE_REQUEST = 'INVENTORY_UPDATE_REQUEST';
const UPDATE_SUCCESS = 'INVENTORY_UPDATE_SUCCESS';
const UPDATE_FAILURE = 'INVENTORY_UPDATE_FAILURE';

const initialState = { loading: false, error: '', items: [] };

export const actionCreators = {
    updatePassword: (userId,password,passwordConfirm) => async (dispatch, getState) => {
        dispatch({ type: GETALL_REQUEST });

        inventoryService.getInventoriesByCategory(getInventoriesByCategory)
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
            items: action.items
        }
    }

    if (action.type == GETALL_FAILURE) {
        return {
            ...state,
            error: action.error
        }
    }


    if (action.type == UPDATE_REQUEST) {
        return {
            ...state,
            loading: true,
        }
    }

    if (action.type == UPDATE_SUCCESS) {
        console.log(action.user);
        return {
            ...state,
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
