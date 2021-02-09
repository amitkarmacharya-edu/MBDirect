import React from "react";
import Home from "./pages/Home/Home";
import { withRouter } from "react-router-dom";
import LoginRegister from "./pages/LoginRegister/LoginRegister";
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
import "bootstrap/dist/css/bootstrap.css";
import { MeetingProvider } from "./utils/globalState/webrtc/webrtc-globalState";

function App({ match }) {
  return (
    <MeetingProvider>
      <Alert />
      <Router>
        <div className="App">
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
            </Switch>
          </div>
        </div>
      </Router>
    </MeetingProvider>
  );
}

export default withRouter(App);
