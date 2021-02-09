import React from "react";
import BusinessCard from "../BusinessCard";
import "./style.css";
function BusinessCategory({header, bList}){

    return (
        <>
            <h4>{header}</h4>
            <div className="col-12 d-flex justify-content-start">
                { Object.keys(bList).map(key => {
                    return <BusinessCard key={key} business={bList[key]}/>
                })} 
            </div>
        </>
        );
}
export default BusinessCategory;