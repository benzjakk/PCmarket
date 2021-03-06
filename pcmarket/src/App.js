import React from "react";
import NavTab from "./component/navTab.jsx";
import RegisterForm from "./component/registerForm.jsx";
import UploadForm from "./component/uploadForm.jsx";
import HomePage from "./component/homepage.jsx";
import CPUResult from "./component/resultPage/cpuResult.jsx";
import MBResult from "./component/resultPage/mbResult.jsx";
import GPUResult from "./component/resultPage/gpuResult.jsx";
import RamResult from "./component/resultPage/ramResult.jsx";
import StorageResult from "./component/resultPage/storageResult.jsx";
import CoolingResult from "./component/resultPage/coolingResult.jsx";
import PSUResult from "./component/resultPage/psuResult.jsx";
import CaseResult from "./component/resultPage/caseResult.jsx";
import GamingGearResult from "./component/resultPage/gaminggearResult.jsx";
import NetworkResult from "./component/resultPage/networkResult.jsx";
import ItemResult from "./component/itemShow.jsx";
import BottomBarWeb from "./component/bottomBarWeb.jsx";
import CateBar from "./component/cateBar.jsx";
import LoginForm from './component/loginForm.jsx';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Router>
      {" "}
      <NavTab />
      <div className="mainBody">
        <CateBar />
        <div className="App">
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
            <Route path="/cooling">
              <CoolingResult />
            </Route>
            <Route path="/psu">
              <PSUResult />
            </Route>
            <Route path="/case">
              <CaseResult />
            </Route>
            <Route path="/gaminggear">
              <GamingGearResult />
            </Route>
            <Route path="/network">
              <NetworkResult />
            </Route>
            <Route component={ItemResult} exact path="/item/:id" />
            <Route path="/register">
              <RegisterForm />
            </Route>
            <Route path="/upload">
              <UploadForm />
            </Route>
            <Route path="/login">
              <LoginForm />
            </Route>
          </Switch>
        </div>
      </div>
      <BottomBarWeb />
    </Router>
  );
}

export default App;
