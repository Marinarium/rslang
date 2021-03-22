import {request, token} from './request'

export const settingsApi = {

    getSettings(userId) {
        return request(
            `users/${userId}/settings`,
            'GET',
            null,
            {'Accept': 'application/json'}
        )

    },

    putSettings({userId, stats}) {
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
