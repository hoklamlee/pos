import { systemParamService } from '../services/systemParamService';
import { history } from '../helpers/history';
import { actionCreators as alertAction } from './Alert';



const GETALL_REQUEST = 'SYSTEMPARAM_GETALL_REQUEST';
const GETALL_SUCCESS = 'SYSTEMPARAM_GETALL_SUCCESS';
const GETALL_FAILURE = 'SYSTEMPARAM_GETALL_FAILURE';

const GET_REQUEST = 'SYSTEMPARAM_GET_REQUEST';
const GET_SUCCESS = 'SYSTEMPARAM_GET_SUCCESS';
const GET_FAILURE = 'SYSTEMPARAM_GET_FAILURE';

const ADD_REQUEST = 'SYSTEMPARAM_ADD_REQUEST';
const ADD_SUCCESS = 'SYSTEMPARAM_ADD_SUCCESS';
const ADD_FAILURE = 'SYSTEMPARAM_ADD_FAILURE';

const DELETE_REQUEST = 'SYSTEMPARAM_DELETE_REQUEST';
const DELETE_SUCCESS = 'SYSTEMPARAM_DELETE_SUCCESS';
const DELETE_FAILURE = 'SYSTEMPARAM_DELETE_FAILURE';

const UPDATE_REQUEST = 'SYSTEMPARAM_UPDATE_REQUEST';
const UPDATE_SUCCESS = 'SYSTEMPARAM_UPDATE_SUCCESS';
const UPDATE_FAILURE = 'SYSTEMPARAM_UPDATE_FAILURE';

const initialState = { createSuccess: false, loading: false, error: '', items: [] ,item:null};

export const actionCreators = {
    addSystemParam: (name, description, type, value, createdBy_UserId) => async (dispatch, getState) => {
        dispatch({ type: ADD_REQUEST });

        return new Promise((resolve, reject) => {
            systemParamService.addSystemParam(name, description, type, value, createdBy_UserId)
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
    updateSystemParam: (SystemParamId, name, description, type, value,modifiedBy_UserId) => async (dispatch, getState) => {
        dispatch({ type: UPDATE_REQUEST });

        return new Promise((resolve, reject) => {
            systemParamService.updateSystemParam(SystemParamId, name, description, type, value, modifiedBy_UserId)
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
    deleteSystemParam: (systemparamId) => async (dispatch, getState) => {
        dispatch({ type: DELETE_REQUEST });

        systemParamService.deleteSystemParam(systemparamId)
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
    getSystemParamById: (id) => async (dispatch, getState) => {
        dispatch({ type: GET_REQUEST });

        systemParamService.getSystemParamById(id)
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
    getAllSystemParam: () => async (dispatch, getState) => {
        dispatch({ type: GETALL_REQUEST });

        systemParamService.getAllSystemParam()
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
            i.key = i.systemParamId;
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
            return obj.systemparamId !== action.item.systemparamId;
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
