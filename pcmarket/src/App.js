import React from "react";
import Header from "./component/header.jsx";
import RegisterForm from "./component/registerForm.jsx";
import UploadForm from "./component/uploadForm.jsx";
import HomePage from "./component/homepage.jsx";
import CPUResult from "./component/cpuResult.jsx";
import MBResult from "./component/mbResult.jsx";
import GPUResult from "./component/gpuResult.jsx";
import RamResult from "./component/ramResult.jsx";
import StorageResult from "./component/storageResult.jsx";
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
          <Route path="/cpu">
            <CPUResult />
          </Route>
          <Route path="/displaycard">
            <GPUResult />
          </Route>
          <Route path="/mainboard">
            <MBResult />
          </Route>
          <Route path="/ram">
            <RamResult />
          </Route>
          <Route path="/storage">
            <StorageResult />
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
