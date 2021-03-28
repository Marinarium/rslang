import {createSlice} from '@reduxjs/toolkit'

const initialState = {
   activeDictionaryUnit: {},
}

const dictionaryReducer = createSlice({
    name: 'dictionaryReducer',
    initialState,
    reducers: {
        setActiveDictionaryUnit: (state, action) => {
            return {
                ...state,
                activeDictionaryUnit: action.payload,

            }
        },
    },
    extraReducers: {}
})

export const {
    setActiveDictionaryUnit,
} = dictionaryReducer.actions

export default dictionaryReducer.reducer
