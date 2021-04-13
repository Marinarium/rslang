import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {authLogin, loginFormChange} from '../../redux/authReducer';
import MainTitle from "../MainTitle/MainTitle";
import {validateControl} from '../../services/utils/validation';
import styles from "../RegisterForm/RegisterForm.module.scss";

export const LoginForm = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const loginForm = useSelector(state => state.auth.loginForm);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    const [nameValidation, setNameValidation] = useState({
        name: 'name',
        valid: false,
        touched: false,
        validation: {
            required: true,
            name: true
        },
        errorMessage: 'Введите корректное имя'
    });

    const [emailValidation, setEmailValidation] = useState({
        name: 'email',
        valid: false,
        touched: false,
        validation: {
            required: true,
            email: true
        },
        errorMessage: 'Введите корректный email'
    });
    const [passwordValidation, setPasswordValidation] = useState({
        name: 'password',
        valid: false,
        touched: false,
        validation: {
            required: true,
            password: true
        },
        errorMessage: 'Пароль должен содержать не менее 8 символов'
    });

    const changeHandler = (event) => {
        dispatch(loginFormChange({[event.target.name]: event.target.value}));
        const setCurrentState = (prevState) => {
            return {
                ...prevState,
                touched: true,
                valid: validateControl(event.target.value, prevState.validation)
            }
        };
        if (event.target.name === 'email') setEmailValidation(prevState => setCurrentState(prevState));
        if (event.target.name === 'password') setPasswordValidation(prevState => setCurrentState(prevState));

    };

    useEffect(() => {
        isAuthenticated && history.push('/');
    }, [isAuthenticated, history]);

    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(authLogin(loginForm));
    };
    return (
        <form className={styles.form} id="registration">
            <MainTitle text={'Вход'}/>
            <div className={styles.field}>
                <label className={styles.label} htmlFor="mail">Email</label>
                <span className={styles.error}>{emailValidation.touched && !emailValidation.valid && emailValidation.errorMessage}</span>
                <input
                    className={styles.input}
                    onChange={changeHandler}
                    name='email'
                    type='email'
                    id='mail'
                    value={loginForm.email}

                />
                <div className={styles.line}/>

            </div>
            <div className={styles.field}>
                <label className={styles.label} htmlFor="password">Пароль</label>
                <span className={styles.error}>{passwordValidation.touched && !passwordValidation.valid && passwordValidation.errorMessage}</span>
                <input
                    type='password'
                    className={styles.input}
                    onChange={changeHandler}
                    name='password'
                    id='password'
                    value={loginForm.password}

                />
                <div className={styles.line}/>
            </div>
            <button className={styles.button} onClick={submitHandler} form="registration" type="submit">Войти</button>
        </form>
    )
};
