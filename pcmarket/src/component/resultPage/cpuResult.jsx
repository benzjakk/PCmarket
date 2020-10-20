import React, { Component } from "react";

import cateList from "../doc/cateList.js";
import ResultInterface from './resultInterface.jsx';

class CPUResult extends ResultInterface {
  initCate(){
    this.setState({cate:"CPU"});
  }
  showFilter(){
    return this.genFilter(cateList.cpuSeries,cateList.cpuSocket,cateList.cpuBrand,"Series","Socket","Brand")
  }
}

export default CPUResult;
