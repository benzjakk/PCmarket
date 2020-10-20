import React, { Component } from "react";
import cateList from "../doc/cateList.js";
import ResultInterface from './resultInterface.jsx';
class MBResult extends ResultInterface {
  
  initCate(){
    this.setState({cate:"Mainboard"});
  }
  showFilter(){
    return this.genFilter(cateList.cpuSocket,cateList.mbBrand,null,"Socket","Brand",null)
  }
}

export default MBResult;
