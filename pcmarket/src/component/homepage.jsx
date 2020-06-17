import React, { Component, Fragment } from "react";
import firebase from "../firebase/Firebase.js";
import ItemDemo from "./itemDemo.jsx";
class HomePage extends Component {
  state = {
    items: [],
  };
  componentDidMount() {
    const db = firebase.firestore();
    db.collection("items")
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
  }
  render() {
    return (
      <Fragment>
        {this.state.items.map((item, i) => (
          <ItemDemo item={item} key={i} />
        ))}
      </Fragment>
    );
  }
}

export default HomePage;
