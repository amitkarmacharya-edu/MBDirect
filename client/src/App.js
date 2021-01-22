import React from "react";
import Nav from "./components/Nav";
import Home from "./pages/Home/Home";
import RegistrationForm from "./pages/RegistrationForm/RegirtrationForm";
// import LoginForm from "./pages/LoginForm/LoginForm";
import LoginRegister from "./pages/LoginRegister/LoginRegister";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
      <Nav />
      </div>     
      <div className="App">        
          <div className="container d-flex align-items-center flex-column">
            <Switch>
              <Route exact path="/api/users" />
              <Route exact path="/register" component={RegistrationForm} />                
              <Route exact path="/login" >
                <LoginRegister />
              </Route>
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
