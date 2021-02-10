import React, { useEffect } from "react";
import { SHOW_ALERTS } from "../../utils/globalState/webrtc/actions";
import Lobby from "../Lobby";
import InCall from "../InCall";
import CallSetup from "../CallSetup";
import ConnectingCall from "../ConnectingCall";
import Alert from "../Alert";
import Card from "react-bootstrap/Card";
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
        // <div className="meeting-wrapper ml-auto overflow-auto">
        //     <div className="container">
        //         <div className="row">
        //             <div className="col-sm-10 col-md-8 m-auto border shadow rouded align-middle">
        //                 <div className="row">
        //                     <div className="col-12 meeting-room rounded bg-white">
        //                         {state.showAlerts && <Alert />}
        //                         {renderCurrentStage(state.currentStage)}
        //                         {console.log("rerender")}
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
        <div className="meeting-wrapper">
            <Card className="text-center shadow">
                <Card.Header >
                    {state.currentStage === "Lobby" && <span>Please provide your information</span>}
                    {state.currentStage === "CallSetup" && <span>Mirror</span>}
                    {state.currentStage === "InCall" && <span>Meeting Room</span>}
                </Card.Header>
                <Card.Body className="overflow-hidden position-relative h-100">
                    {state.showAlerts && <Alert />}
                    {renderCurrentStage(state.currentStage)}
                    {console.log("rerender")}
                </Card.Body>
            </Card>
        </div>
    );
}

export default MeetingRoom;