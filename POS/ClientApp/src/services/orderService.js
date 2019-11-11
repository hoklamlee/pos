//import config from 'config';
import { authHeader } from '../helpers/auth-header';
import config from 'react-global-configuration';

export const orderService = {
    addOrder,
    deleteOrder,
    updateOrder,
    getOrdersByCategory,
    getOrderById,
    getAllOrders,
    getAllUsers,
    getAllPurchasers
};



function addOrder(orderDate, remark, deliverById, deliverDate, PurchaserId,  createdBy_UserId) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({ orderDate, remark, deliverById, deliverDate, PurchaserId, createdBy_UserId })

    };

    var api = config.get('apiUrl');


    return fetch(`${api}/Orders`, requestOptions)
        .then(handleResponse)
        .then(item => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            //localStorage.setItem('user', JSON.stringify(user));

            return item;
        });
}

function deleteOrder(orderId) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader(),
        body: JSON.stringify({ })
    };

    var api = config.get('apiUrl');


    return fetch(`${api}/Orders/` + orderId, requestOptions)
        .then(handleResponse)
        .then(item => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            //localStorage.setItem('user', JSON.stringify(user));

            return item;
        });
}

function updateOrder(OrderId, name, location, phoneNo, contactPerson, modifiedBy_UserId ) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({ OrderId, name, location, phoneNo, contactPerson, modifiedBy_UserId })

    };

    var api = config.get('apiUrl');


    return fetch(`${api}/Orders/UpdateOrder` , requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            //localStorage.setItem('user', JSON.stringify(user));

            return user;
        });
}

function getOrdersByCategory(category) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    var api = config.get('apiUrl');

    return fetch(`${api}/orders/GetOrdersByCategory/` + category, requestOptions)
        .then(handleResponse)
        .then(data => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        //localStorage.setItem('user', JSON.stringify(user));

            return data;
    });
}

function getAllOrders() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    var api = config.get('apiUrl');

    return fetch(`${api}/orders`, requestOptions)
        .then(handleResponse)
        .then(data => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            //localStorage.setItem('user', JSON.stringify(user));

            return data;
        });
}

function getAllUsers() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    var api = config.get('apiUrl');

    return fetch(`${api}/users`, requestOptions)
        .then(handleResponse)
        .then(data => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            //localStorage.setItem('user', JSON.stringify(user));

            return data;
        });
}

function getAllPurchasers() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    var api = config.get('apiUrl');

    return fetch(`${api}/purchasers`, requestOptions)
        .then(handleResponse)
        .then(data => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            //localStorage.setItem('user', JSON.stringify(user));

            return data;
        });
}

function getOrderById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    var api = config.get('apiUrl');

    return fetch(`${api}/Orders/` + id, requestOptions)
        .then(handleResponse)
        .then(item => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            //localStorage.setItem('user', JSON.stringify(user));

            return item;
        });
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                //logout();
                //window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}