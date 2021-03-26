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

    getAllUserWordsWithoutUserWords({group, page, userId}) { //Get all not user words by group & page
        return request(
            `users/${userId}/aggregatedWords?filter={"userWord":null}&group=${group}&page=${page}`,
            'GET',
            true,
            {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        )
    },
    getAllUserWordsWithoutDeletedWords({group, page, userId}) { //Get all not deleted words by group & page
        return request(
            `users/${userId}/aggregatedWords?filter={"userWord.optional.deleted": null}&group=${group}&page=${page}`,
            'GET',
            true,
            {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
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
    createUserWord({userId, wordId, props}) {
        return request(
            `users/${userId}/words/${wordId}`,
            'POST',
            true,
            {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            JSON.stringify(props)
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
    getAllUserWords(userId) { //Get all user words
        return request(
            `users/${userId}/words`,
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
    getDifficultWords({group, page, userId}) { //Get difficult words
        return request(
            `users/${userId}/aggregatedWords?filter={"userWord.difficulty":"hard"}&group=${group}&page=${page}`,
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
