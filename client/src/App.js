import React from "react";
import Home from "./pages/Home/Home";
import { withRouter } from "react-router-dom";
import LoginRegister from "./pages/LoginRegister/LoginRegister";
import About from "./pages/About/About";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import DashboardHome from "./pages/Dashboard/DashboardHome";
import { Users } from "./pages/Dashboard/Users/Index";
import { Companies } from "./pages/Dashboard/Companies/Index";
import { Categories } from "./pages/Dashboard/Categories/Index";
import { Meets } from "./pages/Dashboard/Meets/Index";
import { Ads } from "./pages/Dashboard/Ads/Index";
import { ProtectedRoute } from "./protected.route";
import { Alert } from "../../client/src/components/AlertComponent/Alert";
import  MeetingRoom  from "../../client/src/components/MeetingRoom";
import IncomingCall from "../../client/src/components/IncomingCall";
import "bootstrap/dist/css/bootstrap.css";
import { MeetingProvider, useMeetingContext } from "./utils/globalState/webrtc/webrtc-globalState";
import { INCOMING_CALL, SHOW_ALERTS, CLOSE_MEETING } from "./utils/globalState/webrtc/actions";

function App({ match }) {


  const [state, dispatch] = useMeetingContext();

  function handleDialTone(data) {
    console.log("coming from handleDiatone inside Dashboard");
    console.log(data);
    dispatch({ type: INCOMING_CALL, data: data });
    console.log(state);
}

  function callGotRejected() {
    console.log("call got rejected by the business");
    dispatch({type: SHOW_ALERTS, errMsg: "Business is busy with another client."});
    dispatch({type: CLOSE_MEETING});
  }

  return (
    <>
    
      <Alert />
      <Router>
        <div className="App">
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
          <div>
            <Switch>
              <ProtectedRoute path="/dashboard" component={DashboardHome} />
              <ProtectedRoute path="/companies" component={Companies} />
              <ProtectedRoute path="/categories" component={Categories} />
              <ProtectedRoute path="/meets" component={Meets} />
              <ProtectedRoute path="/ads" component={Ads} />
              <ProtectedRoute path="/users" component={Users} />
              <Route exact path="/" component={Home} />
              <Route path="/login" component={LoginRegister} />
              <Route path="/about" component={About} />
            </Switch>
          </div>
        </div>
      </Router>
    </>
  );
}

export default withRouter(App);
