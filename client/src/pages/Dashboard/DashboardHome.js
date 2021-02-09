import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Container from "../../components/Container";
import MeetingRoom from "../../components/MeetingRoom";
import IncomingCall from "../../components/IncomingCall";

import meap from "../../utils/webrtc/webrtc-meap";
import { CLOSE_MEETING, INCOMING_CALL, SAVE_USER_INFO, SET_USER_ID, SHOW_ALERTS } from "../../utils/globalState/webrtc/actions";
import { useMeetingContext } from "../../utils/globalState/webrtc/webrtc-globalState";

function DashboardHome() {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  const [state, dispatch] = useMeetingContext();

  useEffect(() => {
    // check for user id
    if (localStorage.getItem("UserId") && localStorage.getItem("Authenticated") === "true") {
      console.log("LocalStorage userId : " + localStorage.getItem("UserId"));
      meap.userId = localStorage.getItem("UserId");
      dispatch({type: SET_USER_ID, userId: localStorage.getItem("UserId")});
    }

    if (!meap.signalingChannel) {
      meap.createSocketConnection(handleDialTone, callGotRejected)
        .then(() => {
          console.log(meap);
        });
    }
  }, [])

  function handleDialTone(data) {
      console.log("coming from handleDiatone inside Dashboard");
        console.log(data);
        dispatch({ type: INCOMING_CALL, data: data });
        console.log(state);
        alert();
  }

  function callGotRejected() {
    console.log("call got rejected by the business");
    dispatch({type: SHOW_ALERTS, errMsg: "Business is busy with another client."});
    dispatch({type: CLOSE_MEETING});
  }

  function answerCall(remoteSocketID) {
    console.log("Business Answered call");
  }

  return (
    <>
      <Navbar sidebar={sidebar} isActive={showSidebar} />
      <Container
        sidebar={sidebar}
        isActive={showSidebar}
        style={{ marginTop: 30 }}
      >
        <div className="dashboardHome">
          <h1>Dashboard Home</h1>
        </div>
      </Container>

      {state.meetingStarted &&
        <MeetingRoom
          handleDialTone={handleDialTone}
          callGotRejected={callGotRejected}
        />}

      {state.showCallNotification &&
        <IncomingCall 
          handleDialTone={handleDialTone}
          callGotRejected={callGotRejected}
        />}
    </>
  );
}

export default DashboardHome;