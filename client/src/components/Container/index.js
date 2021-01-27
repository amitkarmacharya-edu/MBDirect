import React from "react";
import "./Container.css";

function Container(props) {
  return <div className={props.sidebar ? "container-fluid active" : "container-fluid"} style={props.style}>{props.children}</div>;
}

export default Container;
