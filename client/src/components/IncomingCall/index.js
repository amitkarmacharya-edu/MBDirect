import React, { useEffect, useRef, useState } from "react";
import { REJECT_CALL, ACCEPT_CALL } from "../../utils/globalState/webrtc/actions";
import { useMeetingContext } from "../../utils/globalState/webrtc/webrtc-globalState";
import meap from "../../utils/webrtc/webrtc-meap";
import sound from "./ting.mp3";
import "./style.css";

function IncomingCall() {

    const [state, dispatch] = useMeetingContext();
    // const [ting, setting] = useState(false);
    const audioRef = useRef();

    useEffect(() => {    
        console.log(state);    
        console.log("mounting Incoming call component")
        console.log(meap);
        return () => {
            console.log("unmounting Incoming call component");
        }
    }, []);


    function handleRejectCall(remoteSocketId) {
        // send message to server to close the socket connection with the remoteuser/socket
        dispatch({
            type: REJECT_CALL,
            remoteSocketId: remoteSocketId
        });
        meap.signalingChannel.rejectCall(remoteSocketId);
    }

    function handleAnswerCall(remoteSocketId, meetingType) {

        console.log(state);
        console.log(state.meetingType);
        console.log(state.remoteSocketId);
        console.log(meetingType);
        console.log(remoteSocketId);

        
        meap.signalingChannel.remoteSocketId = remoteSocketId;
        dispatch({
            type: ACCEPT_CALL,
            call: {
                remoteSocketId: remoteSocketId,
                meetingType: meetingType
            }
        });
    }

    return (
        <div className="incoming-call-container d-flex flex-column align-items-end calTimepickerp-2 m-3 rounded">
             <audio ref={audioRef} autoPlay>
                <source src={sound}></source>
             </audio>
            {
                state.callNotification.map((call, index) => {
                   
                    // calls
                    return (
                        <div key={index} className="m-1 p-1 border d-flex no-wrap rounded bg-white shadow">
                            <span className="btn">{`${call.userInfo.firstName} ${call.userInfo.lastName}`}</span>

                            <button type="button" className="btn btn-secondary bg-danger text-white px-4" onClick={() => handleRejectCall(call.remoteSocketId)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telephone-x" viewBox="0 0 16 16">
                                    <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                                    <path fillRule="evenodd" d="M11.146 1.646a.5.5 0 0 1 .708 0L13 2.793l1.146-1.147a.5.5 0 0 1 .708.708L13.707 3.5l1.147 1.146a.5.5 0 0 1-.708.708L13 4.207l-1.146 1.147a.5.5 0 0 1-.708-.708L12.293 3.5l-1.147-1.146a.5.5 0 0 1 0-.708z" />
                                </svg>
                            </button>
                            {/* answer call */}
                            <button type="button" className="btn btn-secondary bg-success text-white px-4" onClick={() => handleAnswerCall(call.remoteSocketId,call.meetingType)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telephone" viewBox="0 0 16 16">
                                    <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                                </svg>
                            </button>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default IncomingCall;