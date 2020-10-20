import React, { Component } from "react";
import cateList from "../doc/cateList.js";
import ResultInterface from './resultInterface.jsx';
class GPUResult extends ResultInterface {
  
  initCate(){
    this.setState({cate:"Display card"});
  }
  showFilter(){
    return this.genFilter(cateList.gpuSeries,cateList.gpuBrand,null,"Series","Brand",null)
  }
}

export default GPUResult;
