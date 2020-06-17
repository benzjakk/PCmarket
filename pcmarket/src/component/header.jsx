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
        <Link to="/">CPU</Link>
        <Link to="/">Display card</Link>
        <Link to="/">Mainboard</Link>
        <Link to="/">RAM</Link>
        <Link to="/">Storage</Link>
        <Link to="/">Cooling</Link>
        <Link to="/">PSU</Link>
        <Link to="/">Case</Link>
        <Link to="/">Gaming Gear</Link>
        <Link to="/">Network</Link>
        <Link to="/register">Register</Link>
        <LoginForm />
        <button onClick={this.handleUpload}>Upload</button>
      </div>
    );
  }
}

export default Header;
