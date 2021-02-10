import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router} from "react-router-dom";
import { MeetingProvider } from "./utils/globalState/webrtc/webrtc-globalState";

ReactDOM.render(
  <MeetingProvider>
      <Router>
      <App/>
    </Router>
  </MeetingProvider>
  ,
  document.getElementById("root")
);
