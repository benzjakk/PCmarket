import React, { Component } from "react";
import firebase from "../../firebase/Firebase.js";
import ItemDemo from "../itemDemo.jsx";
import cateList from "../doc/cateList.js";
class StorageResult extends Component {
  state = {
    items: [],
    paginateNum: 10,
    selectedItems: [],
    type: "All",
    ref1: "All",
    ref2: "All",
  };
  componentDidMount = (e) => {
    const db = firebase.firestore();
    db.collection("items")
      .where("cate", "==", "Storage")
      .orderBy("time", "desc")
      .limit(this.state.paginateNum)
      .get()
      .then((res) => {
        let items = [];
        res.forEach((doc) => {
          //console.log(doc.data());

          items.push({ data: doc.data(), id: doc.id });
        });
        this.setState({
          items: items,
          selectedItems: items,
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
  handleMoreResult = async (e) => {
    await this.setState({ paginateNum: this.state.paginateNum + 10 });
    this.componentDidMount();
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
          Storage{" "}
        </b>
        <div style={{ width: "75vw", marginLeft: "30px" }}>
          <b style={{ color: "white" }}> Type : </b>
          <select name="type" onChange={this.filterChange}>
            <option>All</option>
            <option>New</option>
            <option>Used</option>
          </select>
          <b style={{ color: "white" }}> Storage type : </b>
          <select key="storage" name="ref1" onChange={this.filterChange}>
            <option>All</option>
            {cateList.storageType.map((strT, i) => (
              <option>{strT}</option>
            ))}
          </select>
          <b style={{ color: "white" }}> Capacity : </b>
          <select key="storage1" name="ref2" onChange={this.filterChange}>
            <option>All</option>
            {cateList.storageCapacity.map((strC, i) => (
              <option>{strC}</option>
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
            <ItemDemo item={item.data} id={item.id} key={i} />
          ))}
        </div>
        {this.state.paginateNum === this.state.items.length ? (
          <button onClick={this.handleMoreResult}> เพิ่มเติม </button>
        ) : null}
      </div>
    );
  }
}

export default StorageResult;
