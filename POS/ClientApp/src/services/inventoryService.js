//import config from 'config';
import { authHeader } from '../helpers/auth-header';
import config from 'react-global-configuration';

export const inventoryService = {
    addInventory,
    deleteInventory,
    updateInventory,
    getInventoriesByCategory,
    getInventoryById
};



function addInventory( name, description, quatity, unit, price, category, createdBy_UserId) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({ name, description, quatity, unit, price, category, createdBy_UserId })

    };

    var api = config.get('apiUrl');


    return fetch(`${api}/Inventories`, requestOptions)
        .then(handleResponse)
        .then(item => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            //localStorage.setItem('user', JSON.stringify(user));

            return item;
        });
}

function deleteInventory(inventoryId) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader(),
        body: JSON.stringify({ })
    };

    var api = config.get('apiUrl');


    return fetch(`${api}/Inventories/` + inventoryId, requestOptions)
        .then(handleResponse)
        .then(item => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            //localStorage.setItem('user', JSON.stringify(user));

            return item;
        });
}

function updateInventory(InventoryId, name, description, quatity, unit, price, category, modifiedBy_UserId ) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({ InventoryId, name, description, quatity, unit, price, category, modifiedBy_UserId })

    };

    var api = config.get('apiUrl');


    return fetch(`${api}/Inventories/UpdateInventory` , requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            //localStorage.setItem('user', JSON.stringify(user));

            return user;
        });
}

function getInventoriesByCategory(category) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    var api = config.get('apiUrl');

    return fetch(`${api}/inventories/GetInventoriesByCategory/` + category, requestOptions)
        .then(handleResponse)
        .then(data => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        //localStorage.setItem('user', JSON.stringify(user));

            return data;
    });
}


function getInventoryById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    var api = config.get('apiUrl');

    return fetch(`${api}/Inventories/` + id, requestOptions)
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