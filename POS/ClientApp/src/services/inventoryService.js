//import config from 'config';
import { authHeader } from '../helpers/auth-header';
import config from 'react-global-configuration';

export const inventoryService = {
    addInventory,
    updateInventory,
    getInventoriesByCategory
};



function addInventory(inventoryId, name, description, quatity, unit, price, category, createdBy_UserId) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: {
            "InventoryId": inventoryId,
            "name": name,
            "description": description,
            "quatity": quatity,
            "unit": unit,
            "price": price,
            "category": category,
            "createdBy_UserId": createdBy_UserId
        }
    };

    var api = config.get('apiUrl');


    return fetch(`${api}/Inventories`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            //localStorage.setItem('user', JSON.stringify(user));

            return user;
        });
}

function updateInventory(InventoryId, name, description, quatity, unit, price, category, modifiedBy_UserId ) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: {
            "InventoryId": InventoryId,
            "name": name,
            "description": description,
            "quatity": quatity,
            "unit": unit,
            "price": price,
            "category": category,
            "modifiedBy_UserId": modifiedBy_UserId
        }
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

    return fetch(`${api}/inventories/GetInventoriesByCategory/` + category, requestOptions)
        .then(handleResponse)
        .then(data => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        //localStorage.setItem('user', JSON.stringify(user));

            return data;
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