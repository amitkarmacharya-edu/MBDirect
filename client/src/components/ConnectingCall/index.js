import React, { useEffect, useState } from "react";
import { CLOSE_MEETING, SHOW_ALERTS, UPDATE_STAGE } from "../../utils/globalState/webrtc/actions";
import { useMeetingContext } from "../../utils/globalState/webrtc/webrtc-globalState";
import meap from "../../utils/webrtc/webrtc-meap";

function ConnectingCall() {

    const [state, dispatch] = useMeetingContext();

    useEffect(() => {
        console.log("mounting Connecting call");
        console.log(meap);
        // setting the call back when call is connected
        if(!meap.isConnectedCB){
            meap.isConnectedCB = isConnectedCB;
        }
        setup();

            return () => {
                console.log("unmounting Connecting Call");
            };
    },[]);

    function setup(){

        meap.isConnectedCB = isConnectedCB;

        if(!meap.signalingChannel && !meap.signalingChannel.socket){
            dispatch({type: SHOW_ALERTS, errMsg: "No socket connection please, try reconnecting"});
            dispatch({type: CLOSE_MEETING});
            return;
        }

        console.log(meap.userMedia);
        if (!meap.userMedia){
            meap.setupUserMedia()
                .then(() => {
                    console.log(meap.userMedia.haveLocalStream);
                    console.log(meap.userMedia.getLocalStream());
                });
        }

        if(meap.signalingChannel.socket && state.remoteSocketId) {
            peerConnected();
        }

        console.log(state);
        if(!state.remoteSocketId){
            meap.joinSocketRoom({userInfo: state.lobby, meetingType: state.meetingType});
        }

    }

    function isConnectedCB() { 
        alert();

        dispatch({
            type: UPDATE_STAGE,
            updatedStage: "InCall",
            updatedStageIndex: 3
        });
    }

    function peerConnected() {
        dispatch({
            type: UPDATE_STAGE, 
            updatedStage: "InCall",
            updateStageIndex: 3
        });
    }   

    function handleCallCancel() {

        if(localStorage.getItem("Authenticated") === true){
            meap.closeUserMedia();
            meap.closePeerConnection();
        } else {
            meap.closeMeeting();
        }
        dispatch({type: CLOSE_MEETING});
    }

    return(
        <div className="row">
            <div style={{height: "50vh", width: "100%"}} 
                className="col-12 p-2 bg-dark d-flex align-items-center flex-column">
                <div className="mt-3">
                    <h5 className="text-center">Connecting</h5>
                </div>
                <div className="my-auto">
                    <img src="https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg" className="img-fluid" />
                    <h5 className="text-center">Company Name</h5>
                </div>
                <div className="mb-3 text-center">
                    {/* end call */}
                    <button type="button" className="btn btn-secondary bg-dark text-danger text-center px-4 w-25" onClick={handleCallCancel}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telephone-x" viewBox="0 0 16 16">
                            <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
                            <path fillRule="evenodd" d="M11.146 1.646a.5.5 0 0 1 .708 0L13 2.793l1.146-1.147a.5.5 0 0 1 .708.708L13.707 3.5l1.147 1.146a.5.5 0 0 1-.708.708L13 4.207l-1.146 1.147a.5.5 0 0 1-.708-.708L12.293 3.5l-1.147-1.146a.5.5 0 0 1 0-.708z"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConnectingCall;