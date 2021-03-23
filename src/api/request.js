import {baseUrl} from '../services/baseUrl/baseUrl'

const userData = JSON.parse(localStorage.getItem('userData'))
export const token = userData && userData.token

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
}
