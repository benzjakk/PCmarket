import React, { Component, Fragment } from "react";
import LoginForm from "./loginForm.jsx";
import "./style/topBarstyles.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
class TopBarMobile extends LoginForm {
  
  handleUpload(){
    window.location.href='/upload';
  }
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
        
        
        
      </div>
    );
  }
  
  closeMenu = (e) => {
    this.setState({ showMenu: false, title: e.target.title });
  };
  triggerMenu = (e) => {
    this.setState({ showMenu: !this.state.showMenu });
  };
  displayUser(){
    return (
      <div className="loginFormTopMobile">
        
        <p>Hello, {this.state.currentUser.displayName}</p>
        {this.state.emailVerified ? null : (
          <p className="caution">Please verified your email !!</p>
        )}
        <button onClick={this.handleUpload}>Upload</button>
        <button onClick={this.logout}>Logout</button>
      </div>
    );
  }
  render() {
    return (
     
        <div style={{ width: "100%" }}>
          <div
            className="topBar"
            style={{
              backgroundColor: "#171717",
              display: "flex",
              justifyItems: "space-between",
            }}
          >
            <div
              style={{ marginTop: "13px" }}
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
              THAIPCMARKET
            </h1>
            {this.state.currentUser?this.displayUser():<Fragment><a href="/login" className="authBut"> เข้าสู่ระบบ</a>
            <a href="/register" className="authBut" onClick={this.handleRegis}> สมัครสมาชิก</a></Fragment>}
            
          </div>
          {this.state.showMenu ? this.showMenu() : null}
        </div>
        
      
    );
  }
}

export default TopBarMobile;
