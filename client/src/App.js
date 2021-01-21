import React , { useState }from "react";
// import Axios from 'axios';
import API from './utils/API';
// import Books from "./pages/Books";
// import Nav from "./components/Nav";

function App() {
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerFirstName, setRegisterFirstName] = useState("");
  const [registerLastName, setRegisterLastName] = useState("");

  const register = () => {
    API.registerUser({
        first_name: registerFirstName,
        last_name: registerLastName,
        email: registerUsername,
        password: registerPassword    
    }).then((res)=> console.log(res));
  };

  
  const login = () => {
    API.login({     
      email: loginUsername,
      password: loginPassword    
  }).then((res)=> console.log(res));
  };

  const logout = () => {
    API.logout({}).then((res)=> console.log("User has logged out"));
  };

  const getusers = () => {
    API.getUsers({}).then((res)=> console.log(res));    
  };

  return (
    <div className="App">
      <div>
        <h1>Register</h1>
        <input placeholder='first_name' onChange={e=> setRegisterFirstName(e.target.value)}/>
        <input placeholder='last_name' onChange={e=> setRegisterLastName(e.target.value)}/>
        <input placeholder='email' onChange={e=> setRegisterUsername(e.target.value)}/>        
        <input placeholder='password' onChange={e=> setRegisterPassword(e.target.value)}/>  
        <button onClick={register}>Submit</button>      
      </div>
      <div>
        <h1>Login</h1>
        <input placeholder='username' onChange={e=> setLoginUsername(e.target.value)}/>
        <input placeholder='password' onChange={e=> setLoginPassword(e.target.value)}/>  
        <button onClick={login}>Submit</button>      
      </div>
      <div>
        <h1>Get User</h1>       
        <button onClick={getusers}>Submit</button>      
      </div>
      <div>
        <h1>Logout</h1>       
        <button onClick={logout}>Submit</button>      
      </div>
    
    </div>
  );
}

export default App;
