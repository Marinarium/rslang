import React from 'react'
import {fetchWords, pageFormChange} from '../../redux/wordsReducer'
import {useDispatch, useSelector} from 'react-redux'
import {authLogin, loginFormChange} from '../../redux/authReducer'
import styles from "../RegisterForm/RegisterForm.module.scss";
import MainTitle from "../MainTitle/MainTitle";


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
        <form className={styles.form}>
            <MainTitle text={'Вход'}/>
            <div className={styles.field}>
                <label className={styles.label} htmlFor="mail">Email</label>
                <input className={styles.input} onChange={changeHandler} name='email' id='mail'/>
                <div className={styles.line}/>
            </div>
            <div className={styles.field}>
                <label className={styles.label} htmlFor="password">Пароль</label>
                <input className={styles.input} onChange={changeHandler} name='password' id='password'/>
                <div className={styles.line}/>
            </div>
            <button className={styles.button} onClick={submitHandler}>Войти</button>
        </form>
    )
}
