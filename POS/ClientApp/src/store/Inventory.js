import { inventoryService } from '../services/inventoryService';
import { history } from '../helpers/history';
import { actionCreators as alertAction } from './Alert';



const GETALL_REQUEST = 'INVENTORY_GETALL_REQUEST';
const GETALL_SUCCESS = 'INVENTORY_GETALL_SUCCESS';
const GETALL_FAILURE = 'INVENTORY_GETALL_FAILURE';

const ADD_REQUEST = 'INVENTORY_ADD_REQUEST';
const ADD_SUCCESS = 'INVENTORY_ADD_SUCCESS';
const ADD_FAILURE = 'INVENTORY_ADD_FAILURE';

const DELETE_REQUEST = 'INVENTORY_DELETE_REQUEST';
const DELETE_SUCCESS = 'INVENTORY_DELETE_SUCCESS';
const DELETE_FAILURE = 'INVENTORY_DELETE_FAILURE';

const UPDATE_REQUEST = 'INVENTORY_UPDATE_REQUEST';
const UPDATE_SUCCESS = 'INVENTORY_UPDATE_SUCCESS';
const UPDATE_FAILURE = 'INVENTORY_UPDATE_FAILURE';

const initialState = { loading: false, error: '', items: [] };

export const actionCreators = {
    addInventory: (name, description, quatity, unit, price, category, createdBy_UserId) => async (dispatch, getState) => {
        dispatch({ type: ADD_REQUEST });

        inventoryService.addInventory(name, description, quatity, unit, price, category, createdBy_UserId)
            .then(
                item => {
                    dispatch({ type: ADD_SUCCESS, item });
                    history.push("/inventory");
                },
                error => {
                    dispatch({ type: ADD_FAILURE, error });
                    dispatch(alertAction.error(error));
                }
            );
    },
    deleteInventory: (inventoryId) => async (dispatch, getState) => {
        dispatch({ type: DELETE_REQUEST });

        inventoryService.deleteInventory(inventoryId)
            .then(
                item => {
                    dispatch({ type: DELETE_SUCCESS, item });
                },
                error => {
                    dispatch({ type: DELETE_FAILURE, error });
                    dispatch(alertAction.error(error));
                }
            );
    },
    getInventoriesByCategory: (category) => async (dispatch, getState) => {
        dispatch({ type: GETALL_REQUEST });

        inventoryService.getInventoriesByCategory(category)
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
        //return dispatch => {
        //    dispatch(request());

        //    userService.getAll()
        //        .then(
        //            users => dispatch(success(users)),
        //            error => dispatch(failure(error))
        //        );
        //};

        //function request() { return { type: GETALL_REQUEST } }
        //function success(users) { return { type: GETALL_SUCCESS, users } }
        //function failure(error) { return { type: GETALL_FAILURE, error } }
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
        //console.log(action.items)
        action.items.map(i => {
            i.key = i.inventoryId;
        })
        return {
            ...state,
            items: action.items,
            loading: false
        }
    }

    if (action.type == GETALL_FAILURE) {
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
            return obj.inventoryId !== action.item.inventoryId;
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
