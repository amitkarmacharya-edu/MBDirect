import React from "react";
import API from "../../utils/API";
import { SET_USER_ID, SHOW_ALERTS, START_MEETING } from "../../utils/globalState/webrtc/actions";
import { useMeetingContext } from "../../utils/globalState/webrtc/webrtc-globalState";
import "./style.css";
function AudioIcon({businessId}){
    const [state, dispatch] = useMeetingContext();
    function startMeeting(){
        if(!businessId){
            dispatch({type: SHOW_ALERTS, alertMsg: "Unable to start the meeting, please try after some time"})
        }

        if(!state.userId){
            if(localStorage.getItem("UserId")) {
                dispatch({
                    type: START_MEETING,
                    userId: localStorage.getItem("Userid"),
                    businessId: businessId,
                    roomCreator: false,
                    meetingType: "audio",
                });
            } else {
                API.getMeetsId()
                .then(res => {
                    dispatch({
                        type: START_MEETING,
                        userId: res.data,
                        businessId: businessId,
                        roomCreator: false,
                        meetingType: "audio",
                    })
                })
                .catch(e => {
                    console.log(e);
                });
            }
        } else {
            dispatch({
                type: START_MEETING,
                userId: state.userId,
                businessId: businessId,
                roomCreator: false,
                meetingType: "audio",
            });
        } 
    }
    return (
        <span
        className="p-2 border icon-box"
        onClick={startMeeting}
        >Audio
            <i className="fa fa-phone icon mx-1 h-100" aria-hidden="true"></i>
        </span>
    );
}
export default AudioIcon;