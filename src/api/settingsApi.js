import {request} from './request'

export const settingsApi = {

    getSettings(userId) {
        return request(
            `users/${userId}/settings`,
            'GET',
            null,
            {'Accept': 'application/json'}
        )

    },

    putSettings({userId, stats, token}) {
        return request(
            `users/${userId}/settings`,
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
