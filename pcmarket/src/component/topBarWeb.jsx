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
              THAI <br></br>PC <br></br>MARKET
            </p>
          </a>
          <input type="text" placeholder="GTX2080,I7-7700"></input>
          <button className="searchBut"> ค้นหา</button>
          <button className="authBut"> เข้าสู่ระบบ</button>
          <button className="authBut"> สมัครสมาชิก</button>
        </div>
      </div>
    );
  }
}

export default TopBarWeb;
