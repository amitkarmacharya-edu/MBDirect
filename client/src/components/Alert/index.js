import React, { useEffect, useState } from "react";
import { HIDE_ALERTS } from "../../utils/globalState/webrtc/actions";
import { useMeetingContext } from "../../utils/globalState/webrtc/webrtc-globalState";

function Alert(){

    const [state, dispatch] = useMeetingContext();

    useEffect(() => {
        let aT = setTimeout(() => {
            dispatch({type: HIDE_ALERTS});
        }, 2000);

        return () => {
            clearTimeout(aT);
        } 
    }, []);

    let meetingStyle = {
        position: "absolute",
        textAlign: "center",
        top: 0,
        left: 0
    };

    let alertStyle = "";
    switch("error"){
        case "error": 
            alertStyle = "alert-danger";
            break;
        case "warning": 
            alertStyle = "alert-warning";
            break;
        case "success": 
            alertStyle = "alert-success";
            break;
        default:
            alertStyle = "alert-info";
            break;
    }
    return (
        <div style={meetingStyle} className="meeting-alert p-2 m-auto" hidden={!state.showAlerts}>
            <div className={`text-center alert ${alertStyle}`} role="alert">
                {state.alertMsgs}
            </div>
        </div>
    );
}
export default Alert;
