import React, { Component } from "react";
import LoginForm from "./loginForm.jsx";

import "./style/headerstyle.css";
class Header extends Component {
  state = {};
  render() {
    return (
      <div className="header">
        <h1>PC MARKET</h1>
        <LoginForm />
      </div>
    );
  }
}

export default Header;
