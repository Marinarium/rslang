import React, {useRef} from 'react'
import {authRegister, registerFormChange} from '../../redux/authReducer'
import {useDispatch, useSelector} from 'react-redux'
import MainTitle from "../MainTitle/MainTitle";

import styles from './RegisterForm.module.scss'

export const RegisterForm = () => {
    const dispatch = useDispatch()
    const registerForm = useSelector(state => state.auth.registerForm)
    const changeHandler = (event) => {
        dispatch(registerFormChange({[event.target.name]: event.target.value}))
    }
    let fileInput = useRef(null)

    const submitHandler = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("email", registerForm.email)
        formData.append("password", registerForm.password)
        formData.append("name", registerForm.name)
        formData.append("avatar", fileInput.files[0])
        console.log('reg', typeof(formData), fileInput.files[0])
        dispatch(authRegister(formData))
    }
    return (
        <form className={styles.form}>
            <MainTitle text={'Регистрация'}/>
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
            <div className={styles.field}>
                <label className={styles.label} htmlFor="name">Никнейм</label>
                <input className={styles.input} onChange={changeHandler} name='name' id='name'/>
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
}
