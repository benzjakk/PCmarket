import React, { Component } from "react";
import Img from "react-cool-img";
import "./style/itemDemostyles.css";
import loadingPic from "./pic/loading.gif";
import errorPic from "./pic/error.png";
class ItemDemo extends Component {
  state = { item: null };
  componentDidMount() {
    this.setState({ item: this.props.item });
  }
  handleItemShow = (e) => {
    window.location.href = "/item/" + this.props.id;
  };
  render() {
    if (this.props.item) {
      const item = this.props.item;

      return (
        <a
          href={"/item/" + this.props.id}
          style={{ color: "black", textDecoration: "none" }}
        >
          <div className="itemDemo">
            <Img
              placeholder={loadingPic}
              src={item.pic}
              error={errorPic}
              width="100px"
              height="100px"
              style={{
                margin: "10px",
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
            <b>{item.name}</b>
            <b>ราคา : {item.price}</b>
            <b>ผู้ขาย : {item.sellerName}</b>
            <b>ประเภท : {item.type}</b>
            <b style={{ fontSize: "13px" }}>
              {item.ref1} {item.ref2}
            </b>
          </div>
        </a>
      );
    } else return null;
  }
}

export default ItemDemo;
