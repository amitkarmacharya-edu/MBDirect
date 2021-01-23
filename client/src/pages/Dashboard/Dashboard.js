import React from 'react';
import Navbar from "../../components/Navbar/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./Dashboard.css";
import DashboardHome from "./DashboardHome";
import Categories from "./Categories";
import Companies from "./Companies";
import Meets from "./Meets";
import Ads from "./Ads";



function Dashboard() {
    return (
        <>
            <Router>
                <Navbar />
                <Switch>
                    <Route path='/dashboardHome' exact component={DashboardHome} />
                    <Route path='/companies' component={Companies} />
                    <Route path='/categories' component={Categories} />
                    <Route path='/meets' component={Meets} />
                    <Route path='/ads' component={Ads} />
                </Switch>  
            </Router>  
        </>
    )
}

export default Dashboard
