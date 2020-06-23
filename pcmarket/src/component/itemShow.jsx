import React, { Component, Fragment } from "react";
import firebase from "../firebase/Firebase.js";
import "./style/itemShowstyles.css";
import Img from "react-cool-img";
import loadingPic from "./pic/loading.gif";
import errorPic from "./pic/error.png";
class ItemShow extends Component {
  state = { item: {}, itemUID: this.props.match.params.id };
  componentDidMount = (e) => {
    const db = firebase.firestore();
    db.collection("items")
      .doc(this.state.itemUID)
      .get()
      .then((res) => {
        this.setState({ item: res.data() });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    const item = this.state.item;

    return (
      <div className="itemShow">
        <b>{item.cate}</b>
        <Img
          placeholder={loadingPic}
          error={errorPic}
          src={item.pic}
          style={{
            margin: "10px",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
        <b style={{ backgroundColor: "gray", color: "white" }}>Name </b>
        <b>{item.name}</b>
        <b style={{ backgroundColor: "gray", color: "white" }}>Description </b>
        <b>{item.des}</b>
        <b style={{ backgroundColor: "gray", color: "white" }}>ตำหนิ</b>
        <b>{item.flaw}</b>
        <b style={{ backgroundColor: "gray", color: "white" }}>ราคา</b>
        <b>{item.price}</b>
        <b style={{ backgroundColor: "gray", color: "white" }}>ผู้ขาย</b>
        <b>{item.sellerName}</b>
        <b style={{ backgroundColor: "gray", color: "white" }}>ติดต่อ</b>
        <b>{item.contact}</b>
        <b>
          {item.ref1} {item.ref2}
        </b>
      </div>
    );
  }
}

export default ItemShow;
