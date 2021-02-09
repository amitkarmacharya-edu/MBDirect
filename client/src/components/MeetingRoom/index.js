import React, { useEffect } from "react";
import { LOADING, SHOW_ALERTS, UPDATE_STAGE, SET_USER_ID } from "../../utils/globalState/webrtc/actions";
import API from "../../utils/API";
import Alert from "../Alert";
import Lobby from "../Lobby";
import InCall from "../InCall";
import CallSetup from "../CallSetup";
import "./style.css";
import { useMeetingContext } from "../../utils/globalState/webrtc/webrtc-globalState";
function MeetingRoom() {
    const [state, dispatch] = useMeetingContext();
    // initializes the app
    useEffect(() => {
        if(!state.roomId || !state.businessId){
            clearTimeout(setTimeout(() => {
                dispatch({type: SHOW_ALERTS, error: {type: "danger", msg: "Need RoomId and businessID"}});
            }, 2000));
        }
        // get user Id if the user doesn't have
        // a userId when they join the room
        (async() => {
            if(!state.userId){
                const res = await API.getUserId();
                dispatch({type: SET_USER_ID, userId: res.data});
            }
        })()
    },[]);
    const renderCurrentStage = Stage => {
        switch(Stage){
            case "Lobby":
                return <Lobby />
            case "CallSetup":
                return <CallSetup />
            case "InCall":
                return <InCall />
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