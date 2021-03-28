import React, {useRef} from 'react'
import {authRegister, registerFormChange} from '../../redux/authReducer'
import {useDispatch, useSelector} from 'react-redux'

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
        <form>
            Регистрация:<br/>
            Enter Email<br/>
            <input onChange={changeHandler} name='email'/><br/>
            Enter Password<br/>
            <input onChange={changeHandler} name='password'/><br/>
            Enter Name<br/>
            <input onChange={changeHandler} name='name'/><br/>
            <input
                accept=".jpg, .jpeg, .png"
                type="file"
                ref={(input) => {
                    fileInput = input;
                }}
            />
            <button onClick={submitHandler}>Load</button>
            <br/><br/>
        </form>
    )
}
