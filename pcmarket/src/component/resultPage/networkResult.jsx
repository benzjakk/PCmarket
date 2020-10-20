import React, { Component } from "react";

import cateList from "../doc/cateList.js";
import ResultInterface from './resultInterface.jsx';

class NetworkResult extends ResultInterface {
  
  initCate(){
    this.setState({cate:"Network"});
  }
  showFilter(){
    return this.genFilter(cateList.networkType,cateList.networkBrand,null,"Network Type","Brand",null)
  }
}

export default NetworkResult;
