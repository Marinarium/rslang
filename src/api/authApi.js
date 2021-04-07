import {request, token} from './request'


export const authApi = {

    getUser(id) {
        console.log('token', token)
        return request(
            `users/${id}`,
            'GET',
            true,
            {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        )
    },

    login(loginForm) {
        return request(
            `signin`,
            'POST',
            true,
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            JSON.stringify({...loginForm})
        )

    },
    register(formData) {
        return request(
            `users`,
            'POST',
            true,
            {},
            formData
        )

    },



}
