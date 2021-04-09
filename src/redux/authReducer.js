import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

import {authApi} from '../api/authApi'


const initialState = {
    token: '',
    userId: '',
    authError: '',
    avatar: '',
    name: '',
    isAuthenticated: false,
    isRegistered: false,
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
            userId: data.userId, token: data.token, name: data.name, avatar: data.avatar
        }))
        return data

    }
)
export const authRegister = createAsyncThunk(
    'authReducer/authRegister',
    async (formData) => {
        const data = await authApi.register(formData)
            .then((res) => res && res.json())

        return data

    }
)


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
        // cleanLoginForm: (state, action) => {
        //     return {
        //         ...state,
        //         loginForm: {...state.registerForm, ...action.payload}
        //     }
        // },
        // cleanRegisterForm: (state, action) => {
        //     return {
        //         ...state,
        //         registerForm: {...state.registerForm, ...action.payload}
        //     }
        // },
        setIsAuthenticated: (state, action) => {
            return {
                ...state,
                token: action.payload.token,
                userId: action.payload.userId,
                name: action.payload.name,
                avatar: action.payload.avatar,
                isAuthenticated: !!action.payload.token,
                loginForm: {
                    ...state.loginForm,
                    email: '',
                    password: ''
                }
            }
        },
        setIsRegistered: (state, action) => {
            return {
                ...state,
                isRegistered: action.payload,
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
                isRegistered: true,
                registerForm: {
                    ...state.registerForm,
                    email: '',
                    password: '',
                    name: ''
                }
            }

        },

        [authLogin.fulfilled]: (state, action) => {

            return {
                ...state,
                token: action.payload.token,
                userId: action.payload.userId,
                isAuthenticated: !!action.payload.token,
                authError: '',
                name: action.payload.name,
                avatar: action.payload.avatar

            }

        },

    }
})

export const {
    authLogout,
    loginFormChange,
    registerFormChange,
    setIsAuthenticated,
    setIsRegistered,


} = authReducer.actions

export default authReducer.reducer
