//import config from 'config';
import { authHeader } from '../helpers/auth-header';
import config from 'react-global-configuration';

export const userService = {
    login,
    logout,
    getAll,
    getUserById,
    addUser,
    deleteUser,
    updateUser,
    updateUserInfo,
    updatePassword
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    var api = config.get('apiUrl');


    return fetch(`${api}/users/authenticate`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        });
}

function updateUserInfo(userId, firstName, lastName, email, username) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({ userId,  firstName,lastName,  email,username})
    };

    var api = config.get('apiUrl');


    return fetch(`${api}/users/updateuserinfo`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        });
}

function updatePassword(userId, password, passwordConfirm) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({ userId, password, passwordConfirm })
    };

    var api = config.get('apiUrl');


    return fetch(`${api}/users/updateuserpassword`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    var api = config.get('apiUrl');

    return fetch(`${api}/users/GetAll`, requestOptions)
        .then(handleResponse)
        .then(data => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            //localStorage.setItem('user', JSON.stringify(user));

            return data;
        });
}

function getUserById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    var api = config.get('apiUrl');

    return fetch(`${api}/users/` + id, requestOptions)
        .then(handleResponse)
        .then(item => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            //localStorage.setItem('user', JSON.stringify(user));

            return item;
        });
}

function addUser(firstName,lastName,username, email, password, displayname) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({ firstName, lastName, username, email, password, displayname })

    };

    var api = config.get('apiUrl');


    return fetch(`${api}/User`, requestOptions)
        .then(handleResponse)
        .then(item => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            //localStorage.setItem('user', JSON.stringify(user));

            return item;
        });
}

function deleteUser(userId) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader(),
        body: JSON.stringify({})
    };

    var api = config.get('apiUrl');


    return fetch(`${api}/User/` + userId, requestOptions)
        .then(handleResponse)
        .then(item => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            //localStorage.setItem('user', JSON.stringify(user));

            return item;
        });
}

function updateUser(userId, firstName, lastName, username, email, password, displayname) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({ userId, firstName, lastName, username, email, password, displayname })

    };

    var api = config.get('apiUrl');


    return fetch(`${api}/User/UpdateUser`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            //localStorage.setItem('user', JSON.stringify(user));

            return user;
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