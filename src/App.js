import './App.css';
import React from "react";
import Home from "./Home";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import TextAnalysis from "./TextAnalysis";
import Topic from "./Topic";
import Main from './Main'

const App = () => {
    return (
        <Router>
            <Main>
                <Switch>
                    <Route path="/analysis" component={TextAnalysis}/>
                    <Route path="/show" component={Topic}/>
                    <Route path="/" component={Home}/>
                </Switch>
            </Main>
        </Router>
    )
}

export default App;
