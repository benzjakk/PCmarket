import React from "react";
import Header from "./component/header.jsx";
import RegisterForm from "./component/registerForm.jsx";
import UploadForm from "./component/uploadForm.jsx";
import HomePage from "./component/homepage.jsx";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/register">
            <RegisterForm />
          </Route>
          <Route path="/upload">
            <UploadForm />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
