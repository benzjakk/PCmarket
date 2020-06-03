import React, { Component } from "react";
import LoginForm from "./loginForm.jsx";

import "./style/headerstyles.css";
class Header extends Component {
  state = {};
  render() {
    return (
      <div className="header">
        <h1>PC MARKET</h1>
        <h2>CPU</h2>
        <h2>Display card</h2>
        <h2>Mainboard</h2>
        <h2>RAM</h2>
        <h2>Cooling</h2>
        <h2>PSU</h2>
        <h2>Case</h2>
        <h2>Network</h2>
        <LoginForm />
      </div>
    );
  }
}

export default Header;
