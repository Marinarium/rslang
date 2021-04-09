import {request} from './request'

export const wordsApi = {
    fetchWords({group, page}) {
        return request(
            `words?group=${group}&page=${page}`,
            'GET',
            null,
            {'Accept': 'application/json'}
        )

    },

    getAllUserWordsWithoutUserWords({group, page, userId, token}) { //Get all not user words by group & page
        return request(
            `users/${userId}/aggregatedWords?filter={"userWord":null}&group=${group}&page=${page}&wordsPerPage=20`,
            'GET',
            true,
            {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        )
    },

    getAllUserWordsWithoutDeletedWords({group, page, userId, token}) { //Get all not deleted words by group & page
        console.log('token', token)
        return request(
            `users/${userId}/aggregatedWords?filter={"$or":[{"userWord.optional.deleted":null},{"userWord.optional.deleted":false}]}&group=${group}&page=${page}&wordsPerPage=20`,
            'GET',
            true,
            {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        )
    },
    getWordById(id, token) {
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
    createUserWord({userId, wordId, props, token}) {
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
    updateUserWord({userId, wordId, props, token}) {
        return request(
            `users/${userId}/words/${wordId}`,
            'PUT',
            true,
            {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            JSON.stringify(props)
        )

    },
    getUserWord(id, token) { //Get a user word by id
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
    getAllUserWords(userId, token) { //Get all user words
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
    deleteUserWord({userId, wordId, token}) { //Delete user word
        return request(
            `users/${userId}/words/${wordId}`,
            'DELETE',
            true,
            {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        )

    },
    getDifficultWords({group, page, userId, token}) { //Get difficult words
        return request(
            `users/${userId}/aggregatedWords?filter={"userWord.difficulty":"hard"}&group=${group}&page=${page}&wordsPerPage=20`,
            'GET',
            true,
            {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        )
    },
    getDeletedWords({group, page, userId, token}) { //Get deleted words
        return request(
            `users/${userId}/aggregatedWords?filter={"userWord.optional.deleted":true}&group=${group}&page=${page}&wordsPerPage=20`,
            'GET',
            true,
            {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        )
    },
    getLearnedWords({group, page, userId, token}) { //Get learned words
        return request(
            `users/${userId}/aggregatedWords?filter={"$or":[{"userWord.difficulty":"hard"},{"userWord.optional.learned":true}]}&group=${group}&page=${page}&wordsPerPage=20`,
            'GET',
            true,
            {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        )
    },

    getUserAggregatedWord({userId, wordId, token}) { //Get a user aggregated word by id
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
