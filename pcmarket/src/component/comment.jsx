import React, { Component, Fragment } from "react";
import firebase from "../firebase/Firebase.js";
import "./style/commentstyles.css";
import Timestamp from "react-timestamp";
class Comment extends Component {
  state = { input: "", comments: [] };
  componentDidMount = (e) => {
    const db = firebase.firestore();
    db.collection("items")
      .doc(this.props.itemUID)
      .collection("comments")
      .orderBy("timestamp")

      .onSnapshot((res) => {
        let comments = [];
        res.forEach((doc) => {
          comments.push({ data: doc.data(), id: doc.id });
        });
        this.setState({
          comments: comments,
        });
      });
  };

  addComment = (e) => {
    e.preventDefault();
    console.log(this.props.itemUID);
    const db = firebase.firestore();
    const datatmp = {
      posterId: this.props.currentUser.uid,
      posterName: this.props.currentUser.displayName,
      message: this.state.input,
      timestamp: new Date(),
    };
    db.collection("items")
      .doc(this.props.itemUID)
      .collection("comments")
      .add(datatmp)
      .then((res) => {})
      .catch((error) => {
        console.log(error);
      });
  };

  deleteComment = (e) => {
    const db = firebase.firestore();
    db.collection("items")
      .doc(this.props.itemUID)
      .collection("comments")
      .doc(e.target.name)
      .delete()
      .catch((error) => {
        console.log(error);
      });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const user = this.props.currentUser;

    return (
      <div className="comment">
        {" "}
        <b>Comment</b>
        {this.state.comments.map((comment) => (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              border: "3px",
              backgroundColor: "gray",
              marginTop: "3px",
              borderRadius: "5px",
            }}
          >
            <b style={{ backgroundColor: "gray", color: "white" }}>
              {comment.data.posterName} :{" "}
            </b>

            <b style={{ overflowWrap: "anywhere" }}>{comment.data.message}</b>
            <Timestamp
              style={{ fontSize: "10px", marginLeft: "5px" }}
              date={comment.data.timestamp.toDate()}
            />

            {this.props.currentUser &&
            this.props.currentUser.uid == comment.data.posterId ? (
              <button
                name={comment.id}
                onClick={this.deleteComment}
                style={{
                  marginLeft: "95%",
                  padding: "0",
                  backgroundColor: "red",
                  color: "white",
                }}
              >
                {" "}
                x{" "}
              </button>
            ) : null}
          </div>
        ))}
        {user ? (
          <Fragment>
            <b>{user.displayName} : </b>
            <form onSubmit={this.addComment}>
              <input
                style={{ width: "75%" }}
                name="input"
                type="text"
                placeholder="เขียนความคิดเห็น..."
                required
                onChange={this.handleChange}
              />
              <button style={{ backgroundColor: "#2b0091", color: "white" }}>
                ส่ง
              </button>
            </form>
          </Fragment>
        ) : (
          <input type="text" placeholder="กรุณา Login ก่อน comment" disabled />
        )}
      </div>
    );
  }
}

export default Comment;
