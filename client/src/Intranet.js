import React from "react";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";
import DashboardHome from "./pages/Dashboard/DashboardHome";
import Categories from "./pages/Dashboard/Categories";
import Companies from "./pages/Dashboard/Companies";
import Meets from "./pages/Dashboard/Meets";
import Ads from "./pages/Dashboard/Ads";
import { Users } from "./pages/Dashboard/Users/Index";
import { ProtectedRoute } from "./protected.route";
import { BrowserRouter as Router, Switch, withRouter } from "react-router-dom";


function Intranet({match}) {
    const { path } = match;
  return (
    <Router>
    <div className="Intranet">     
        
          <div>
            {/* Nav and container HERE */}
            <Navbar/>
            <div className="container d-flex align-items-center flex-column">
            <Switch>
                <React.Fragment>
              <ProtectedRoute path={`${path}/dashboard`} component={DashboardHome}/>
              <ProtectedRoute path="/companies" component={Companies} />
              <ProtectedRoute path="/categories" component={Categories} />
              <ProtectedRoute path="/meets" component={Meets} />
              <ProtectedRoute path="/ads" component={Ads} />
              {/* <ProtectedRoute exact path="/users" component={User} /> */}
              <ProtectedRoute path="/users" component={Users} />
              {/* <Route exact path="/users/add" component={AddEditUser} />
              <Route exact path="/users/edit/:id" component={AddEditUser} /> */}
            </React.Fragment>
            </Switch>
            </div>
          </div>
       
      
    </div>
    </Router>
  );
}

export default withRouter(Intranet);