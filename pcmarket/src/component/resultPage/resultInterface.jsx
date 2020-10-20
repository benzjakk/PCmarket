import React, { Component, Fragment } from 'react';
import firebase from "../../firebase/Firebase.js";
import ItemDemo from "../itemDemo.jsx";
import cateList from "../doc/cateList.js";
import "../style/resultPagestyles.css";
class ResultInterface extends Component {
    state = {
        items: [],
        paginateNum: 10,
        selectedItems: [],
        cate: "",
        type: "All",
        ref1: "All",
        ref2: "All",
        brand: "All",
      };

      componentDidMount = async(e) => {
        await this.initCate();
        const db = firebase.firestore();
        db.collection("items")
          .where("cate", "==", this.state.cate)
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
      initCate(){
    
      }
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
      handleMoreResult = async (e) => {
        await this.setState({ paginateNum: this.state.paginateNum + 10 });
        this.componentDidMount();
      };
      genFilter(list1,list2,list3,label1,label2,label3){
        return <div className="filterDiv">
        <b style={{ color: "black" }}> Type : </b>
        <select name="type" onChange={this.filterChange}>
          <option>All</option>
          <option>New</option>
          <option>Used</option>
        </select>
        {list1?<Fragment><b style={{ color: "black" }}> {label1} : </b>
        <select key="s1" name="ref1" onChange={this.filterChange}>
          <option>All</option>
          {list1.map((l1, i) => (
            <option>{l1}</option>
          ))}
        </select></Fragment>:null}
        
        {list2?<Fragment><b style={{ color: "black" }}> {label2} : </b>
        <select key="s2" name="ref2" onChange={this.filterChange}>
          <option>All</option>
          {list2.map((l2, i) => (
            <option>{l2}</option>
          ))}
        </select></Fragment>:null}
        
        {list3?<Fragment><b style={{ color: "black" }}> {label3} : </b>
        <select key="s3" name="ref3" onChange={this.filterChange}>
          <option>All</option>
          {list3.map((l3, i) => (
            <option>{l3}</option>
          ))}
        </select></Fragment>:null}
        
    
        <button onClick={this.handleFilter}> Apply </button>
      </div>
      }

      showFilter(){
          
      }
    
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
              {this.state.cate}{" "}
            </b>
            {this.showFilter()}
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
 
export default ResultInterface;