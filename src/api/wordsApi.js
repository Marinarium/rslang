import {request, token} from './request'

export const wordsApi = {
    fetchWords({group, page}) {
        return request(
            `words?group=${group}&page=${page}`,
            'GET',
            null,
            {'Accept': 'application/json'}
        )

    },
    getWordById(id) {
        return request(
            `words/${id}`,
            'GET',
            null,
            {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        )

    },
    createUserWord({userId, wordId, word}) {
        return request(
            `users/${userId}/words/${wordId}`,
            'POST',
            true,
            {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            JSON.stringify(word)
        )

    },
    getUserWord(id) { //Get a user word by id
        return request(
            `users/${id}/words`,
            'GET',
            true,
            {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        )

    },
    getAllUserWords({userId, wordId}) { //Get all user words
        return request(
            `users/${userId}/words/${wordId}`,
            'GET',
            true,
            {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        )

    },
    deleteUserWords({userId, wordId}) { //Delete user word
        return request(
            `users/${userId}/words/${wordId}`,
            'GET',
            true,
            {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        )

    },
    getAllUserAggregatedWords(userId) { //Get all user aggregated words
        return request(
            `users/${userId}/aggregatedWords`,
            'GET',
            true,
            {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        )
    },
    getUserAggregatedWord({userId, wordId}) { //Get a user aggregated word by id
        return request(
            `users/${userId}/aggregatedWords/${wordId}`,
            'GET',
            true,
            {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        )
    },


}