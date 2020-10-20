import React, { Component } from "react";
import cateList from "../doc/cateList.js";
import ResultInterface from './resultInterface.jsx';
class RamResult extends ResultInterface{
  
  initCate(){
    this.setState({cate:"Ram"});
  }
  showFilter(){
    return this.genFilter(cateList.ramSize,cateList.ramBus,cateList.ramBrand,"Size","Bus Speed","Brand")
  }
}

export default RamResult;
