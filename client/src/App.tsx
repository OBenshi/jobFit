import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Appbar from "./components/Appbar";
import LogIn from "./Views/LogIn";
import Home from "./Views/Home";
import SignUp from "./Views/SignUp";
import AAbla from "./AAbla";

function App() {
  return (
    <div className="App">
      <Router>
        <Appbar />
        <Switch>
          <Route exact path="/login" children={<LogIn />} />
          <Route exact path="/testing" children={<AAbla />} />
          <Route exact path="/signup" children={<SignUp />} />
           <Route exact path="/home" children={<Home />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
