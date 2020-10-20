import React, { Component } from "react";
import cateList from "../doc/cateList.js";
import ResultInterface from './resultInterface.jsx';
class CoolingResult extends ResultInterface {
  initCate(){
    this.setState({cate:"Cooling"});
  }
  showFilter(){
    return this.genFilter(cateList.coolingType,cateList.coolingBrand,null,"Cooling Type","Brand",null)
  }
}

export default CoolingResult;
