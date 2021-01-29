import React from "react";
import Nav from "./components/Nav";
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

function App({ match }) {
  // const { path } = match;
  return (
    <Router>
      <div className="App">
        <div>
          <Switch>
            <ProtectedRoute path="/dashboard" component={DashboardHome} />
            <ProtectedRoute path="/companies" component={Companies} />
            <ProtectedRoute path="/categories" component={Categories} />
            <ProtectedRoute path="/meets" component={Meets} />
            <ProtectedRoute path="/ads" component={Ads} />
            {/* <ProtectedRoute exact path="/users" component={User} /> */}
            <ProtectedRoute path="/users" component={Users} />
            {/* <Route exact path="/users/add" component={AddEditUser} />
              <Route exact path="/users/edit/:id" component={AddEditUser} /> */}
            <React.Fragment>
              <Nav />
              <div className="container d-flex align-items-center flex-column">
                <Route exact path="/" component={Home} />
                <Route path="/login" component={LoginRegister} />
              </div>
            </React.Fragment>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default withRouter(App);
