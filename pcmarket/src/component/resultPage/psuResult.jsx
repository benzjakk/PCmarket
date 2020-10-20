import React, { Component } from "react";
import cateList from "../doc/cateList.js";
import ResultInterface from './resultInterface.jsx';

class PSUResult extends ResultInterface {
  
  initCate(){
    this.setState({cate:"PSU"});
  }
  showFilter(){
    return this.genFilter(cateList.psuWatt,cateList.psuBrand,null,"PSU Watt","Brand",null)
  }
}
export default PSUResult;
