import React from 'react'
import {CardList} from './components/CardList/CardList'
import {RegisterForm} from './components/RegisterForm/RegisterForm'
import {LoginForm} from './components/LoginForm/LoginForm'

function App() {
    return (
        <div className="App">
           <RegisterForm/>
            <LoginForm/>
            <CardList/>
        </div>
    )
}

export default App
