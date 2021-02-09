import { CLOSE_MEETING, LOADING, SHOW_ALERTS, UPDATE_STAGE } from "../../utils/globalState/webrtc/actions";
import { useMeetingContext } from "../../utils/globalState/webrtc/webrtc-globalState";
import React, { useEffect, useRef, useState } from "react";
import meets from "../../utils/webrtc/webrtc-meap";
import API from "../../utils/API";
import "./style.css";
function CallSetup() {
    const [state, dispatch] = useMeetingContext();
    const [toggleVideoIcon, setToggleVideoIcon] = useState(true);
    const [disableStartButton, setDisableStartButton] = useState(false);
    const selfiCam = useRef();
    useEffect(() => {
    // setup meets connection
        let { userId, roomId, businessId } = state;
        console.log(userId, roomId, businessId);
        if(!userId || !roomId || !businessId){
            onerror("User ID, Room ID or Business Id was missing, Please try reconnecting");
            dispatch({
                type: UPDATE_STAGE,
                updatedStage: "Lobby",
                updatedStageIndex: state.currentStageIndex - 1
            });
        }
        meets.userId = userId;
        meets.roomId = roomId;
        meets.businessId = businessId;
        meets.isCallee = false;
        meets.userMediaConstraints = {audio: false, video: true};
        meets.selfiCam = selfiCam;
        console.log(meets.userMedia);
        loadCam();
        console.log("mounted component");
        // unmounting
        return () => {
            console.log("unmounting");
        };
    }, []);
    function loadCam() {
        if(meets.userMedia && meets.userMedia.localStream){
            meets.gotLocalStream();
            return;
        }
        // start video
        meets.setupUserMedia();
    }
    function handleCallCancel() {
        if (meets.userMedia){
            meets.userMedia.close();
            meets.userMedia = null;
        }
        API.leaveRoom({userId: state.userId, roomId: state.roomId});
        selfiCam.current.srcObject = null;
        dispatch({type: CLOSE_MEETING});
    }
    async function handleCallStart() {
        dispatch({type: LOADING});
        try {
            let res = await meets.createSocketConnection();
            selfiCam.current.srcObject = null;
            dispatch({
                type: UPDATE_STAGE,
                updatedStage: "InCall",
                updatedStageIndex: 2
            });
        } catch (err) {
            console.log(err);
            onerror(err);
        }
    }
    function handleVideoToggle() {
        if(!selfiCam.current.srcObject){
            return;
        }
        meets.userMedia.toggleVideo();
        console.log(!toggleVideoIcon);
        setToggleVideoIcon(!toggleVideoIcon);
    }
    function onerror(err) {
        console.log(err);
        dispatch({type: SHOW_ALERTS, errMsg: err});
    }
    return (
        <div className="row bg-dark h-100">
            <div className="col-12 p-2 h-100 w-100">
                <div className="video-playground">
                    <div className="video-container rounded">
                        <video id="selfi-cam" className="self-potrait" autoPlay playsInline ref={selfiCam}></video>
                        <p className="text-white p-1 text-center name">{state.lobby.firstName} {state.lobby.lastName}</p>
                    </div>
                </div>
                {/* controls */}
                <div className="col-12 controls text-center">
                    {/* Cancel Call */}
                    <button type="button" className="btn btn-secondary bg-danger w-25 px-1 mx-1" onClick={handleCallCancel}>
                        Cancel
                    </button>
                    {/* Start Call */}
                    <button type="button"
                    className="btn btn-secondary bg-success w-25 px-1 mx-1"
                    onClick={handleCallStart}
                    disabled={disableStartButton}
                    >
                        Start
                    </button>
                    {/* toggle video*/}
                    <button type="button" className="btn btn-secondary bg-white w-25 mx-1" onClick={handleVideoToggle}>
                        {
                            toggleVideoIcon === true
                            ?   // video on icon
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-camera-video text-success" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2V5zm11.5 5.175l3.5 1.556V4.269l-3.5 1.556v4.35zM2 4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H2z"/>
                                </svg>
                            :   // mute video icon
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-camera-video-off text-danger" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M10.961 12.365a1.99 1.99 0 0 0 .522-1.103l3.11 1.382A1 1 0 0 0 16 11.731V4.269a1 1 0 0 0-1.406-.913l-3.111 1.382A2 2 0 0 0 9.5 3H4.272l.714 1H9.5a1 1 0 0 1 1 1v6a1 1 0 0 1-.144.518l.605.847zM1.428 4.18A.999.999 0 0 0 1 5v6a1 1 0 0 0 1 1h5.014l.714 1H2a2 2 0 0 1-2-2V5c0-.675.334-1.272.847-1.634l.58.814zM15 11.73l-3.5-1.555v-4.35L15 4.269v7.462zm-4.407 3.56l-10-14 .814-.58 10 14-.814.58z"/>
                            </svg>
                        }
                    </button>
                </div>
            </div>
        </div>
    );
}
export default CallSetup;