import React from "react";
import "./style.css";
import CardUser from "../CardsDashboard/CardUser";
import { USERID } from "../../constants/apiConstants";

function SearchResults(props) {
  return (
    <>
      {console.log(props.userType)}
      {props.userType === "Admin" ? (
        <ul className="list-group search-results">
          {props.results.map((user) => (
            <li key={user.email} className="list-group-item">
            <CardUser userResults={user}                
            /> 
            </li> 
          ))}
        </ul>
      ) : (
        <ul className="list-group search-results">
          {props.results
            .filter(function (user) {
              console.log(user.id);
              console.log(parseInt(localStorage.getItem(USERID)));
              return user.id === parseInt(localStorage.getItem(USERID));
            })
            .map(function (user) {
              return (
                <li key={user.email} className="list-group-item">
                <CardUser userResults={user}                      
                  />
                </li>
              );
            })}
        </ul>
      )}      
    </>
  );
}

export default SearchResults;
