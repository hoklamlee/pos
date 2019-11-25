import { orderService } from '../services/orderService';
import { inventoryService } from '../services/inventoryService';

import { history } from '../helpers/history';
import { actionCreators as alertAction } from './Alert';



const GETALL_REQUEST = 'ORDER_GETALL_REQUEST';
const GETALL_SUCCESS = 'ORDER_GETALL_SUCCESS';
const GETALL_FAILURE = 'ORDER_GETALL_FAILURE';

const ORDER_GETALL_USER_REQUEST = 'ORDER_GETALL_USER_REQUEST';
const ORDER_GETALL_USER_SUCCESS = 'ORDER_GETALL_USER_SUCCESS';
const ORDER_GETALL_USER_FAILURE = 'ORDER_GETALL_USER_FAILURE';


const ORDER_GETALL_PURCHASER_REQUEST = 'ORDER_GETALL_PURCHASER_REQUEST';
const ORDER_GETALL_PURCHASER_SUCCESS = 'ORDER_GETALL_PURCHASER_SUCCESS';
const ORDER_GETALL_PURCHASER_FAILURE = 'ORDER_GETALL_PURCHASER_FAILURE';

const ORDER_GETALL_INVENTORY_REQUEST = 'ORDER_GETALL_INVENTORY_REQUEST';
const ORDER_GETALL_INVENTORY_SUCCESS = 'ORDER_GETALL_INVENTORY_SUCCESS';
const ORDER_GETALL_INVENTORY_FAILURE = 'ORDER_GETALL_INVENTORY_FAILURE';

const GET_REQUEST = 'ORDER_GET_REQUEST';
const GET_SUCCESS = 'ORDER_GET_SUCCESS';
const GET_FAILURE = 'ORDER_GET_FAILURE';

const ADD_REQUEST = 'ORDER_ADD_REQUEST';
const ADD_SUCCESS = 'ORDER_ADD_SUCCESS';
const ADD_FAILURE = 'ORDER_ADD_FAILURE';

const DELETE_REQUEST = 'ORDER_DELETE_REQUEST';
const DELETE_SUCCESS = 'ORDER_DELETE_SUCCESS';
const DELETE_FAILURE = 'ORDER_DELETE_FAILURE';

const UPDATE_REQUEST = 'ORDER_UPDATE_REQUEST';
const UPDATE_SUCCESS = 'ORDER_UPDATE_SUCCESS';
const UPDATE_FAILURE = 'ORDER_UPDATE_FAILURE';

const GET_FAVOURITE_ORDERS_REQUEST = 'ORDER_GET_FAVOURITE_ORDERS_REQUEST';
const GET_FAVOURITE_ORDERS_SUCCESS = 'ORDER_GET_FAVOURITE_ORDERS_SUCCESS';
const GET_FAVOURITE_ORDERS_FAILURE = 'ORDER_GET_FAVOURITE_ORDERS_FAILURE';

const GET_FAVOURITE_ORDER_REQUEST = 'ORDER_GET_FAVOURITE_ORDER_REQUEST';
const GET_FAVOURITE_ORDER_SUCCESS = 'ORDER_GET_FAVOURITE_ORDER_SUCCESS';
const GET_FAVOURITE_ORDER_FAILURE = 'ORDER_GET_FAVOURITE_ORDER_FAILURE';

const ADD_FAVOURITE_ORDER_REQUEST = 'ORDER_ADD_FAVOURITE_ORDER_REQUEST';
const ADD_FAVOURITE_ORDER_SUCCESS = 'ORDER_ADD_FAVOURITE_ORDER_SUCCESS';
const ADD_FAVOURITE_ORDER_FAILURE = 'ORDER_ADD_FAVOURITE_ORDER_FAILURE';

const DELETE_FAVOURITE_ORDER_REQUEST = 'ORDER_DELETE_FAVOURITE_ORDER_REQUEST';
const DELETE_FAVOURITE_ORDER_SUCCESS = 'ORDER_DELETE_FAVOURITE_ORDER_SUCCESS';
const DELETE_FAVOURITE_ORDER_FAILURE = 'ORDER_DELETE_FAVOURITE_ORDER_FAILURE';

const initialState = { createSuccess: false, loading: false, error: '', items: [], item: null, users: [], purchasers: [], inventories: [], favouriteOrders: [], favouriteOrder: null };

export const actionCreators = {
    duplicate: (orderId, orderDate, deliverDate, createdBy_UserId) => async (dispatch, getState) => {
        dispatch({ type: ADD_REQUEST });

        return new Promise((resolve, reject) => {
            orderService.duplicate(orderId, orderDate, deliverDate, createdBy_UserId)
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
    getFavouriteOrders: (userId) => async (dispatch, getState) => {
        dispatch({ type: GET_FAVOURITE_ORDERS_REQUEST });

        return new Promise((resolve, reject) => {
            orderService.getFavouriteOrders(userId)
                .then(
                    items => {
                        dispatch({ type: GET_FAVOURITE_ORDERS_SUCCESS, items });
                        resolve(true);
                    },
                    error => {
                        dispatch({ type: GET_FAVOURITE_ORDERS_FAILURE, error });
                        dispatch(alertAction.error(error));
                        resolve(false);

                    }
                );

        });
    },
    getFavouriteOrderByOrderIdAndUserId: (orderId, userId) => async (dispatch, getState) => {
        dispatch({ type: GET_FAVOURITE_ORDER_REQUEST });

        return new Promise((resolve, reject) => {
            orderService.getFavouriteOrderByOrderIdAndUserId(orderId, userId)
                .then(
                    item => {
                        dispatch({ type: GET_FAVOURITE_ORDER_SUCCESS, item });
                        resolve(true);
                    },
                    error => {
                        dispatch({ type: GET_FAVOURITE_ORDER_FAILURE, error });
                        dispatch(alertAction.error(error));
                        resolve(false);

                    }
                );

        });
    },
    addFavouriteOrder: (name, orderId, userId) => async (dispatch, getState) => {
        dispatch({ type: ADD_FAVOURITE_ORDER_REQUEST });

        return new Promise((resolve, reject) => {
            orderService.addFavouriteOrder(name, orderId, userId)
                .then(
                    item => {
                        dispatch({ type: ADD_FAVOURITE_ORDER_SUCCESS, item });
                        resolve(true);
                    },
                    error => {
                        dispatch({ type: ADD_FAVOURITE_ORDER_FAILURE, error });
                        dispatch(alertAction.error(error));
                        resolve(false);
                    }
                );

        });
    },
    deleteFavouriteOrder: (favouriteOrderId) => async (dispatch, getState) => {
        dispatch({ type: DELETE_FAVOURITE_ORDER_REQUEST });

        return new Promise((resolve, reject) => {
            orderService.deleteFavouriteOrder(favouriteOrderId)
                .then(
                    item => {
                        dispatch({ type: DELETE_FAVOURITE_ORDER_SUCCESS, item });
                        resolve(true);
                    },
                    error => {
                        dispatch({ type: DELETE_FAVOURITE_ORDER_FAILURE, error });
                        dispatch(alertAction.error(error));
                        resolve(false);

                    }
                );

        });
    },
    addOrder: (orderDate, remark, deliverBy, deliverDate, shop, userId) => async (dispatch, getState) => {
        dispatch({ type: ADD_REQUEST });

        return new Promise((resolve, reject) => {
            orderService.addOrder(orderDate, remark, deliverBy, deliverDate, shop, userId)
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
    updateOrder: (OrderId, orderDate, remark, deliverBy, deliverDate, shop, userId) => async (dispatch, getState) => {
        dispatch({ type: UPDATE_REQUEST });

        return new Promise((resolve, reject) => {
            orderService.updateOrder(OrderId, orderDate, remark, deliverBy, deliverDate, shop, userId)
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
    deleteOrder: (orderId) => async (dispatch, getState) => {
        dispatch({ type: DELETE_REQUEST });

        orderService.deleteOrder(orderId)
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
    getOrdersByCategory: (category) => async (dispatch, getState) => {
        dispatch({ type: GETALL_REQUEST });

        orderService.getOrdersByCategory(category)
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
    getOrderById: (id) => async (dispatch, getState) => {
        dispatch({ type: GET_REQUEST });

        orderService.getOrderById(id)
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
    getAllOrders: () => async (dispatch, getState) => {
        dispatch({ type: GETALL_REQUEST });

        orderService.getAllOrders()
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
    getAllUsers: () => async (dispatch, getState) => {
        dispatch({ type: ORDER_GETALL_USER_REQUEST });

        orderService.getAllUsers()
            .then(
                items => {
                    dispatch({ type: ORDER_GETALL_USER_SUCCESS, items });
                },
                error => {
                    dispatch({ type: ORDER_GETALL_USER_FAILURE, error });
                    dispatch(alertAction.error(error));
                }
            );
    },
    getAllPurchasers: () => async (dispatch, getState) => {
        dispatch({ type: ORDER_GETALL_PURCHASER_REQUEST });

        orderService.getAllPurchasers()
            .then(
                items => {
                    dispatch({ type: ORDER_GETALL_PURCHASER_SUCCESS, items });
                },
                error => {
                    dispatch({ type: ORDER_GETALL_PURCHASER_FAILURE, error });
                    dispatch(alertAction.error(error));
                }
            );
    },
    getInventoriesByCategory: (category) => async (dispatch, getState) => {
        dispatch({ type: ORDER_GETALL_INVENTORY_REQUEST });

        inventoryService.getInventoriesByCategory(category)
            .then(
                items => {
                    dispatch({ type: ORDER_GETALL_INVENTORY_SUCCESS, items });
                },
                error => {
                    dispatch({ type: ORDER_GETALL_INVENTORY_FAILURE, error });
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
            loading: true
        }
    }

    if (action.type == GETALL_SUCCESS) {
        //console.log(action.items)
        action.items.map(i => {
            i.key = i.orderId;


            i.totalPrice = i.orderItems && i.orderItems.length > 0 ? i.orderItems.map(item => (item.price ? item.price : 0) * (item.quatity ? item.quatity : 0)).reduce((prev, next) => prev + next) : 0;
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





    if (action.type == ORDER_GETALL_USER_REQUEST) {
        return {
            ...state,
            loading: true
        }
    }

    if (action.type == ORDER_GETALL_USER_SUCCESS) {
        action.items.map(i => {
            i.key = i.userId;
            i.value = i.userId;
            i.name = i.displayName;

        })
        return {
            ...state,
            users: action.items,
            loading: false
        }
    }

    if (action.type == ORDER_GETALL_USER_FAILURE) {
        return {
            ...state,
            error: action.error,
            loading: false
        }
    }


    if (action.type == ORDER_GETALL_PURCHASER_REQUEST) {
        return {
            ...state,
            loading: true
        }
    }

    if (action.type == ORDER_GETALL_PURCHASER_SUCCESS) {
        action.items.map(i => {
            i.key = i.purchaserId;
            i.value = i.purchaserId;
        })
        return {
            ...state,
            purchasers: action.items,
            loading: false
        }
    }

    if (action.type == ORDER_GETALL_PURCHASER_FAILURE) {
        return {
            ...state,
            error: action.error,
            loading: false
        }
    }



    if (action.type == ORDER_GETALL_INVENTORY_REQUEST) {
        return {
            ...state,
            loading: true
        }
    }

    if (action.type == ORDER_GETALL_INVENTORY_SUCCESS) {
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

    if (action.type == ORDER_GETALL_INVENTORY_FAILURE) {
        return {
            ...state,
            error: action.error,
            loading: false
        }
    }


    if (action.type == GET_REQUEST) {
        return {
            ...state,
            totalPrice:0,
            item: null,
            loading: true
        }
    }

    if (action.type == GET_SUCCESS) {
        var totalPrice = 0;

        action.item.orderItems.map(o => {
            totalPrice += o.price * o.quatity;
        })

        return {
            ...state,
            totalPrice: totalPrice,
            item: action.item,
            loading: false,
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
            return obj.orderId !== action.item.orderId;
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
            item: null,
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

    if (action.type == GET_FAVOURITE_ORDERS_REQUEST) {
        return {
            ...state,
            favouriteOrders: [],
        }
    }

    if (action.type == GET_FAVOURITE_ORDERS_SUCCESS) {
        action.items.map(i => {
            i.key = i.orderId;


            i.totalPrice = i.orderItems && i.orderItems.length > 0 ? i.orderItems.map(item => (item.price ? item.price : 0) * (item.quatity ? item.quatity : 0)).reduce((prev, next) => prev + next) : 0;
        })

        return {
            ...state,
            favouriteOrders: action.items
        }
    }

    if (action.type == GET_FAVOURITE_ORDERS_FAILURE) {
        return {
            ...state,
        }
    }

    if (action.type == GET_FAVOURITE_ORDER_REQUEST) {
        return {
            ...state,
            favouriteOrder: null
        }
    }

    if (action.type == GET_FAVOURITE_ORDER_SUCCESS) {
        return {
            ...state,
            favouriteOrder: action.item
        }
    }

    if (action.type == GET_FAVOURITE_ORDER_FAILURE) {
        return {
            ...state,
        }
    }


    if (action.type == ADD_FAVOURITE_ORDER_REQUEST) {
        return {
            ...state
        }
    }

    if (action.type == ADD_FAVOURITE_ORDER_SUCCESS) {
        var items = state.favouriteOrders;
        items.push(action.item);

        return {
            ...state,
            favouriteOrders: items,
            favouriteOrder: action.item
        }
    }

    if (action.type == ADD_FAVOURITE_ORDER_FAILURE) {
        return {
            ...state,
        }
    }

    if (action.type == DELETE_FAVOURITE_ORDER_REQUEST) {
        return {
            ...state,
        }
    }

    if (action.type == DELETE_FAVOURITE_ORDER_SUCCESS) {
        var newItems = state.favouriteOrders.filter(function (obj) {
            return obj.favouriteOrderId !== action.item.favouriteOrderId;
        });

        return {
            ...state,
            favouriteOrders: newItems,
            favouriteOrder: null
        }
    }

    if (action.type == DELETE_FAVOURITE_ORDER_FAILURE) {
        return {
            ...state,
        }
    }

    return state;
};
