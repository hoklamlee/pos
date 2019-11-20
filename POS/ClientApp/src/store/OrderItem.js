import { orderItemService } from '../services/orderItemService';
import { inventoryService } from '../services/inventoryService';

import { history } from '../helpers/history';
import { actionCreators as alertAction } from './Alert';



const GETALL_REQUEST = 'ORDERITEM_GETALL_REQUEST';
const GETALL_SUCCESS = 'ORDERITEM_GETALL_SUCCESS';
const GETALL_FAILURE = 'ORDERITEM_GETALL_FAILURE';


const ORDERITEM_GETALL_INVENTORY_REQUEST = 'ORDERITEM_GETALL_INVENTORY_REQUEST';
const ORDERITEM_GETALL_INVENTORY_SUCCESS = 'ORDERITEM_GETALL_INVENTORY_SUCCESS';
const ORDERITEM_GETALL_INVENTORY_FAILURE = 'ORDERITEM_GETALL_INVENTORY_FAILURE';

const GET_REQUEST = 'ORDERITEM_GET_REQUEST';
const GET_SUCCESS = 'ORDERITEM_GET_SUCCESS';
const GET_FAILURE = 'ORDERITEM_GET_FAILURE';

const ADD_REQUEST = 'ORDERITEM_ADD_REQUEST';
const ADD_SUCCESS = 'ORDERITEM_ADD_SUCCESS';
const ADD_FAILURE = 'ORDERITEM_ADD_FAILURE';

const DELETE_REQUEST = 'ORDERITEM_DELETE_REQUEST';
const DELETE_SUCCESS = 'ORDERITEM_DELETE_SUCCESS';
const DELETE_FAILURE = 'ORDERITEM_DELETE_FAILURE';

const UPDATE_REQUEST = 'ORDERITEM_UPDATE_REQUEST';
const UPDATE_SUCCESS = 'ORDERITEM_UPDATE_SUCCESS';
const UPDATE_FAILURE = 'ORDERITEM_UPDATE_FAILURE';

const initialState = { createSuccess: false, loading: false, error: '', items: [] ,item:null,users: [], purchasers:[], inventories:[], totalPrice: 0};

export const actionCreators = {
    addOrderItem: ( orderId, inventoryId, quatity, remark, userId) => async (dispatch, getState) => {
        dispatch({ type: ADD_REQUEST });

        return new Promise((resolve, reject) => {
            orderItemService.addOrderItem( orderId, inventoryId, quatity, remark, userId)
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
    updateOrderItem: (orderItemId, inventoryId, quatity, remark, modifiedBy_UserId) => async (dispatch, getState) => {
        dispatch({ type: UPDATE_REQUEST });

        return new Promise((resolve, reject) => {
            orderItemService.updateOrderItem(Number(orderItemId), Number(inventoryId), Number(quatity), remark, Number(modifiedBy_UserId))
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
    deleteOrderItem: (orderItemId) => async (dispatch, getState) => {
        dispatch({ type: DELETE_REQUEST });

        orderItemService.deleteOrderItem(orderItemId)
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
    getOrderItemsByCategory: (category) => async (dispatch, getState) => {
        dispatch({ type: GETALL_REQUEST });

        orderItemService.getOrderItemsByCategory(category)
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
    getOrderItemById: (id) => async (dispatch, getState) => {
        dispatch({ type: GET_REQUEST });

        orderItemService.getOrderItemById(id)
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
    GetOrderItemsByOrderId: (id) => async (dispatch, getState) => {
        dispatch({ type: GETALL_REQUEST });

        orderItemService.GetOrderItemsByOrderId(id)
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
    getInventoriesByCategory: (category) => async (dispatch, getState) => {
        dispatch({ type: ORDERITEM_GETALL_INVENTORY_REQUEST });

        inventoryService.getInventoriesByCategory(category)
            .then(
                items => {
                    dispatch({ type: ORDERITEM_GETALL_INVENTORY_SUCCESS, items });
                },
                error => {
                    dispatch({ type: ORDERITEM_GETALL_INVENTORY_FAILURE, error });
                    dispatch(alertAction.error(error));
                }
            );
    },
};

export const reducer = (state, action) => {
    state = state || initialState;

    if (action.type == GETALL_REQUEST) {
        return {
            ...state,
            totalPrice: 0,
            loading: true
        }
    }

    if (action.type == GETALL_SUCCESS) {
        //console.log(action.items)
        var totalPrice = 0;

        action.items.map(i => {
            i.key = i.orderItemId;
            totalPrice += i.price * i.quatity;
        })
        return {
            ...state,
            items: action.items,
            totalPrice: totalPrice,
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






    if (action.type == ORDERITEM_GETALL_INVENTORY_REQUEST) {
        return {
            ...state,
            loading: true
        }
    }

    if (action.type == ORDERITEM_GETALL_INVENTORY_SUCCESS) {
        action.items.map(i => {
            i.key = i.inventoryId;
            i.value = i.inventoryId;
        })
        return {
            ...state,
            inventories: action.items,
            loading: false
        }
    }

    if (action.type == ORDERITEM_GETALL_INVENTORY_FAILURE) {
        return {
            ...state,
            error: action.error,
            loading: false
        }
    }


    if (action.type == GET_REQUEST) {
        return {
            ...state,
            item: null,
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
        var totalPrice = state.totalPrice - (action.item.price * action.item.quatity);

        var newItems = state.items.filter(function (obj) {
            return obj.orderItemId !== action.item.orderItemId;
        });

        return {
            ...state,
            items: newItems,
            totalPrice: totalPrice,
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
