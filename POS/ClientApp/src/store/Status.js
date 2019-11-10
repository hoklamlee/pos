import { statusService } from '../services/statusService';
import { history } from '../helpers/history';
import { actionCreators as alertAction } from './Alert';



const GETALL_REQUEST = 'STATUS_GETALL_REQUEST';
const GETALL_SUCCESS = 'STATUS_GETALL_SUCCESS';
const GETALL_FAILURE = 'STATUS_GETALL_FAILURE';

const GET_REQUEST = 'STATUS_GET_REQUEST';
const GET_SUCCESS = 'STATUS_GET_SUCCESS';
const GET_FAILURE = 'STATUS_GET_FAILURE';

const ADD_REQUEST = 'STATUS_ADD_REQUEST';
const ADD_SUCCESS = 'STATUS_ADD_SUCCESS';
const ADD_FAILURE = 'STATUS_ADD_FAILURE';

const DELETE_REQUEST = 'STATUS_DELETE_REQUEST';
const DELETE_SUCCESS = 'STATUS_DELETE_SUCCESS';
const DELETE_FAILURE = 'STATUS_DELETE_FAILURE';

const UPDATE_REQUEST = 'STATUS_UPDATE_REQUEST';
const UPDATE_SUCCESS = 'STATUS_UPDATE_SUCCESS';
const UPDATE_FAILURE = 'STATUS_UPDATE_FAILURE';

const initialState = { createSuccess: false, loading: false, error: '', items: [] ,item:null};

export const actionCreators = {
    addStatus: (category, code, description, createdBy_UserId) => async (dispatch, getState) => {
        dispatch({ type: ADD_REQUEST });

        return new Promise((resolve, reject) => {
            statusService.addStatus(category, code, description, createdBy_UserId)
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
    updateStatus: (StatusId, category, code, description, modifiedBy_UserId) => async (dispatch, getState) => {
        dispatch({ type: UPDATE_REQUEST });

        return new Promise((resolve, reject) => {
            statusService.updateStatus(StatusId, category, code, description, modifiedBy_UserId)
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
    deleteStatus: (statusId) => async (dispatch, getState) => {
        dispatch({ type: DELETE_REQUEST });

        statusService.deleteStatus(statusId)
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

        statusService.getInventoriesByCategory(category)
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
    getStatusById: (id) => async (dispatch, getState) => {
        dispatch({ type: GET_REQUEST });

        statusService.getStatusById(id)
            .then(
                item => {
                    dispatch({ type: GET_SUCCESS, item });
                },
                error => {
                    dispatch({ type: GET_FAILURE, error });
                    dispatch(alertAction.error(error));
                }
            );
    },
    getAllStatus: () => async (dispatch, getState) => {
        dispatch({ type: GETALL_REQUEST });

        statusService.getAllStatus()
            .then(
                items => {
                    dispatch({ type: GETALL_SUCCESS, items });
                },
                error => {
                    dispatch({ type: GETALL_FAILURE, error });
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
        //console.log(action.items)
        action.items.map(i => {
            i.key = i.statusId;
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


    if (action.type == GET_REQUEST) {
        return {
            ...state,
            loading: true
        }
    }

    if (action.type == GET_SUCCESS) {

        return {
            ...state,
            item: action.item,
            loading: false
        }
    }

    if (action.type == GET_FAILURE) {
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
            return obj.statusId !== action.item.statusId;
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
