import {request} from './request'

export const statApi = {

    getStatistics(userId) {
        return request(
            `users/${userId}/statistics`,
            'GET',
            null,
            {'Accept': 'application/json'}
        )

    },

    putStatistics({userId, stats, token}) {
        return request(
            `users/${userId}/statistics`,
            'PUT',
            true,
            {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            JSON.stringify(stats)
        )

    },


}
