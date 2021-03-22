import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

import {wordsApi} from '../api/wordsApi'
const initialState = {
    words: [],
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
                words: action.payload
            }
        },

    }
})

export const {pageFormChange} = wordsReducer.actions

export default wordsReducer.reducer
