import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    currentPagesArray: ['0', '0', '0', '0', '0', '0'],
    activeUnit: {},
    isWordTranslated: true,
    isWordButtonsShown: true

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
        setIsWordTranslated: (state, action) => {
            return {
                ...state,
                isWordTranslated: action.payload //? action.payload : !state.isWordTranslated
            }
        },
        setIsWordButtonsShown: (state, action) => {
            return {
                ...state,
                isWordButtonsShown: action.payload //? action.payload : !state.isWordButtonsShown
            }
        },


    },
    extraReducers: {}
})

export const {
    setCurrentPagesItem,
    setCurrentPagesArray,
    setActiveUnit,
    setIsWordButtonsShown,
    setIsWordTranslated


} = appReducer.actions

export default appReducer.reducer
