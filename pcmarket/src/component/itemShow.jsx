import React, { Component, Fragment } from "react";
import firebase from "../firebase/Firebase.js";
import "./style/itemShowstyles.css";
import Img from "react-cool-img";
import loadingPic from "./pic/loading.gif";
import errorPic from "./pic/error.png";
import Comment from "./comment.jsx";
import Timestamp from "react-timestamp";
class ItemShow extends Component {
  state = {
    item: [],
    itemUID: this.props.match.params.id,
    deleteYN: false,
    currentUser: null,
  };
  componentDidMount = (e) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          currentUser: user,
        });
      }
    });
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
  showDelete = (e) => {
    const user = this.state.currentUser;
    if (user) {
      if (user.uid == this.state.item.seller) {
        return (
          <button
            style={{ backgroundColor: "red", color: "white" }}
            onClick={(e) => {
              this.setState({ deleteYN: true });
            }}
          >
            Delete
          </button>
        );
      }
    }
  };

  showYNModal() {
    return (
      <div>
        <button
          onClick={(e) => {
            this.setState({ deleteYN: false });
          }}
        >
          NO
        </button>
        <button
          style={{ backgroundColor: "red", color: "white" }}
          onClick={this.handleDelete}
        >
          YES
        </button>
      </div>
    );
  }

  handleDelete = (e) => {
    const user = firebase.auth().currentUser;
    const db = firebase.firestore();
    //db.collection("items").doc(this.state.itemUID).collection("comments").de
    db.collection("items")
      .doc(this.state.itemUID)
      .delete()
      .then((res) => {
        if (this.state.item.pic) {
          firebase
            .storage()
            .ref("users/" + user.uid + "/items/" + this.state.itemUID)
            .child("pic01")
            .delete()
            .then((res) => {
              alert("delete info + pic complete");
              window.location.reload();
            });
        } else {
          alert("delete info complete");
          window.location.reload();
        }
      });
  };
  render() {
    const item = this.state.item;

    if (item) {
      return (
        <div
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <section
            className="secItemShow"
            style={{ height: "100%", display: "flex" }}
          >
            <div className="showIMG">
              <Img
                placeholder={loadingPic}
                error={errorPic}
                src={item.pic}
                style={{
                  width: "100%",

                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
            </div>

            <div className="itemShow">
              <b style={{ fontSize: "30px", overflowWrap: "anywhere" }}>
                {item.name}
              </b>
              <b style={{ color: "gray" }}>
                {item.cate} {item.ref1} {item.ref2}
              </b>

              <b
                style={{
                  borderTop: "solid",
                  borderWidth: "0.5px",
                  borderColor: "gray",
                  overflowWrap: "anywhere",
                }}
              >
                {item.des}
              </b>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <b style={{ color: "gray" }}>ตำหนิ</b>
                <b style={{ overflowWrap: "anywhere" }}>{item.flaw}</b>
                <b style={{ color: "gray" }}>Brand</b>
                <b style={{ overflowWrap: "anywhere" }}>{item.brand}</b>
                <b style={{ color: "gray" }}>ประเภท</b>
                <b style={{ overflowWrap: "anywhere" }}>{item.type}</b>
                <b style={{ color: "gray" }}>ผู้ขาย</b>
                <b style={{ overflowWrap: "anywhere" }}>{item.sellerName}</b>
                <b style={{ color: "gray" }}>ติดต่อ</b>
                <b style={{ overflowWrap: "anywhere" }}>{item.contact}</b>
              </div>

              <b style={{ backgroundColor: "gray", color: "white" }}></b>
              <b style={{ color: "#2b0091", fontSize: "30px", height: "50px" }}>
                {item.price} ฿
              </b>
              {item.time ? <Timestamp date={item.time.toDate()} /> : null}

              {this.showDelete()}
              {this.state.deleteYN ? this.showYNModal() : null}
            </div>
          </section>
          <Comment
            currentUser={this.state.currentUser}
            itemUID={this.state.itemUID}
          />
        </div>
      );
    } else {
      return (
        <b style={{ color: "white", margin: "30px" }}> Item Not Found !!!</b>
      );
    }
  }
}

export default ItemShow;
