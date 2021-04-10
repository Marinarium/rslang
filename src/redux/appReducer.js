import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    currentPagesArray: ['0', '0', '0', '0', '0', '0'],
    currentDifficultPagesArray: ['0', '0', '0', '0', '0', '0'],
    currentDeletedPagesArray: ['0', '0', '0', '0', '0', '0'],
    currentLearnedPagesArray: ['0', '0', '0', '0', '0', '0'],
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
        setCurrentDifficultPagesItem: (state, action) => {
            return {
                ...state,
                currentDifficultPagesArray: state.currentDifficultPagesArray.map((i, index) => {
                    if (index === action.payload.currentGroup) {
                        return action.payload.currentPage
                    }
                    return i
                }),

            }
        },
        setCurrentDeletedPagesItem: (state, action) => {

            return {
                ...state,
                currentDeletedPagesArray: state.currentDeletedPagesArray.map((i, index) => {
                    if (index === action.payload.currentGroup) {
                        return action.payload.currentPage
                    }
                    return i
                }),

            }
        },
        setCurrentLearnedPagesItem: (state, action) => {
            return {
                ...state,
                currentLearnedPagesArray: state.currentLearnedPagesArray.map((i, index) => {
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
        setCurrentDifficultPagesArray: (state, action) => {

            return {
                ...state,
                currentDifficultPagesArray: action.payload,

            }
        },
        setCurrentDeletedPagesArray: (state, action) => {

            return {
                ...state,
                currentDeletedPagesArray: action.payload,

            }
        },
        setCurrentLearnedPagesArray: (state, action) => {

            return {
                ...state,
                currentLearnedPagesArray: action.payload,

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
    setIsWordTranslated,
    setCurrentDifficultPagesArray,
    setCurrentDifficultPagesItem,
    setCurrentDeletedPagesArray,
    setCurrentDeletedPagesItem,
    setCurrentLearnedPagesArray,
    setCurrentLearnedPagesItem


} = appReducer.actions

export default appReducer.reducer
