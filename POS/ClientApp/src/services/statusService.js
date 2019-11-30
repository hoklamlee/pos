//import config from 'config';
import { authHeader } from '../helpers/auth-header';
import config from 'react-global-configuration';

export const statusService = {
    addStatus,
    deleteStatus,
    updateStatus,
    getStatusByCategory,
    getStatusById,
    getAllStatus
};



function addStatus(category, code, description, sequence, createdBy_UserId) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({ category, code, description, sequence, createdBy_UserId })

    };

    var api = config.get('apiUrl');


    return fetch(`${api}/Statuses`, requestOptions)
        .then(handleResponse)
        .then(item => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            //localStorage.setItem('user', JSON.stringify(user));

            return item;
        });
}

function deleteStatus(statusId) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader(),
        body: JSON.stringify({ })
    };

    var api = config.get('apiUrl');


    return fetch(`${api}/Status/` + statusId, requestOptions)
        .then(handleResponse)
        .then(item => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            //localStorage.setItem('user', JSON.stringify(user));

            return item;
        });
}

function updateStatus(StatusId, category, code, description, sequence, modifiedBy_UserId ) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({ StatusId, category, code, description, sequence, modifiedBy_UserId })

    };

    var api = config.get('apiUrl');


    return fetch(`${api}/Status/UpdateStatus` , requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            //localStorage.setItem('user', JSON.stringify(user));

            return user;
        });
}

function getStatusByCategory(category) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    var api = config.get('apiUrl');

    return fetch(`${api}/status/GetStatusByCategory/` + category, requestOptions)
        .then(handleResponse)
        .then(data => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        //localStorage.setItem('user', JSON.stringify(user));

            return data;
    });
}

function getAllStatus() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    var api = config.get('apiUrl');

    return fetch(`${api}/status`, requestOptions)
        .then(handleResponse)
        .then(data => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            //localStorage.setItem('user', JSON.stringify(user));

            return data;
        });
}


function getStatusById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    var api = config.get('apiUrl');

    return fetch(`${api}/Status/` + id, requestOptions)
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