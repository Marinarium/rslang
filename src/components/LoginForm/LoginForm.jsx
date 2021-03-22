import React from 'react'
import {fetchWords, pageFormChange} from '../../redux/wordsReducer'
import {useDispatch, useSelector} from 'react-redux'
import {authLogin, loginFormChange} from '../../redux/authReducer'


export const LoginForm = () => {
    const dispatch = useDispatch()
    const loginForm = useSelector(state => state.auth.loginForm)
    const changeHandler = (event) => {
        dispatch(loginFormChange({[event.target.name]: event.target.value}))
    }

    const submitHandler = () => {
        console.log('loginForm', loginForm)
        dispatch(authLogin(loginForm))

    }
    return (
        <div>
            Вход:<br/>
            Enter Email<br/>
            <input onChange={changeHandler} name='email'/><br/>
            Enter Password<br/>
            <input onChange={changeHandler} name='password'/><br/>
            <button onClick={submitHandler}>Load</button>
            <br/><br/>
        </div>
    )
}
