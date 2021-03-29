import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "../Header/Header";
import TextBookPage from "../../pages/TextBookPage/TextBookPage";
import Footer from "../Footer/Footer";
import DictionaryPage from "../../pages/DictionaryPage/DictionaryPage";
import SettingsPage from "../../pages/SettingsPage/SettingsPage";
import {LoginForm} from '../LoginForm/LoginForm'
import {RegisterForm} from '../RegisterForm/RegisterForm'
import DifficultWords from '../DifficultWords/DifficultWords'
import DeletedWords from '../DeletedWords/DeletedWords'
import GamesPage from "../../pages/GamesPage/GamesPage";
import LearnedWords from '../LearnedWords/LearnedWords'

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
                <Route path="/dictionary/difficult/:unit" component={DifficultWords}/>
                <Route path="/dictionary/deleted/:unit" component={DeletedWords}/>
                <Route path="/dictionary/learned/:unit" component={LearnedWords}/>
                <Route path="/settings" component={SettingsPage}/>
                <Route path="/games" component={GamesPage} />
                <Footer/>
            </div>
        </Router>
    );
}

export default App;
