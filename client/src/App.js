import React from "react";
import Nav from "./components/Nav";
import Home from "./pages/Home/Home";
import LoginRegister from "./pages/LoginRegister/LoginRegister";
import "./App.css";

import { ProtectedRoute } from "./protected.route";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { UserLayout } from "./pages/User/User";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
          <div className="container d-flex align-items-center flex-column">         
            <Switch>
               <Route exact path="/" component={Home}/>
              <Route exact path="/login" >
                <LoginRegister />
              </Route>
              <ProtectedRoute exact path="/app" component={UserLayout}/>
              <Route path="*" component={()=> "404 NOT FOUND"}/>  
              <Route exact path={["/", "/home"]} >
                <Home />
              </Route>              
            </Switch>
        </div>
      </div>
    </Router>    
  );
}

export default App;
