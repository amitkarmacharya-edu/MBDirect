import React from "react";
import "./style.css";
function Jumbo() {
  return (
    <div className="container-search">
      <div className="search-wrapper">        
        <input name="company" type="text" className="form-control" placeholder="Type Company Name to Search" id="company"></input>
      </div>
    </div>
  );
}
export default Jumbo;
