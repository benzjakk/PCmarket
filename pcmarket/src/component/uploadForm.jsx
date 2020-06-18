import React, { Component, Fragment } from "react";
import firebase from "../firebase/Firebase.js";
import "./style/uploadFormstyles.css";
import cateList from "./doc/cateList.js";
import UploadPic from "./uploadPic.jsx";
class UploadForm extends Component {
  state = {
    name: "",
    des: "",
    flaw: "",
    ref1: "Pentium G",
    ref2: "LGA1150",
    price: 0,
    cate: "CPU",
    type: "New",
    currentPage: "uploadinfo",
    currentItemUid: "",
    contact: "",
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });

    if (e.target.name == "cate") {
      console.log(e.target.value);
      switch (e.target.value) {
        case "CPU":
          this.setState({ ref1: "Pentium G", ref2: "LGA1150" });
          break;
        case "Display card":
          this.setState({ ref1: "GTX1000", ref2: "" });
          break;
        case "Mainboard":
          this.setState({ ref1: "LGA1150", ref2: "" });
          break;
        case "Ram":
          this.setState({ ref1: "4GB", ref2: "1333" });
          break;
        case "Storage":
          this.setState({ ref1: "SSD", ref2: "500GB" });
          break;
        case "Cooling":
          this.setState({ ref1: "Air", ref2: "" });
          break;
        case "PSU":
          this.setState({ ref1: "350W", ref2: "" });
          break;
        case "Case":
          this.setState({ ref1: "", ref2: "" });
          break;
        case "Gaming Gear":
          this.setState({ ref1: "Mouse", ref2: "" });
          break;
        case "Network":
          this.setState({ ref1: "Router", ref2: "" });
          break;
      }
    }
  };

  handleUpload = (e) => {
    e.preventDefault();
    const db = firebase.firestore();
    const user = firebase.auth().currentUser;
    db.collection("items")
      .add({
        name: this.state.name,
        des: this.state.des,
        flaw: this.state.flaw,
        ref1: this.state.ref1,
        ref2: this.state.ref2,
        price: this.state.price,
        cate: this.state.cate,
        time: new Date(),
        seller: user.uid,
        sellerName: user.displayName,
        type: this.state.type,
        contact: this.state.contact,
      })
      .then((ref) => {
        alert("Upload Info เสร็จสิ้น");

        this.setState({ currentPage: "uploadPic", currentItemUid: ref.id });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  selectCate = (e) => {
    const cate = this.state.cate;
    switch (cate) {
      case "CPU":
        return this.cpuCate();
      case "Mainboard":
        return this.mbCate();
      case "Display card":
        return this.gpuCate();
      case "Ram":
        return this.ramCate();
      case "Storage":
        return this.storageCate();
      case "Cooling":
        return this.coolingCate();
      case "PSU":
        return this.psuCate();
      case "Gaming Gear":
        return this.gamingGearCate();
      case "Network":
        return this.networkCate();
    }
  };
  networkCate() {
    return (
      <Fragment>
        <b>Network type</b>
        <select key="network" name="ref1" onChange={this.handleChange}>
          {cateList.networkType.map((nwT, i) => (
            <option>{nwT}</option>
          ))}
        </select>
      </Fragment>
    );
  }
  gamingGearCate() {
    return (
      <Fragment>
        <b>Gaming Gear type</b>
        <select key="gaminggear" name="ref1" onChange={this.handleChange}>
          {cateList.gamingGearType.map((ggT, i) => (
            <option>{ggT}</option>
          ))}
        </select>
      </Fragment>
    );
  }
  psuCate() {
    return (
      <Fragment>
        <b>PSU Watt</b>
        <select key="psu" name="ref1" onChange={this.handleChange}>
          {cateList.psuWatt.map((psuW, i) => (
            <option>{psuW}</option>
          ))}
        </select>
      </Fragment>
    );
  }
  coolingCate() {
    return (
      <Fragment>
        <b>Cooling type</b>
        <select key="cooling" name="ref1" onChange={this.handleChange}>
          {cateList.coolingType.map((coolT, i) => (
            <option>{coolT}</option>
          ))}
        </select>
      </Fragment>
    );
  }
  storageCate() {
    return (
      <Fragment>
        <b>Storage type</b>
        <select key="storage" name="ref1" onChange={this.handleChange}>
          {cateList.storageType.map((strT, i) => (
            <option>{strT}</option>
          ))}
        </select>
        <b>Capacity</b>
        <select key="storage1" name="ref2" onChange={this.handleChange}>
          {cateList.storageCapacity.map((strC, i) => (
            <option>{strC}</option>
          ))}
        </select>
      </Fragment>
    );
  }
  ramCate() {
    return (
      <Fragment>
        <b>Size</b>
        <select key="ram" name="ref1" onChange={this.handleChange}>
          {cateList.ramSize.map((ramS, i) => (
            <option>{ramS}</option>
          ))}
        </select>
        <b>Bus speed</b>
        <select key="ram1" name="ref2" onChange={this.handleChange}>
          {cateList.ramBus.map((ramB, i) => (
            <option>{ramB}</option>
          ))}
        </select>
      </Fragment>
    );
  }

  gpuCate() {
    return (
      <Fragment>
        <b>Series</b>
        <select key="gpu" name="ref1" onChange={this.handleChange}>
          {cateList.gpuSeries.map((gpuS, i) => (
            <option>{gpuS}</option>
          ))}
        </select>
      </Fragment>
    );
  }

  mbCate() {
    return (
      <Fragment>
        <b>Socket</b>
        <select key="mb" name="ref1" onChange={this.handleChange}>
          {cateList.cpuSocket.map((cpuS, i) => (
            <option>{cpuS}</option>
          ))}
        </select>
      </Fragment>
    );
  }

  cpuCate() {
    return (
      <Fragment>
        <b>Series</b>
        <select key="cpu" name="ref1" onChange={this.handleChange}>
          {cateList.cpuSeries.map((cpuS, i) => (
            <option>{cpuS}</option>
          ))}
        </select>
        <b>Socket</b>
        <select key="cpu1" name="ref2" onChange={this.handleChange}>
          {cateList.cpuSocket.map((cpuS, i) => (
            <option>{cpuS}</option>
          ))}
        </select>
      </Fragment>
    );
  }
  render() {
    console.log(this.state);
    if (this.state.currentPage == "uploadinfo") {
      return (
        <form className="uploadForm" onSubmit={this.handleUpload}>
          <b style={{ fontSize: "100px" }}>Upload</b>
          <b>Name</b>
          <input
            type="text"
            name="name"
            required
            onChange={this.handleChange}
            maxLength="30"
          />
          <b>Description</b>
          <textarea
            type="text"
            name="des"
            required
            onChange={this.handleChange}
          />
          <b>ตำหนิ</b>
          <input
            type="text"
            name="flaw"
            required
            onChange={this.handleChange}
          />
          <b>Price</b>
          <input
            type="number"
            name="price"
            required
            onChange={this.handleChange}
          />
          <b>Category</b>
          <select name="cate" onChange={this.handleChange}>
            <option>CPU</option>
            <option>Display card</option>
            <option>Mainboard</option>
            <option>Ram</option>
            <option>Storage</option>
            <option>Cooling</option>
            <option>PSU</option>
            <option>Case</option>
            <option>Gaming Gear</option>
            <option>Network</option>
          </select>
          {this.selectCate()}
          <b>Type</b>
          <select name="type" onChange={this.handleChange}>
            <option>New</option>
            <option>Used</option>
          </select>
          <b>Contact</b>
          <textarea name="contact" required onChange={this.handleChange} />

          <button>Upload Info</button>
        </form>
      );
    } else {
      return <UploadPic currentItemUid={this.state.currentItemUid} />;
    }
  }
}

export default UploadForm;
