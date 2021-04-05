import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

import {authApi} from '../api/authApi'


const initialState = {
    token: '',
    userId: '',
    authError: '',
    avatar: '',
    name: '',
    isAuthenticated: false,
    registerMessage: '',
    loginForm: {
        email: '',
        password: ''
    },
    registerForm: {
        email: '',
        password: '',
        name: ''
    }
}


export const authLogin = createAsyncThunk(
    'authReducer/authLogin',
    async (loginForm) => {

        const data = await authApi.login(loginForm)
            .then((res) => res && res.json())

        if (!data.token) {
            throw new Error(data.message || 'Something went wrong!')
        }

        localStorage.setItem('userData', JSON.stringify({
            userId: data.userId, token: data.token, name: data.name
        }))
        return data

    }
)
export const authRegister = createAsyncThunk(
    'authReducer/authRegister',
    async (formData) => {
        return await authApi.register(formData)
            .then((res) => res && res.json())


    }
)
// export const getUser = createAsyncThunk(
//     'authReducer/getUser ',
//     async (id) => {
//         const data = await authApi.getUser(id)
//             .then((res) => res && res.json())
//
//         if (!data) {
//             throw new Error(data.message || 'Something went wrong!')
//         }
//
//         return data
//     }
// )


const authReducer = createSlice({
    name: 'authReducer',
    initialState,
    reducers: {
        loginFormChange: (state, action) => {
            return {
                ...state,
                loginForm: {...state.loginForm, ...action.payload}
            }
        },
        registerFormChange: (state, action) => {
            return {
                ...state,
                registerForm: {...state.registerForm, ...action.payload}
            }
        },
        setIsAuthenticated: (state, action) => {
            return {
                ...state,
                token: action.payload.token,
                userId: action.payload.userId,
                name: action.payload.name,
                isAuthenticated: !!action.payload.token
            }
        },
        authLogout: (state) => {
            return {
                ...state,
                token: '',
                userId: '',
                name: '',
                isAuthenticated: false,
                loginForm: {
                    ...state.loginForm,
                    email: '',
                    password: ''
                }
            }
        }
    },
    extraReducers: {

        [authRegister.fulfilled]: (state, action) => {

            return {
                ...state,
                registerMessage: action.payload.message,

            }

        },

        [authLogin.fulfilled]: (state, action) => {

            return {
                ...state,
                token: action.payload.token,
                userId: action.payload.userId,
                isAuthenticated: !!action.payload.token,
                authError: '',
                name: action.payload.name

            }

        },

    }
})

export const {
    authLogout,
    loginFormChange,
    registerFormChange,
    setIsAuthenticated,

} = authReducer.actions

export default authReducer.reducer
