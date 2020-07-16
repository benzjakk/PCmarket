import React, { Component } from "react";
import firebase from "../../firebase/Firebase.js";
import ItemDemo from "../itemDemo.jsx";
import cateList from "../doc/cateList.js";

class CaseResult extends Component {
  state = {
    items: [],
    paginateNum: 10,
    selectedItems: [],
    type: "All",
    ref1: "All",
    ref2: "All",
    brand: "All",
  };
  componentDidMount = (e) => {
    const db = firebase.firestore();
    db.collection("items")
      .where("cate", "==", "Case")
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
  handleMoreResult = async (e) => {
    await this.setState({ paginateNum: this.state.paginateNum + 10 });
    this.componentDidMount();
  };
  handleFilter = (e) => {
    let items = this.state.items;
    if (this.state.type != "All") {
      items = items.filter((item) => item.data.type === this.state.type);
    }
    if (this.state.ref1 != "All") {
      items = items.filter((item) => item.data.ref1 === this.state.ref1);
    }
    if (this.state.ref2 != "All") {
      items = items.filter((item) => item.data.ref2 === this.state.ref2);
    }
    if (this.state.brand != "All") {
      items = items.filter((item) => item.data.brand === this.state.brand);
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
            color: "black",
            paddingLeft: "15px",
            paddingTop: "30px",
            fontSize: "30px",
          }}
        >
          {" "}
          Case{" "}
        </b>
        <div className="filterDiv">
          <b style={{ color: "black" }}> Type : </b>
          <select name="type" onChange={this.filterChange}>
            <option>All</option>
            <option>New</option>
            <option>Used</option>
          </select>
          <b style={{ color: "black" }}> Brand : </b>
          <select key="case" name="brand" onChange={this.filterChange}>
            <option>All</option>
            {cateList.caseBrand.map((caseB, i) => (
              <option>{caseB}</option>
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
            <b style={{ color: "black", marginLeft: "30px" }}>
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

export default CaseResult;
