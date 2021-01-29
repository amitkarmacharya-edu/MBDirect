import React from "react";
import "./style.css";
import CardUser from "../CardsDashboard/CardUser";
import CardCompany from "../CardsDashboard/CardCompany";
import { USERID } from "../../constants/apiConstants";

function SearchResults(props) {
  
  return (
    <>
      {console.log(props.userType)}
      {console.log(props.pageName)}
      {props.userType === "Admin" ? (
        <>
          {props.pageName === "Users" ? (
            <>
              {props.results.map((result) => (
                <CardUser
                  userResults={result}
                  key={result.id}
                  userType={props.userType}
                  deleteUser = {props.deleteUser}
                />
              ))}
            </>
          ) : (
            <>
              {props.pageName === "Companies" ? (
                <>
                  {console.log(props.results)}
                  {props.results.map((result) => (
                    <CardCompany
                      companyResults={result}
                      key={result.id}
                      userType={props.userType}
                      
                    />
                  ))}
                </>
              ) : (
                <>Add Code Here for other pages</>
              )}
            </>
          )}
        </>
      ) : (
        <>
          {props.pageName === "Users" ? (
            <>
              {props.results
                .filter(function (result) {
                  console.log(result.id);
                  console.log(parseInt(localStorage.getItem(USERID)));
                  return result.id === parseInt(localStorage.getItem(USERID));
                })
                .map(function (result) {
                  return (
                    <CardUser
                      userResults={result}
                      key={result.id}
                      userType={props.userType}
                    />
                  );
                })}
            </>
          ) : (
            <>
              {props.pageName === "Companies" ? (
                <>
                  {props.results
                .filter(function (result) {
                  console.log(result.UserId);
                  console.log(parseInt(localStorage.getItem(USERID)));
                  return result.UserId === parseInt(localStorage.getItem(USERID));
                })
                .map(function (result) {
                  return (
                    <CardCompany
                      companyResults={result}
                      key={result.id}
                      userType={props.userType}
                    />
                  );
                })}
                </>
              ) : (
                <>Add Code Here for other pages</>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}

export default SearchResults;
