import React, { Component, Fragment } from "react";
import firebase from "../firebase/Firebase.js";
import ItemDemo from "./itemDemo.jsx";
class HomePage extends Component {
  state = {
    items: [],
    paginateNum: 10,
  };
  componentDidMount = (e) => {
    const db = firebase.firestore();
    db.collection("items")
      .orderBy("time", "desc")
      .limit(this.state.paginateNum)
      .get()
      .then((res) => {
        let items = [];
        res.forEach((doc) => {
          items.push({ data: doc.data(), id: doc.id });

          this.setState({
            items: items,
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleMoreResult = async (e) => {
    await this.setState({ paginateNum: this.state.paginateNum + 10 });
    this.componentDidMount();
  };

  handleTest = (e) => {
    const sayHello = firebase.functions().httpsCallable("sayHello");
    sayHello({ name: "benz" }).then((res) => {
      console.log(res.data);
    });
  };

  render() {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <b
          style={{
            color: "black",
            paddingLeft: "15px",
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
            <ItemDemo item={item.data} id={item.id} key={i} />
          ))}
        </div>
        {this.state.paginateNum === this.state.items.length ? (
          <button onClick={this.handleMoreResult}> เพิ่มเติม </button>
        ) : null}
        <button onClick={this.handleTest}>Test</button>
      </div>
    );
  }
}

export default HomePage;
