import React from "react";
import Nav from "./components/Nav";
import Home from "./pages/Home/Home";
import LoginRegister from "./pages/LoginRegister/LoginRegister";
import "./App.css";
import Dashboard from "./pages/Dashboard/Dashboard";
import { ProtectedRoute } from "./protected.route";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { UserLayout } from "./pages/User/User";


const Routes = () => (
  <main>
    
         <Switch>
                <ProtectedRoute exact path="/app" component={UserLayout}/>
                <ProtectedRoute exact path="/dashboard" component={Dashboard}/>              
              <div>
                <Nav/>
                <div className="container d-flex align-items-center flex-column">       
                <Route exact path="/" component={Home}/> 
                <Route exact path="/home" component={Home}/>  
                <Route exact path="/login" >
                  <LoginRegister />
                </Route>
                </div>
              </div>               
              <Route path="*" component={()=> "404 NOT FOUND"}/>  
      
            </Switch>
     
  </main>
)



function App() {
  return (
    <Router>
      <div className="App">   
           <Routes />        
      </div>
    </Router>    
  );
}

export default App;
