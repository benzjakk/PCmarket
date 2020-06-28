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
              alert("delete complete");
              window.location.reload();
            });
        } else {
          alert("delete complete");
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
              <b>{item.cate}</b>
              <Img
                placeholder={loadingPic}
                error={errorPic}
                src={item.pic}
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
            </div>

            <div className="itemShow">
              <b style={{ backgroundColor: "gray", color: "white" }}>Name </b>
              <b style={{ overflowWrap: "anywhere" }}>{item.name}</b>
              <b
                style={{
                  backgroundColor: "gray",
                  color: "white",
                }}
              >
                Description{" "}
              </b>
              <b style={{ overflowWrap: "anywhere" }}>{item.des}</b>
              <b style={{ backgroundColor: "gray", color: "white" }}>ตำหนิ</b>
              <b style={{ overflowWrap: "anywhere" }}>{item.flaw}</b>
              <b style={{ backgroundColor: "gray", color: "white" }}>ราคา</b>
              <b style={{ overflowWrap: "anywhere" }}>{item.price}</b>
              <b style={{ backgroundColor: "gray", color: "white" }}>ผู้ขาย</b>
              <b style={{ overflowWrap: "anywhere" }}>{item.sellerName}</b>
              <b style={{ backgroundColor: "gray", color: "white" }}>ติดต่อ</b>
              <b style={{ overflowWrap: "anywhere" }}>{item.contact}</b>
              <b style={{ backgroundColor: "gray", color: "white" }}>
                เวลาลงขาย
              </b>
              {item.time ? <Timestamp date={item.time.toDate()} /> : null}

              <b>
                {item.ref1} {item.ref2}
              </b>
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
