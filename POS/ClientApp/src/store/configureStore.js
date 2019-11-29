import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import * as Counter from './Counter';
import * as WeatherForecasts from './WeatherForecasts';
import * as Alert from './Alert';
import * as Authentication from './Authentication';
import * as User from './User';
import * as Inventory from './Inventory';
import * as Purchaser from './Purchaser';
import * as Status from './Status';
import * as Order from './Order';
import * as OrderItem from './OrderItem';
import * as systemParam from './SystemParam';

export default function configureStore(history, initialState) {
    const reducers = {
        counter: Counter.reducer,
        weatherForecasts: WeatherForecasts.reducer,
        alert: Alert.reducer,
        authentication: Authentication.reducer,
        user: User.reducer,
        inventory: Inventory.reducer,
        purchaser: Purchaser.reducer,
        status: Status.reducer,
        order: Order.reducer,
        orderItem: OrderItem.reducer,
        systemParam: systemParam.reducer,
    };

    const middleware = [
        thunk,
        routerMiddleware(history)
    ];

    // In development, use the browser's Redux dev tools extension if installed
    const enhancers = [];
    const isDevelopment = process.env.NODE_ENV === 'development';
    if (isDevelopment && typeof window !== 'undefined' && window.devToolsExtension) {
        enhancers.push(window.devToolsExtension());
    }

    const rootReducer = combineReducers({
        ...reducers,
        routing: routerReducer
    });

    return createStore(
        rootReducer,
        initialState,
        compose(applyMiddleware(...middleware), ...enhancers)
    );
}
