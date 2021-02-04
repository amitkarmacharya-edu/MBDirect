import React from "react";
import BusinessCard from "../BusinessCard";
import "./style.css";
function BusinessCategory({header, bList}){
    return (
        <>
            <h4>{header}</h4>
            <div className="col-12 d-flex justify-content-start">
                <BusinessCard business={""}/>
            </div>
        </>
        );
}
export default BusinessCategory;