import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Header from "../Header/Header";
import TextBookPage from "../../pages/TextBookPage/TextBookPage";
import Footer from "../Footer/Footer";
import DictionaryPage from "../../pages/DictionaryPage/DictionaryPage";
import SettingsPage from "../../pages/SettingsPage/SettingsPage";

function App() {
    return (
        <Router>
            <div className="App">
                <Header/>
                <Route path="/" exact component={TextBookPage}/>
                <Route path="/text-book" exact component={TextBookPage}/>
                <Route path="/dictionary" component={DictionaryPage}/>
                <Route path="/settings" component={SettingsPage}/>
                <Footer/>
            </div>
        </Router>
    );
}

export default App;
