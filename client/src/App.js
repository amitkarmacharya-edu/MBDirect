import React from "react";
import Nav from "./components/Nav";
import Home from "./pages/Home/Home";
import LoginRegister from "./pages/LoginRegister/LoginRegister";
import "./App.css";
import DashboardHome from "./pages/Dashboard/DashboardHome";
import Categories from "./pages/Dashboard/Categories";
import Companies from "./pages/Dashboard/Companies";
import Meets from "./pages/Dashboard/Meets";
import Ads from "./pages/Dashboard/Ads";
import { ProtectedRoute } from "./protected.route";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { UserLayout } from "./pages/User/User";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <ProtectedRoute exact path="/app" component={UserLayout} />
          <ProtectedRoute exact path="/dashboard" component={DashboardHome}/>
          <ProtectedRoute exact path="/companies" component={Companies}/>
          <ProtectedRoute exact path="/categories" component={Categories}/>
          <ProtectedRoute exact path="/meets" component={Meets}/>
          <ProtectedRoute exact path="/ads" component={Ads}/>

          <div>
            <Nav />
            <div className="container d-flex align-items-center flex-column">
              <Route exact path="/" component={Home} />
              <Route exact path="/home" component={Home} />
              <Route exact path="/login">
                <LoginRegister />
              </Route>
            </div>
          </div>
          <Route path="*" component={() => "404 NOT FOUND"} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
