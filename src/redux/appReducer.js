import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    currentPagesArray: ['0', '0', '0', '0', '0', '0'],
    activeUnit: {}
}

const appReducer = createSlice({
    name: 'appReducer',
    initialState,
    reducers: {
        setCurrentPagesItem: (state, action) => {

            return {
                ...state,
                currentPagesArray: state.currentPagesArray.map((i, index) => {
                    if (index === action.payload.currentGroup) {
                        return action.payload.currentPage
                    }
                    return i
                }),

            }
        },
        setCurrentPagesArray: (state, action) => {

            return {
                ...state,
                currentPagesArray: action.payload,

            }
        },
        setActiveUnit: (state, action) => {
            return {
                ...state,
                activeUnit: action.payload,

            }
        },

    },
    extraReducers: {}
})

export const {
    setCurrentPagesItem,
    setCurrentPagesArray,
    setActiveUnit

} = appReducer.actions

export default appReducer.reducer
