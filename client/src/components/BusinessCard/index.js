import React, { useState } from "react";
import "./style.css";
function BusinessCard({ business }) {
    const [hide, setHide] = useState("d-none");
    const [imgHeaderHeight, setImgHeaderHeight] = useState("h-100");
    function toggleCardBody(e) {
        if (e.currentTarget.className.indexOf("business-card") > -1 && hide === "d-none") {
            setHide("d-block");
            setImgHeaderHeight("");
        } else {
            setHide("d-none");
            setImgHeaderHeight("h-100");
        }
    }
    return (
        <div
            className="business-card rounded"
            style={{ width: "18rem", height: "18rem" }}
            onMouseEnter={toggleCardBody}
            onMouseLeave={toggleCardBody}
        >
            <div className={`position-relative business-img-header ${imgHeaderHeight}`}>
                {
                    <img
                        src={business.logo ? business.img : "https://co-matter.com/wp-content/themes/semplice/images/no_thumb.png"}
                        className={imgHeaderHeight}
                        alt={business.name}
                    />
                }
                <p className="business-name">{business.name}Test</p>
            </div>
            <div className={`card-body ${hide}`}>
                
                {/* add a link to the business page */}
            </div>
        </div>
    );
}
export default BusinessCard;