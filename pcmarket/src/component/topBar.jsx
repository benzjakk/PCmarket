import React, { Component, Fragment } from "react";
import LoginForm from "./loginForm.jsx";
import "./style/topBarstyles.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
class TopBar extends Component {
  state = { showMenu: false, title: "Market" };

  showMenu() {
    return (
      <div className="topBarMenu">
        <Link to="/" onClick={this.closeMenu} title="Market">
          Home
        </Link>
        <Link onClick={this.closeMenu} to="/cpu" title="CPU">
          CPU
        </Link>
        <Link onClick={this.closeMenu} to="/displaycard" title="GPU">
          Display card
        </Link>
        <Link onClick={this.closeMenu} to="/mainboard" title="MB">
          Mainboard
        </Link>
        <Link onClick={this.closeMenu} to="/ram" title="RAM">
          RAM
        </Link>
        <Link onClick={this.closeMenu} to="/storage" title="Storage">
          Storage
        </Link>
        <Link onClick={this.closeMenu} to="/cooling" title="Cooling">
          Cooling
        </Link>
        <Link onClick={this.closeMenu} to="/psu" title="PSU">
          PSU
        </Link>
        <Link onClick={this.closeMenu} to="/case" title="Case">
          Case
        </Link>
        <Link onClick={this.closeMenu} to="/gaminggear" title="Gaming Gear">
          Gaming Gear
        </Link>
        <Link onClick={this.closeMenu} to="/network" title="Network">
          Network
        </Link>
        <Link onClick={this.closeMenu} to="/register" title="Register">
          Register
        </Link>
        <LoginForm />
        <button onClick={this.handleUpload}>Upload</button>
      </div>
    );
  }
  handleUpload() {
    document.location.href = "/upload";
  }
  closeMenu = (e) => {
    this.setState({ showMenu: false, title: e.target.title });
  };
  triggerMenu = (e) => {
    this.setState({ showMenu: !this.state.showMenu });
  };
  render() {
    return (
      <Fragment>
        <div style={{ width: "100%" }}>
          <div
            style={{
              backgroundColor: "rgb(56, 4, 107)",
              display: "flex",
              justifyItems: "space-between",
            }}
          >
            <div
              style={{ marginTop: "10px" }}
              className="menuIconGroup"
              onClick={this.triggerMenu}
            >
              <div className="menuIcon"></div>
              <div className="menuIcon"></div>
              <div className="menuIcon"></div>
            </div>
            <h1
              style={{ color: "white", marginLeft: "10px", fontSize: "20px" }}
            >
              {this.state.title}
            </h1>
          </div>
        </div>
        {this.state.showMenu ? this.showMenu() : null}
      </Fragment>
    );
  }
}

export default TopBar;
