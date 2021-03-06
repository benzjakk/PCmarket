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
    deleteState: false,
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
            style={{ backgroundColor: "#de4463", color: "white" ,borderRadius:"0"}}
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
    if (this.state.deleteState == false) {
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
            style={{ backgroundColor: "#de4463", color: "white" }}
            onClick={this.handleDelete}
          >
            YES
          </button>
        </div>
      );
    } else {
      return (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <img src={loadingPic} width="100" height="70"></img>
          <label style={{color:"whitesmoke"}}>กำลังลบรายการ</label>
        </div>
      );
    }
  }

  handleDelete = (e) => {
    this.setState({ deleteState: true });
    const path = "/items/" + this.state.itemUID;
    const deleteFn = firebase
      .app()
      .functions("asia-east2")
      .httpsCallable("recursiveDelete");
    deleteFn({ path: path })
      .then(function (result) {
        console.log("Delete success: " + JSON.stringify(result.data.result));
        window.location.reload();
      })
      .catch(function (err) {
        console.log("Error : " + err);
      });
  };

  render() {
    const item = this.state.item;

    if (item) {
      return (
        <div
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <section className="secItemShow">
            <div className="showIMG">
              <Img placeholder={loadingPic} error={errorPic} src={item.pic} />
            </div>

            <div className="itemShow">
              <b style={{ fontSize: "30px", overflowWrap: "anywhere" }}>
                {item.name}
              </b>
              <b style={{ color: "white", fontSize: "14px" }}>
                {item.cate} {item.ref1} {item.ref2}
              </b>

              <div style={{ display: "flex", flexDirection: "column" }}>
                <b style={{ color: "gray" }}>คำอธิบาย</b>
                <b style={{ overflowWrap: "anywhere", whiteSpace: "pre-line" }}>
                  {item.des}
                </b>
                <b style={{ color: "gray" }}>ตำหนิ</b>
                <b style={{ overflowWrap: "anywhere" }}>{item.flaw}</b>
                <b style={{ color: "gray" }}>Brand</b>
                <b style={{ overflowWrap: "anywhere" }}>{item.brand}</b>
                <b style={{ color: "gray" }}>ประเภท</b>
                <b style={{ overflowWrap: "anywhere" }}>{item.type}</b>
                <b style={{ color: "gray" }}>ผู้ขาย</b>
                <b style={{ overflowWrap: "anywhere" }}>{item.sellerName}</b>
                <b style={{ color: "gray" }}>ติดต่อ</b>
                <b style={{ overflowWrap: "anywhere", whiteSpace: "pre-line" }}>
                  {item.contact}
                </b>
              </div>

              <b style={{  color: "gray" }}>ราคา</b>
              <b style={{ color:"gold",fontSize: "30px", height: "50px" }}>
                {item.price} ฿
              </b>
              {item.time ? (
                <Timestamp
                  style={{ padding: "10px" ,color:"whitesmoke"}}
                  date={item.time.toDate()}
                />
              ) : null}

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
        <b className="itemNotFound">
          {" "}
          <p
            style={{ marginBottom: "0", fontSize: "40px", paddingBottom: "0" }}
          >
            {" "}
            Sorry ! ! !
          </p>
          <p style={{ marginTop: "0", color: "black", paddingTop: "0" }}>
            {" "}
            Item Not Found.
          </p>
        </b>
      );
    }
  }
}

export default ItemShow;
