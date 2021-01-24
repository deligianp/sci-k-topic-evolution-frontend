import './App.css';
import React from "react";
import Home from "./Home";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import TextAnalysis from "./TextAnalysis";

class App extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/analysis">
                        <TextAnalysis/>
                    </Route>
                    <Route path="/">
                        <Home/>
                    </Route>
                </Switch>
            </Router>
        )
    }
}

export default App;
