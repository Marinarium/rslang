import {baseUrl} from '../services/baseUrl/baseUrl';

export const request = (endpoint, method, withCredentials, headers, body = null) => {
    return fetch(baseUrl + endpoint, {
        method,
        withCredentials,
        headers,
        body
    }).then(function (response) {
        return response
    }).catch(function (error) {
        console.log(error)
    })
};
