import React, { Component } from "react";
import cateList from "../doc/cateList.js";
import ResultInterface from './resultInterface.jsx';
class StorageResult extends ResultInterface {
  
  initCate(){
    this.setState({cate:"Storage"});
  }
  showFilter(){
    return this.genFilter(cateList.storageType,cateList.storageCapacity,cateList.storageBrand,"Storage Type","Capacity","Brand")
  }
}

export default StorageResult;
