import React, { Component } from "react";
import LoginForm from "./loginForm.jsx";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./style/headerstyles.css";

class Header extends Component {
  state = {};

  handleUpload() {
    document.location.href = "/upload";
  }
  render() {
    return (
      <div className="header">
        <Link to="/">PC Market</Link>
        <Link to="/cpu">CPU</Link>
        <Link to="/displaycard">Display card</Link>
        <Link to="/mainboard">Mainboard</Link>
        <Link to="/ram">RAM</Link>
        <Link to="/storage">Storage</Link>
        <Link to="/cooling">Cooling</Link>
        <Link to="/psu">PSU</Link>
        <Link to="/case">Case</Link>
        <Link to="/gamingear">Gaming Gear</Link>
        <Link to="/network">Network</Link>
        <Link to="/register">Register</Link>
        <LoginForm />
        <button onClick={this.handleUpload}>Upload</button>
      </div>
    );
  }
}

export default Header;
