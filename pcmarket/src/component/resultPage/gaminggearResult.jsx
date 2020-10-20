import React, { Component } from "react";
import cateList from "../doc/cateList.js";
import ResultInterface from './resultInterface.jsx';

class GamingGearResult extends ResultInterface {
  
  initCate(){
    this.setState({cate:"Gaming Gear"});
  }
  showFilter(){
    return this.genFilter(cateList.gamingGearType,cateList.gaminggearBrand,null,"Gaming Gear Type","Brand",null)
  }
}

export default GamingGearResult;
