import React, { useEffect, useRef, useState } from "react";
import { SHOW_ALERTS } from "../../utils/globalState/webrtc/actions";
import Lobby from "../Lobby";
import InCall from "../InCall";
import CallSetup from "../CallSetup";
import ConnectingCall from "../ConnectingCall";
import Alert from "../Alert";
import Card from "react-bootstrap/Card";
import "./style.css";
import { useMeetingContext } from "../../utils/globalState/webrtc/webrtc-globalState";

function MeetingRoom(props) {

    const [state, dispatch] = useMeetingContext();
    const [minimized, setMinimized] = useState(false);

    const meetingRef = useRef();

    // initializes the app
    useEffect(() => {

        if (!state.roomId || !state.businessId) {
            clearTimeout(setTimeout(() => {
                dispatch({ type: SHOW_ALERTS, errMsg: "Need RoomId and businessID" });
            }, 2000));
        }
    }, []);

    const handleMeetingControls = (option) => {
        const meets = meetingRef.current;
        let updatedClass = "";
        if (option === "M") {
            updatedClass = "meeting-wrapper-minimize";
        } else if (option === "F") {
            updatedClass = "meeting-wrapper-full-screen";
        } else {
            updatedClass = "meeting-wrapper";
        }
        meets.className = "bg-dark shadow-lg rounded";
        meets.classList.add(updatedClass);
        setMinimized(option === "M" ? true : false);
    }

    const renderCurrentStage = Stage => {
        switch (Stage) {
            case "Lobby":
                return <Lobby {...props}/>
            case "CallSetup":
                return <CallSetup {...props}/>
            case "ConnectingCall":
                return <ConnectingCall {...props}/>
            case "InCall":
                return <InCall 
                            handleDialTone={props.handleDialTone}
                            callGotRejected={props.callGotRejected}
                            minimized={minimized}
                        />
            case "Feedback":
                return;
        }
    }
    return (
        <div ref={meetingRef} className="meeting-wrapper bg-dark shadow-lg rounded">
            <Card className="bg-dark shadow-none text-center h-100">
                <Card.Header className="text-white">
                    {state.currentStage === "Lobby" && <span>Customer Info</span>}
                    {state.currentStage === "CallSetup" && <span>Mirror</span>}
                    {state.currentStage === "InCall" && 
                        <div className="d-flex flex-wrap justify-content-sm-between justify-content-center flex-row">
                            <span className="btn text-white truncate">Meeting Room</span>
                            <div className="">
                                {/* full screen icon */}
                                <button className="btn text-white" onClick={() => handleMeetingControls("F")}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-fullscreen" viewBox="0 0 16 16">
                                        <path d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1h-4zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zM.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5z"/>
                                    </svg>
                                </button>
                                {/* normal icon */}
                                <button className="btn text-white" onClick={() => handleMeetingControls("N")}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-app" viewBox="0 0 16 16">
                                        <path d="M11 2a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3h6zM5 1a4 4 0 0 0-4 4v6a4 4 0 0 0 4 4h6a4 4 0 0 0 4-4V5a4 4 0 0 0-4-4H5z"/>
                                    </svg>
                                </button>
                                {/* minimize icone */}
                                <button className="btn text-white" onClick={() => handleMeetingControls("M")}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-down-right" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M8.636 12.5a.5.5 0 0 1-.5.5H1.5A1.5 1.5 0 0 1 0 11.5v-10A1.5 1.5 0 0 1 1.5 0h10A1.5 1.5 0 0 1 13 1.5v6.636a.5.5 0 0 1-1 0V1.5a.5.5 0 0 0-.5-.5h-10a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h6.636a.5.5 0 0 1 .5.5z"/>
                                        <path fillRule="evenodd" d="M16 15.5a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1 0-1h3.793L6.146 6.854a.5.5 0 1 1 .708-.708L15 14.293V10.5a.5.5 0 0 1 1 0v5z"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    }
                </Card.Header>
                <Card.Body className="position-relative d-flex overflow-hidden flex-column flex-wrap justify-content-between">
                    {state.showAlerts && <Alert />}
                    {renderCurrentStage(state.currentStage)}
                    {console.log("rerender")}
                </Card.Body>
            </Card>
        </div>
    );
}

export default MeetingRoom;