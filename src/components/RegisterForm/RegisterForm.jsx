import React, {useEffect, useRef, useState} from 'react';
import {authRegister, registerFormChange, setIsRegistered} from '../../redux/authReducer';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import MainTitle from "../MainTitle/MainTitle";

import styles from './RegisterForm.module.scss';
import {validateControl} from "../../services/utils/validation";

export const RegisterForm = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const registerForm = useSelector(state => state.auth.registerForm);
    const isRegistered = useSelector(state => state.auth.isRegistered);

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
        dispatch(registerFormChange({[event.target.name]: event.target.value}));
        const setCurrentState = (prevState) => {
            return {
                ...prevState,
                touched: true,
                valid: validateControl(event.target.value, prevState.validation)
            }
        };
        if (event.target.name === 'email') setEmailValidation(prevState => setCurrentState(prevState));
        if (event.target.name === 'name') setNameValidation(prevState => setCurrentState(prevState));
        if (event.target.name === 'password') setPasswordValidation(prevState => setCurrentState(prevState));
    };
    let fileInput = useRef(null);

    useEffect(() => {
        isRegistered && history.push('/');
        dispatch(setIsRegistered(false));
    }, [dispatch, isRegistered, history]);

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("email", registerForm.email);
        formData.append("password", registerForm.password);
        formData.append("name", registerForm.name);
        formData.append("avatar", fileInput.files[0]);
        dispatch(authRegister(formData))
    }
    return (
        <form className={styles.form}>
            <MainTitle text={'Регистрация'}/>
            <p className={styles.instruction}>Для того, чтобы воспользоваться всеми функциями приложения - пожалуйста зарегистрируйтесь, потом прейдите на страницу входа, войдите и перезагрузите страницу. Пароль должен содержать не менее 8 символов</p>
            <div className={styles.field}>
                <label className={styles.label} htmlFor="mail">Email*</label>
                <span className={styles.error}>{emailValidation.touched && !emailValidation.valid && emailValidation.errorMessage}</span>
                <input
                    className={styles.input}
                    onChange={changeHandler}
                    value={registerForm.email}
                    name='email'
                    type='email'
                    id='mail'
                    required
                />
                <div className={styles.line}/>
            </div>
            <div className={styles.field}>
                <label className={styles.label} htmlFor="password">Пароль*</label>
                <span className={styles.error}>{passwordValidation.touched && !passwordValidation.valid && passwordValidation.errorMessage}</span>
                <input
                    className={styles.input}
                    onChange={changeHandler}
                    value={registerForm.password}
                    type='password'
                    name='password'
                    id='password'
                />
                <div className={styles.line}/>
            </div>
            <div className={styles.field}>
                <label className={styles.label} htmlFor="name">Никнейм*</label>
                <span className={styles.error}>{nameValidation.touched && !nameValidation.valid && nameValidation.errorMessage}</span>
                <input
                    className={styles.input}
                    onChange={changeHandler}
                    value={registerForm.name}
                    name='name'
                    id='name'
                    required
                />
                <div className={styles.line}/>
            </div>
            <label className={styles.label} htmlFor="img">Аватарка</label>
            <input className={styles.avatar}
                id="img"
                accept=".jpg, .jpeg, .png"
                type="file"
                ref={(input) => {
                    fileInput = input;
                }}
            />
            <button className={styles.button} onClick={submitHandler}>Зарегистироваться</button>
        </form>
    )
};
