import React from "react";
import { SHOW_ALERTS, START_MEETING } from "../../utils/globalState/webrtc/actions";
import { useMeetingContext } from "../../utils/globalState/webrtc/webrtc-globalState";
import "./style.css";
function VideoIcon({businessId, roomId}){
    const [state, dispatch] = useMeetingContext();
    function startMeeting(){
        if(!businessId){
            dispatch({type: SHOW_ALERTS, alertMsg: "Unable to start the meeting, please try after some time"})
        }
        dispatch({
            type: START_MEETING,
            roomId: roomId,
            businessId: businessId,
            roomCreator: false,
            meetingType: "video",
        })
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