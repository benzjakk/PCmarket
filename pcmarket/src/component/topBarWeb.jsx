import React, { Component } from "react";
import "./style/topBarWebstyles.css";
class TopBarWeb extends Component {
  state = {
    input: "",
  };
  render() {
    return (
      <div className="topBarWeb">
        <div className="topBarComponent">
          <a href="/" style={{ textDecoration: "none" }}>
            <p className="logo">
              THAIPCMARKET
            </p>
          </a>
          
          <button className="authBut"> เข้าสู่ระบบ</button>
          <button className="authBut"> สมัครสมาชิก</button>
        </div>
      </div>
    );
  }
}

export default TopBarWeb;
