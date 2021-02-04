import React, { useState } from "react";
import "./LoginRegister.css";
import { Link } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import API from "../../utils/API";
import {ACCESS_AUTHENTICATED, USERID} from "../../constants/apiConstants";
import { alertService } from "../../services";


function LoginRegister(props) {
      const [state, setState] = useState({
        first_name: "",
        last_name: "",
        email : "",
        password : "",
        confirmPass: "",
        successMessage: null
    })

    const [stateLogin, setStateLogin] = useState({
      username: "",
      passwordLogin: "",    
      successMessageLogin: null
    });
  

    const handleChange = (e) => {
      const {id, value} = e.target
      setState(prevState => ({
          ...prevState,
          [id] : value
      }))
    }

    const handleChangeLogin = (e) => {
      const { id, value } = e.target;
      setStateLogin((prevStateLogin) => ({
        ...prevStateLogin,
        [id]: value,
      }));
    };


    const registerUser = () => {
      if(state.email.length && state.password.length && state.first_name && state.last_name) {
          const payload={
              "first_name": state.first_name,
              "last_name": state.last_name,
              "email":state.email,
              "password":state.password,
              "type":"Owner"
          }
          API.registerUser(payload)
             .then(function (response) {
                  if(response.status === 200){
                      setState(prevState => ({
                          ...prevState,
                          successMessage : 'Registration successful. Redirecting to dashboard..'
                      }))
                      localStorage.setItem(ACCESS_AUTHENTICATED,"true");
                      localStorage.setItem(USERID, response.data.id);                      
                      redirectToHome();   
                  } 
              })
              .catch(function (error) {
                alertService.error(error.response.data.errors[0].message);
                console.log(error.response.data.errors[0].message);
              });
      } else {
         alertService.error('Please enter valid username and password');    
      }      
    }
    
    const loginUser = (e) => {
      e.preventDefault();
      const payload = {
        email: stateLogin.username,
        password: stateLogin.passwordLogin,
      };
      API.login(payload)
        .then(function (response) {
          if (response.status === 200) {
            setStateLogin((prevStateLogin) => ({
              ...prevStateLogin,
              successMessageLogin: "Login successful. Redirecting to dashboard.."            
            }));  
            localStorage.setItem(ACCESS_AUTHENTICATED,"true");
            localStorage.setItem(USERID, response.data.id);                       
            redirectToHome();           
          }
        })
        .catch(function (error) {
          alertService.error("Username or password is invalid. User: " + error.response.data);
        });
    };
    const redirectToHome = () => {    
      alertService.success("Login/Register Successfully", { keepAfterRouteChange: true });  
      props.history.push("/dashboard");
    };

    const handleSubmitClick = (e) => {
      e.preventDefault();
      if(state.password === state.confirmPass) {
        registerUser();    
      } else {
          alertService.error('Passwords do not match');
      }
  }

    const [registrationFormStatus, setRegistartionFormStatus] = useState(false);
    const loginProps = useSpring({ 
        left: registrationFormStatus ? -500 : 0, // Login form sliding positions    
      });
      const registerProps = useSpring({
        left: registrationFormStatus ? 0 : 500, // Register form sliding positions     
      });    
      const loginBtnProps = useSpring({
        borderBottom: registrationFormStatus 
          ? "solid 0px transparent"
          : "solid 2px red",  //Animate bottom border of login button
      });
      const registerBtnProps = useSpring({
        borderBottom: registrationFormStatus
          ? "solid 2px red"
          : "solid 0px transparent", //Animate bottom border of register button
      });    
      function registerClicked() {
        setRegistartionFormStatus(true);
      }
      function loginClicked() {
        setRegistartionFormStatus(false);
      }
      return (
        <div className="container-login">
           <div className="login-register-wrapper">
            <div className="nav-buttons">
              <animated.button
                onClick={loginClicked}
                id="loginBtn"
                style={loginBtnProps}
              >
                Login
              </animated.button>
              <animated.button
                onClick={registerClicked}
                id="registerBtn"
                style={registerBtnProps}
              >
                Register
              </animated.button>
            </div>
            <div className="form-group" >
              <animated.form action="" id="loginform" style={loginProps}>
                {/* <LoginForm /> */}
                <React.Fragment>
                  <label htmlFor="username">USERNAME</label>
                  <input type="text" id="username" value={stateLogin.email} onChange={handleChangeLogin}/>
                  <label htmlFor="passwordLogin">PASSWORD</label>
                  <input type="password" id="passwordLogin" value={stateLogin.password} onChange={handleChangeLogin}/>
                  <input type="submit" value="submit" className="submit" onClick={loginUser} />
                </React.Fragment>
              </animated.form>
              <animated.form action="" id="registerform" style={registerProps}>
                {/* <RegisterForm /> */}
                <React.Fragment>
                  <label htmlFor="first_name">first name</label>
                  <input type="text" id="first_name" value={state.first_name} onChange={handleChange}/>
                  <label htmlFor="last_name">last name</label>
                  <input type="text" id="last_name" value={state.last_name} onChange={handleChange}/>
                  <label htmlFor="email">email</label>
                  <input type="text" id="email" value={state.email} onChange={handleChange}/>
                  <label htmlFor="password">password</label>
                  <input type="password" id="password" value={state.password} onChange={handleChange}/>
                  <label htmlFor="confirmPass">Confirm Password</label>
                  <input type="password" id="confirmPass" value={state.confirmPass} onChange={handleChange}/>                  
                  <input type="submit" value="submit" className="submit" onClick={handleSubmitClick}/>
                </React.Fragment>
              </animated.form>
            </div>
            <animated.div className="forgot-panel" style={loginProps}>
              <Link to="/">Home page</Link>
          </animated.div>
          </div>
          </div>        
      );
    }    
export default LoginRegister;