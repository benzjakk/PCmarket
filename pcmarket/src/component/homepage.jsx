import React, { Component, Fragment } from "react";
import firebase from "../firebase/Firebase.js";
import ItemDemo from "./itemDemo.jsx";
class HomePage extends Component {
  state = {
    items: [],
  };
  componentDidMount = (e) => {
    const db = firebase.firestore();
    db.collection("items")
      .orderBy("time", "desc")
      .get()
      .then((res) => {
        res.forEach((doc) => {
          //console.log(doc.data());
          let items = this.state.items;
          items.push(doc.data());

          this.setState({
            items: items,
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <b
          style={{
            color: "white",
            paddingLeft: "33px",
            paddingTop: "30px",
            fontSize: "30px",
          }}
        >
          {" "}
          ลงขายล่าสุด{" "}
        </b>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {this.state.items.map((item, i) => (
            <ItemDemo item={item} key={i} />
          ))}
        </div>
      </div>
    );
  }
}

export default HomePage;
