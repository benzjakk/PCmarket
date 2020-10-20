import React, { Component, Fragment } from "react";
import "./style/topBarWebstyles.css";
import './loginForm.jsx';
import LoginForm from "./loginForm.jsx";
class TopBarWeb extends LoginForm {
  handleUpload(){
    window.location.href='/upload';
  }
  displayUser(){
    return (
      <div className="loginFormTop">
        
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
      <div className="topBarWeb">
        <div className="topBarComponent">
          <a href="/" style={{ textDecoration: "none" }}>
            <p className="logo">
              THAIPCMARKET
            </p>
          </a>
          {this.state.currentUser?this.displayUser():<Fragment><a href="/login" className="authBut"> เข้าสู่ระบบ</a>
          <a href="/register" className="authBut" onClick={this.handleRegis}> สมัครสมาชิก</a></Fragment>}
          
        </div>
      </div>
    );
  }
}

export default TopBarWeb;
