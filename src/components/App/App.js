import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Header from "../Header/Header";
import TextBookPage from "../../pages/TextBookPage/TextBookPage";
import Footer from "../Footer/Footer";
import DictionaryPage from "../../pages/DictionaryPage/DictionaryPage";
import SettingsPage from "../../pages/SettingsPage/SettingsPage";
import {LoginForm} from '../LoginForm/LoginForm'
import {RegisterForm} from '../RegisterForm/RegisterForm'

function App() {
    return (
        <Router>
            <div className="App">
                <Header/>
                <Route path="/" exact component={TextBookPage}/>
                <Route path="/login" exact component={LoginForm}/>
                <Route path="/register" exact component={RegisterForm}/>
                <Route path="/text-book/:unit" exact component={TextBookPage}/>  {/*Добавил раздел*/}
                <Route path="/dictionary" component={DictionaryPage}/>
                <Route path="/settings" component={SettingsPage}/>
                <Footer/>
            </div>
        </Router>
    );
}

export default App;
