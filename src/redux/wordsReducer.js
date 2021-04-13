import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {wordsApi} from '../api/wordsApi'
const initialState = {
    items: [],
    userItems: [],
    pageForm: {
        group: '',
        page: ''
    },
    isLoading: false
};

export const fetchWords = createAsyncThunk(
    'wordsReducer/fetchWords',
    async ({group, page}) => {
        const data = await wordsApi.fetchWords({group, page})
            .then((res) => res && res.json());
        if (!data) {
            throw new Error(data.message || 'Something went wrong!')
        }
        return data
    }
);

export const getDifficultWords = createAsyncThunk(
    'wordsReducer/getDifficultWords',
    async ({group, page, userId, token}) => {
        const data = await wordsApi.getDifficultWords({group, page, userId, token})
            .then((res) => res && res.json())

        if (!data) {
            throw new Error(data.message || 'Something went wrong!')
        }
        const modifiedData = data[0].paginatedResults.map(word => {
            const obj = {id: word._id, ...word};
            delete obj['_id'];
            return obj

        });
        return modifiedData

    }
);

export const getDeletedWords = createAsyncThunk(
    'wordsReducer/getDeletedWords',
    async ({group, page, userId, token}) => {
        const data = await wordsApi.getDeletedWords({group, page, userId, token})
            .then((res) => res && res.json())

        if (!data) {
            throw new Error(data.message || 'Something went wrong!')
        }
        const modifiedData = data[0].paginatedResults.map(word => {
            const obj = {id: word._id, ...word};
            delete obj['_id'];
            return obj

        });
        return modifiedData

    }
);
export const getLearnedWords = createAsyncThunk(
    'wordsReducer/getLearnedWords',
    async ({group, page, userId, token}) => {
        const data = await wordsApi.getLearnedWords({group, page, userId, token})
            .then((res) => res && res.json());

        if (!data) {
            throw new Error(data.message || 'Something went wrong!')
        }
        const modifiedData = data[0].paginatedResults.map(word => {
            const obj = {id: word._id, ...word};
            delete obj['_id'];
            return obj

        });

        return modifiedData

    }
);
export const getAllUserWordsWithoutUserWords = createAsyncThunk(
    'wordsReducer/getAllUserWordsWithoutUserWords',
    async ({group, page, userId, token}) => {
        const data = await wordsApi.getAllUserWordsWithoutUserWords({group, page, userId, token})
            .then((res) => res && res.json());
        if (!data) {
            throw new Error(data.message || 'Something went wrong!')
        }
        const modifiedData = data[0].paginatedResults.map(word => {
            const obj = {id: word._id, ...word};
            delete obj['_id'];
            return obj

        });
        return modifiedData

    }
);
export const getAllUserWordsWithoutDeletedWords = createAsyncThunk(
    'wordsReducer/getAllUserWordsWithoutDeletedWords',
    async ({group, page, userId, token}) => {
        const data = await wordsApi.getAllUserWordsWithoutDeletedWords({group, page, userId, token})
            .then((res) => res && res.json());
        if (!data) {
            throw new Error(data.message || 'Something went wrong!')
        }
        const modifiedData = data[0].paginatedResults.map(word => {
            const obj = {id: word._id, ...word};
            delete obj['_id'];
            return obj

        });
        return modifiedData

    }
);

export const createUserWord = createAsyncThunk(
    'wordsReducer/createUserWord',
    async ({userId, wordId, props, token}) => {
        const data = await wordsApi.createUserWord({userId, wordId, props, token})
            .then((res) => res && res.json());
        if (!data) {
            throw new Error(data.message || 'Something went wrong!')
        }
        return data
    }
);
export const deleteUserWord = createAsyncThunk(
    'wordsReducer/deleteUserWord',
    async ({userId, wordId, token}) => {
        const data = await wordsApi.deleteUserWord({userId, wordId, token})
            .then((res) => res && res.json());
        if (!data) {
            throw new Error(data.message || 'Something went wrong!')
        }
        return data
    }
);
export const updateUserWord = createAsyncThunk(
    'wordsReducer/updateUserWord',
    async ({userId, wordId, props, token}) => {
        const data = await wordsApi.updateUserWord({userId, wordId, props, token})
            .then((res) => res && res.json());
        if (!data) {
            throw new Error(data.message || 'Something went wrong!')
        }
        return data
    }
);

const wordsReducer = createSlice({
    name: 'wordsReducer',
    initialState,
    reducers: {
        pageFormChange: (state, action) => {
            return {
                ...state,
                pageForm: {...state.pageForm, ...action.payload}
            }
        },
        setIsLoading: (state, action) => {
            return {
                ...state,
                isLoading: action.payload
            }
        },

    },
    extraReducers: {
        [fetchWords.pending]: (state) => {
            return {
                ...state,
                isLoading: true
            }
        },
        [fetchWords.fulfilled]: (state, action) => {
            return {
                ...state,
                items: action.payload,
                isLoading: false
            }
        },
        [getDifficultWords.fulfilled]: (state, action) => {
            return {
                ...state,
                items: action.payload,
                isLoading: false
            }
        },
        [getDeletedWords.fulfilled]: (state, action) => {
            return {
                ...state,
                items: action.payload,
                isLoading: false
            }
        },
        [getLearnedWords.fulfilled]: (state, action) => {
            return {
                ...state,
                items: action.payload,
                isLoading: false
            }
        },
        [getAllUserWordsWithoutUserWords.fulfilled]: (state, action) => {
            return {
                ...state,
                items: action.payload,
                isLoading: false
            }
        },
        [getAllUserWordsWithoutDeletedWords.pending]: (state) => {
            return {
                ...state,
                isLoading: true
            }
        },
        [getAllUserWordsWithoutDeletedWords.fulfilled]: (state, action) => {
            return {
                ...state,
                items: action.payload,
                isLoading: false
            }
        },
        [createUserWord.fulfilled]: (state, action) => {
            return {
                ...state
            }
        },

        [updateUserWord.fulfilled]: (state, action) => {
            return {
                ...state
            }
        },
        [deleteUserWord.fulfilled]: (state, action) => {
            return {
                ...state
            }
        },

    }
});

export const {setIsLoading} = wordsReducer.actions
export default wordsReducer.reducer;
