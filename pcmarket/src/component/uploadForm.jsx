import React, { Component, Fragment } from "react";
import firebase from "../firebase/Firebase.js";
import "./style/uploadFormstyles.css";
class UploadForm extends Component {
  state = {
    name: "",
    des: "",
    flaw: "",
    model: "",
    price: 0,
    series: "",
    cate: "",
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleUpload = (e) => {
    e.preventDefault();
    const db = firebase.firestore();
    db.collection("item")
      .add({
        des: this.state.des,
        flaw: this.state.flaw,
        model: this.state.model,
        price: this.state.price,
        series: this.state.series,
        cate: this.state.cate,
        time: new Date(),
        seller: "BenzJAKK",
      })
      .then((ref) => {
        alert("Added document with ID: ", ref.id);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    return (
      <form className="uploadForm" onSubmit={this.handleUpload}>
        <b>Upload</b>

        <b>Description</b>
        <input type="text" name="des" required onChange={this.handleChange} />
        <b>Flaw</b>
        <input type="text" name="flaw" required onChange={this.handleChange} />
        <b>Price</b>
        <input
          type="number"
          name="price"
          required
          onChange={this.handleChange}
        />
        <b>Category</b>
        <input type="text" name="cate" required onChange={this.handleChange} />
        <b>Series</b>
        <input
          type="text"
          name="series"
          required
          onChange={this.handleChange}
        />
        <b>Model</b>
        <input type="text" name="model" required onChange={this.handleChange} />
        <button type="button" onClick={this.handleUpload}>
          Upload
        </button>
      </form>
    );
  }
}

export default UploadForm;
