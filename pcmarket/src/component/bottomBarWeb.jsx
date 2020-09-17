import React, { Component } from "react";
import "./style/bottomBarWebstyles.css";
class BottomBarWeb extends Component {
  state = {};
  render() {
    return (
      <div className="buttomBarWeb">
        <p>©2020 Thaipcmarket</p>
        <a
          href="https://www.facebook.com/thaipcmarket"
          target="_blank"
          style={{ textDecoration: "none", color: "white" }}
        >
          <p>Facebook Page</p>
        </a>
      </div>
    );
  }
}

export default BottomBarWeb;
