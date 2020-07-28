import React, { Component } from "react";
import SideBar from "./sideBar.jsx";
import TopBar from "./topBar.jsx";
class NavTab extends Component {
  state = { windowWidth: 0, windowHeight: 0 };

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  updateDimensions = (e) => {
    let windowWidth = typeof window !== "undefined" ? window.innerWidth : 0;
    let windowHeight = typeof window !== "undefined" ? window.innerHeight : 0;

    this.setState({ windowWidth, windowHeight });
  };
  render() {
    const { windowWidth } = this.state;
    if (windowWidth > 800) {
      return <TopBar />;
    }
    return <TopBar />;
  }
}

export default NavTab;
