import React, { useEffect } from "react";
import Header from "../../components/Header";
import Main from "../../components/Main";
import Footer from "../../components/Footer";
import Jumbo from "../../components/Jumbo";
import IncomingCall from "../../components/IncomingCall";
import MeetingRoom from "../../components/MeetingRoom";
import { SHOW_ALERTS, CLOSE_MEETING } from "../../utils/globalState/webrtc/actions";
import { useMeetingContext } from "../../utils/globalState/webrtc/webrtc-globalState";
import meap from "../../utils/webrtc/webrtc-meap";
import "bootstrap/dist/css/bootstrap.css";

function Home() {

  const [state, dispatch] = useMeetingContext();

  function callGotRejected() {
    console.log("call got rejected by the business");
    dispatch({type: SHOW_ALERTS, errMsg: "Business is busy with another client."});
    dispatch({type: CLOSE_MEETING});
  }

  return (
    <>
      <Header />
      <Jumbo />
      <Main />
      {state.meetingStarted && <MeetingRoom 
          callGotRejected={callGotRejected}
          />}
      {state.showCallNotification && <IncomingCall />}

      <Footer />
    </>
  );
}

export default Home;
