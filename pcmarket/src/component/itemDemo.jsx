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
              width="150px"
              height="150px"
              style={{
                margin: "1px",
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
            <b>{item.name}</b>
            
            
            <b style={{ fontSize: "10px",height:"20px" }}>
              {item.ref1} {item.ref2} {item.brand}
            </b>
            <b style={{color:"gold",fontSize:"26px",height:"50px"}}>{item.price} ฿</b>
          </div>
        </a>
      );
    } else return null;
  }
}

export default ItemDemo;
