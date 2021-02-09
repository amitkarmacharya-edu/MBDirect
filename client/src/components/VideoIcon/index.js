import React from "react";
import { SHOW_ALERTS, START_MEETING } from "../../utils/globalState/webrtc/actions";
import { useMeetingContext } from "../../utils/globalState/webrtc/webrtc-globalState";
import API from "../../utils/API";
import "./style.css";
function VideoIcon({businessId, roomId}){
    const [state, dispatch] = useMeetingContext();
    function startMeeting(){

        if(!businessId){
            dispatch({type: SHOW_ALERTS, alertMsg: "Unable to start the meeting, please try after some time"})
        }

        console.log(state.userId);
        if(!state.userId){
            console.log("no user Id");
            if(localStorage.getItem("UserId") && localStorage.getItem("Authenticated" === "true")) {
                dispatch({
                    type: START_MEETING,
                    userId: localStorage.getItem("UserId"),
                    businessId: businessId,
                    roomCreator: false,
                    meetingType: "video",
                });
            } else {
                API.getMeetsId()
                .then(res => {
                    dispatch({
                        type: START_MEETING,
                        userId: res.data,
                        businessId: businessId,
                        roomCreator: false,
                        meetingType: "video",
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
                meetingType: "video",
            });
        }
}
    return (
        <span
        className="p-2 border icon-box"
        onClick={startMeeting}
        >Video
        <i className="fa fa-video-camera icon" aria-hidden="true"></i>
        </span>
    );
}
export default VideoIcon;