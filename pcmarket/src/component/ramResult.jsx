import React, { Component } from "react";
import firebase from "../firebase/Firebase.js";
import ItemDemo from "./itemDemo.jsx";
import cateList from "./doc/cateList.js";
class RamResult extends Component {
  state = {
    items: [],
    selectedItems: [],
    type: "All",
    ref1: "All",
    ref2: "All",
  };
  componentDidMount = (e) => {
    const db = firebase.firestore();
    db.collection("items")
      .where("cate", "==", "Ram")
      .orderBy("time", "desc")
      .get()
      .then((res) => {
        res.forEach((doc) => {
          //console.log(doc.data());
          let items = this.state.items;
          items.push(doc.data());

          this.setState({
            items: items,
            selectedItems: items,
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  handleFilter = (e) => {
    let items = this.state.items;
    if (this.state.type != "All") {
      items = items.filter((item) => item.type === this.state.type);
    }
    if (this.state.ref1 != "All") {
      items = items.filter((item) => item.ref1 === this.state.ref1);
    }
    if (this.state.ref2 != "All") {
      items = items.filter((item) => item.ref2 === this.state.ref2);
    }
    this.setState({ selectedItems: items });
  };

  filterChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
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
          RAM{" "}
        </b>
        <div>
          <b style={{ color: "white", marginLeft: "30px" }}> Type : </b>
          <select name="type" onChange={this.filterChange}>
            <option>All</option>
            <option>New</option>
            <option>Used</option>
          </select>
          <b style={{ color: "white" }}> Size : </b>
          <select key="ram" name="ref1" onChange={this.filterChange}>
            <option>All</option>
            {cateList.ramSize.map((ramS, i) => (
              <option>{ramS}</option>
            ))}
          </select>
          <b style={{ color: "white" }}> Bus Speed : </b>
          <select key="ram1" name="ref2" onChange={this.filterChange}>
            <option>All</option>
            {cateList.ramBus.map((ramB, i) => (
              <option>{ramB}</option>
            ))}
          </select>

          <button onClick={this.handleFilter}> Apply </button>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {this.state.selectedItems.length == 0 ? (
            <b style={{ color: "white", marginLeft: "30px" }}>
              {" "}
              Not Found Result
            </b>
          ) : null}
          {this.state.selectedItems.map((item, i) => (
            <ItemDemo item={item} key={i} />
          ))}
        </div>
      </div>
    );
  }
}

export default RamResult;
