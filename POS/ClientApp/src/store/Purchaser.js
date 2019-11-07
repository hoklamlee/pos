import { purchaserService } from '../services/purchaserService';
import { history } from '../helpers/history';
import { actionCreators as alertAction } from './Alert';



const GETALL_REQUEST = 'PURCHASER_GETALL_REQUEST';
const GETALL_SUCCESS = 'PURCHASER_GETALL_SUCCESS';
const GETALL_FAILURE = 'PURCHASER_GETALL_FAILURE';

const GET_REQUEST = 'PURCHASER_GET_REQUEST';
const GET_SUCCESS = 'PURCHASER_GET_SUCCESS';
const GET_FAILURE = 'PURCHASER_GET_FAILURE';

const ADD_REQUEST = 'PURCHASER_ADD_REQUEST';
const ADD_SUCCESS = 'PURCHASER_ADD_SUCCESS';
const ADD_FAILURE = 'PURCHASER_ADD_FAILURE';

const DELETE_REQUEST = 'PURCHASER_DELETE_REQUEST';
const DELETE_SUCCESS = 'PURCHASER_DELETE_SUCCESS';
const DELETE_FAILURE = 'PURCHASER_DELETE_FAILURE';

const UPDATE_REQUEST = 'PURCHASER_UPDATE_REQUEST';
const UPDATE_SUCCESS = 'PURCHASER_UPDATE_SUCCESS';
const UPDATE_FAILURE = 'PURCHASER_UPDATE_FAILURE';

const initialState = { createSuccess: false, loading: false, error: '', items: [] ,item:null};

export const actionCreators = {
    addPurchaser: (name, location, phoneNo, contactPerson, userId) => async (dispatch, getState) => {
        dispatch({ type: ADD_REQUEST });

        return new Promise((resolve, reject) => {
            purchaserService.addPurchaser(name, location, phoneNo, contactPerson, userId)
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
    updatePurchaser: (PurchaserId,name, location, phoneNo, contactPerson, userId) => async (dispatch, getState) => {
        dispatch({ type: UPDATE_REQUEST });

        return new Promise((resolve, reject) => {
            purchaserService.updatePurchaser(PurchaserId,name, location, phoneNo, contactPerson, userId)
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
    deletePurchaser: (purchaserId) => async (dispatch, getState) => {
        dispatch({ type: DELETE_REQUEST });

        purchaserService.deletePurchaser(purchaserId)
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
    getPurchasersByCategory: (category) => async (dispatch, getState) => {
        dispatch({ type: GETALL_REQUEST });

        purchaserService.getPurchasersByCategory(category)
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
    getPurchaserById: (id) => async (dispatch, getState) => {
        dispatch({ type: GET_REQUEST });

        purchaserService.getPurchaserById(id)
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
    getAllPurchasers: () => async (dispatch, getState) => {
        dispatch({ type: GETALL_REQUEST });

        purchaserService.getAllPurchasers()
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
            i.key = i.purchaserId;
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
            return obj.purchaserId !== action.item.purchaserId;
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
            //item: action.item,
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
