import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Header from "../Header/Header";
import TextBook from "../../pages/TextBook/TextBook";
import Footer from "../Footer/Footer";

function App() {
    return (
        <Router>
            <div className="App">
                <Header/>
                <TextBook/>
                <Footer/>
            </div>
        </Router>
    );
}

export default App;
