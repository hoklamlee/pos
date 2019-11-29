//import config from 'config';
import { authHeader } from '../helpers/auth-header';
import config from 'react-global-configuration';

export const systemParamService = {
    addSystemParam,
    deleteSystemParam,
    updateSystemParam,
    getSystemParamById,
    getAllSystemParam
};



function addSystemParam(name, description, type, value, createdBy_UserId) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({ name, description, type, value, createdBy_UserId })

    };

    var api = config.get('apiUrl');


    return fetch(`${api}/SystemParams`, requestOptions)
        .then(handleResponse)
        .then(item => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            //localStorage.setItem('user', JSON.stringify(user));

            return item;
        });
}

function deleteSystemParam(systemParamId) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader(),
        body: JSON.stringify({ })
    };

    var api = config.get('apiUrl');


    return fetch(`${api}/SystemParams/` + systemParamId, requestOptions)
        .then(handleResponse)
        .then(item => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            //localStorage.setItem('user', JSON.stringify(user));

            return item;
        });
}

function updateSystemParam(SystemParamId, name, description, type, value, modifiedBy_UserId ) {
    const requestOptions = {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify({ SystemParamId, name, description, type, value, modifiedBy_UserId })

    };

    var api = config.get('apiUrl');


    return fetch(`${api}/SystemParams/UpdateSystemParam` , requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            //localStorage.setItem('user', JSON.stringify(user));

            return user;
        });
}

function getAllSystemParam() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    var api = config.get('apiUrl');

    return fetch(`${api}/systemParams`, requestOptions)
        .then(handleResponse)
        .then(data => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            //localStorage.setItem('user', JSON.stringify(user));

            return data;
        });
}


function getSystemParamById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    var api = config.get('apiUrl');

    return fetch(`${api}/SystemParams/` + id, requestOptions)
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
            if (response.systemParam === 401) {
                // auto logout if 401 response returned from api
                //logout();
                //window.location.reload(true);
            }

            const error = (data && data.message) || response.systemParamText;
            return Promise.reject(error);
        }

        return data;
    });
}