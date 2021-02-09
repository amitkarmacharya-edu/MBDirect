import React, { useEffect } from "react";
import { SHOW_ALERTS } from "../../utils/globalState/webrtc/actions";
import Lobby from "../Lobby";
import InCall from "../InCall";
import CallSetup from "../CallSetup";
import ConnectingCall from "../ConnectingCall";
import Alert from "../Alert";
import "./style.css";
import { useMeetingContext } from "../../utils/globalState/webrtc/webrtc-globalState";

function MeetingRoom({props}) {

    const [state, dispatch] = useMeetingContext();

    // initializes the app
    useEffect(() => {

        if (!state.roomId || !state.businessId) {
            clearTimeout(setTimeout(() => {
                dispatch({ type: SHOW_ALERTS, errMsg: "Need RoomId and businessID" });
            }, 2000));
        }
    }, []);


    const renderCurrentStage = Stage => {
        switch (Stage) {
            case "Lobby":
                return <Lobby {...props}/>
            case "CallSetup":
                return <CallSetup {...props}/>
            case "ConnectingCall":
                return <ConnectingCall {...props}/>
            case "InCall":
                return <InCall {...props} />
            case "Feedback":
                return;
        }
    }
    return (
        <div className="meeting-wrapper container-fluid overflow-auto">
            <div className="container-md">
                <div className="row">
                    <div className="col-sm-10 col-md-8 m-auto border shadow rouded align-middle">
                        <div className="row">
                            <div className="col-12 meeting-room rounded bg-white">
                                {state.showAlerts && <Alert />}
                                {renderCurrentStage(state.currentStage)}
                                {console.log("rerender")}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default MeetingRoom;