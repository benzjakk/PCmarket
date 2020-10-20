import React, { Component } from "react";
import cateList from "../doc/cateList.js";
import ResultInterface from './resultInterface.jsx';

class CaseResult extends ResultInterface  {
  initCate(){
    this.setState({cate:"Case"});
  }
  showFilter(){
    return this.genFilter(cateList.caseBrand,null,null,"Brand",null,null)
  }
}

export default CaseResult;
