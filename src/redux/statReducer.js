import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {statApi} from "../api/statApi";

const initialState = {
    learned: 0,
    deleted: 0,
    difficult: 0,
    gamesCount: 0
};

export const getStatistics = createAsyncThunk(
    'statReducer/getStatistics',
    async ({userId, token}) => {
        const data = await statApi.getStatistics({userId, token})
            .then((res) => res && res.json())
        if (!data) {
            throw new Error(data.message || 'Something went wrong!')
        }
        return data
    }
);
export const getCount = createAsyncThunk(
    'statReducer/getCount',
    async ({userId, token}) => {
        const data = await statApi.getCount({userId, token})
            .then((res) => res && res.json())
        if (!data) {
            throw new Error(data.message || 'Something went wrong!')
        }
        return data
    }
);

export const putStatistics = createAsyncThunk(
    'statReducer/putStatistics',
    async ({userId, stats, token}) => {
        const data = await statApi.putStatistics({userId, stats, token})
            .then((res) => res && res.json());
        if (!data) {
            throw new Error(data.message || 'Something went wrong!')
        }
        return data
    }
);

const statReducer = createSlice({
    name: 'statReducer',
    initialState,
    reducers: {},
    extraReducers: {
        [getStatistics.fulfilled]: (state, action) => {
            return {
                ...state,
                gamesCount: action.payload.optional.gamesCount,

            }
        },
        [getCount.fulfilled]: (state, action) => {
            return {
                ...state,
                difficult: action.payload.difficult,
                deleted: action.payload.deleted,
                learned: action.payload.learned,
            }
        },
        [putStatistics.fulfilled]: (state, action) => {
            return {
                ...state,
                gamesCount: action.payload.optional.gamesCount,
            }
        },
    }
});


export default statReducer.reducer;
