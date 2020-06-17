import React, { Component } from "react";
import firebase from "../firebase/Firebase.js";
import "./style/itemDemostyles.css";
class ItemDemo extends Component {
  state = { item: null };
  componentDidMount() {
    this.setState({ item: this.props.item });
  }
  render() {
    if (this.props.item) {
      const item = this.props.item;
      return (
        <div className="itemDemo">
          <b>{item.name}</b>
          <b>{item.price}</b>
          <b>{item.ref1}</b>
          <b>{item.ref2}</b>
          <b>{item.sellerName}</b>
          <b>{item.type}</b>
        </div>
      );
    } else return null;
  }
}

export default ItemDemo;
