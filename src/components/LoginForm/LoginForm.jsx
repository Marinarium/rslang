import React from 'react';
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {authLogin, loginFormChange} from '../../redux/authReducer';
import styles from "../RegisterForm/RegisterForm.module.scss";
import MainTitle from "../MainTitle/MainTitle";


export const LoginForm = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const loginForm = useSelector(state => state.auth.loginForm);
    const changeHandler = (event) => {
        dispatch(loginFormChange({[event.target.name]: event.target.value}));
    };

    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(authLogin(loginForm));
        history.push('/');
    };
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
};
