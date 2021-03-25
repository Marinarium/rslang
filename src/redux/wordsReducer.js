import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

import {wordsApi} from '../api/wordsApi'
const initialState = {
    items: [],
    pageForm: {
        group: '',
        page: ''
    }
}

export const fetchWords = createAsyncThunk(
    'wordsReducer/fetchWords ',
    async ({group, page}) => {
        const data = await wordsApi.fetchWords({group, page})
            .then((res) => res && res.json())

        if (!data) {
            throw new Error(data.message || 'Something went wrong!')
        }

        return data

    }
)

export const createUserWord = createAsyncThunk(
    'wordsReducer/createUserWord',
    async ({userId, wordId, props}) => {
        const data = await wordsApi.createUserWord({userId, wordId, props})
            .then((res) => res && res.json())
        if (!data) {
            throw new Error(data.message || 'Something went wrong!')
        }
        return data
    }
)


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

    },
    extraReducers: {
        [fetchWords.fulfilled]: (state, action) => {
            return {
                ...state,
                items: action.payload
            }
        },
        [createUserWord.fulfilled]: (state, action) => {
            return {
                ...state
            }
        },

    }
})

export const {} = wordsReducer.actions

export default wordsReducer.reducer
