import React from "react";
import {ACCESS_AUTHENTICATED} from "../../constants/apiConstants";
import API from "../../utils/API";

export const UserLayout = props => {
  return (
    <div>
      <h1>App Layout</h1>
      <button
        onClick={() => {   
            localStorage.setItem(ACCESS_AUTHENTICATED,"false"); 
            API.logout().then(function(response){
                props.history.push("/");
            })                      
        }}
      >
        Logout
      </button>
    </div>
  );
};
