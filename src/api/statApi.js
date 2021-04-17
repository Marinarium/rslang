import {request} from './request';

export const statApi = {

    getStatistics({userId, token}) {
        return request(
            `users/${userId}/statistics`,
            'GET',
            null,
            {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
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
    getCount({ userId, token}) {
        return request(
            `users/${userId}/aggregatedWords/getCount`,
            'GET',
            true,
            {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        )
    },

};
