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
          <img
            src={item.pic}
            width="100px"
            height="100px"
            style={{
              margin: "10px",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
          <b>{item.name}</b>
          <b>ราคา : {item.price}</b>
          <b>ผู้ขาย : {item.sellerName}</b>
          <b>ประเภท : {item.type}</b>
          <b style={{ fontSize: "13px" }}>
            {item.ref1} {item.ref2}
          </b>
        </div>
      );
    } else return null;
  }
}

export default ItemDemo;
