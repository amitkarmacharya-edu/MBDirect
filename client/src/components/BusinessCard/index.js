import React, { useState } from "react";
import AudioIcon from "../AudioIcon";
import VideoIcon from "../VideoIcon";
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
            className="business-card rounded mr-2"
            style={{ width: "18rem", height: "18rem" }}
            onMouseEnter={toggleCardBody}
            onMouseLeave={toggleCardBody}
        >
            <div className={`position-relative business-img-header ${imgHeaderHeight}`}>
                {
                    <img
                        src={business.logo ? business.logo : "https://co-matter.com/wp-content/themes/semplice/images/no_thumb.png"}
                        className={imgHeaderHeight}
                        alt={business.name}
                    />
                }
                <p className="business-name">{business.name}</p>
            </div>
            <div className={`card-body ${hide}`}>
            <VideoIcon businessId={business.id} />
            <AudioIcon businessId={business.id} />
            {/* add a link to the business page */}
            </div>
        </div>
    );
}
export default BusinessCard;