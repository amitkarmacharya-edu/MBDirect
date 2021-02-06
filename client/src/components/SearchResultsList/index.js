import React, { useState, useEffect } from "react";
import "./style.css";
import ListUsers from "../ListsDashboard/ListUsers";
import ListCompanies from "../ListsDashboard/ListCompanies";
import ListMeets from "../ListsDashboard/ListMeets";
import { USERID } from "../../constants/apiConstants";

function SearchResultsList(props) {
  const [headingsCompanies, setHeadingsCompanies] = useState([]);
  const [headingsUsers, setHeadingsUsers] = useState([]);
  const [headingsMeets, setHeadingsMeets] = useState([]);

  useEffect(() => {
    setHeadingsCompanies([
      { name: "Id", width: "5%" },
      { name: "Name", width: "10%" },
      { name: "Description", width: "20%" },
      { name: "Email", width: "20%" },
      { name: "Phone", width: "10%" },
      { name: "Image", width: "10%" },
    ]);
    setHeadingsUsers([
      { name: "Id", width: "5%" },
      { name: "Name", width: "10%" },
      { name: "Email", width: "20%" },
      { name: "Phone", width: "10%" },
      { name: "Image", width: "10%" },
    ]);
    setHeadingsMeets([
      { name: "Id", width: "5%" },
      { name: "Title", width: "10%" },
      { name: "Description", width: "20%" },
      { name: "Start_time", width: "10%" },
      { name: "End_time", width: "10%" },
      { name: "User", width: "10%" },
      { name: "Company", width: "10%" },
      { name: "Status", width: "10%" },
    ]);
  }, []);

  return (
    <>
      {console.log(props.userType)}
      {console.log(props.pageName)}
      {props.userType === "Admin" ? (
        <>
          {props.pageName === "Users" ? (
            <table
              id="table"
              className="table  table-striped table-hover table-condensed"
            >
              <thead>
                <tr>
                  {headingsUsers.map(({ name, width }) => {
                    return (
                      <th className="col" key={name} style={{ width }}>
                        {name.toUpperCase()}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {console.log(props.results)}
                {props.results.map((result) => (
                  <ListUsers
                    userResults={result}
                    key={result.id}
                    userType={props.userType}
                    handleDataBack={props.handleDataBack}
                  />
                ))}
              </tbody>
            </table>
          ) : (
            <>
              {props.pageName === "Companies" ? (
                <table
                  id="table"
                  className="table  table-striped table-hover table-condensed"
                >
                  <thead>
                    <tr>
                      {headingsCompanies.map(({ name, width }) => {
                        return (
                          <th className="col" key={name} style={{ width }}>
                            {name.toUpperCase()}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {console.log(props.results)}
                    {props.results.map((result) => (
                      <ListCompanies
                        companyResults={result}
                        keyList={result.id}
                        key={result.id}
                        userType={props.userType}
                      />
                    ))}
                  </tbody>
                </table>
              ) : (
                <>                
                  {props.pageName === "Meets" ? (
                    <table
                      id="table"
                      className="table table-striped table-hover table-condensed"
                    >
                      <thead>
                        <tr>
                          {headingsMeets.map(({ name, width }) => {
                            return (
                              <th className="col" key={name} style={{ width }}>
                                {name.toUpperCase()}
                              </th>
                            );
                          })}
                        </tr>
                      </thead>
                      <tbody>
                        {console.log(props.results)}
                        {props.results.map((result) => (
                          <ListMeets
                            meetResults={result}
                            key={result.id}
                            userType={props.userType}
                          />
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <>Add Code Here for other pages</>
                  )}
                
                </>
              )}
            </>
          )}
        </>
      ) : (
        <>
          {props.pageName === "Users" ? (
            <table
              id="table"
              className="table  table-striped table-hover table-condensed"
            >
              <thead>
                <tr>
                  {headingsUsers.map(({ name, width }) => {
                    return (
                      <th className="col" key={name} style={{ width }}>
                        {name.toUpperCase()}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {props.results
                  .filter(function (result) {
                    console.log(result.id);
                    console.log(parseInt(localStorage.getItem(USERID)));
                    return result.id === parseInt(localStorage.getItem(USERID));
                  })
                  .map(function (result) {
                    return (
                      <ListUsers
                        userResults={result}
                        key={result.id}
                        userType={props.userType}
                      />
                    );
                  })}
              </tbody>
            </table>
          ) : (
            <>
              {props.pageName === "Companies" ? (
                <table
                  id="table"
                  className="table  table-striped table-hover table-condensed"
                >
                  <thead>
                    <tr>
                      {headingsCompanies.map(({ name, width }) => {
                        return (
                          <th className="col" key={name} style={{ width }}>
                            {name.toUpperCase()}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {console.log(props.results)}
                    {props.results
                      .filter(function (result) {
                        console.log(result.UserId);
                        console.log(parseInt(localStorage.getItem(USERID)));
                        return (
                          result.UserId ===
                          parseInt(localStorage.getItem(USERID))
                        );
                      })
                      .map(function (result) {
                        return (
                          <ListCompanies
                            companyResults={result}
                            keyList={result.id}
                            key={result.id}
                            userType={props.userType}
                          />
                        );
                      })}
                  </tbody>
                </table>
              ) : (
                <>
                
                  {props.pageName === "Meets" ? (                    
                        <table
                          id="table"
                          className="table  table-striped table-hover table-condensed"
                        >
                          <thead>
                            <tr>
                              {headingsMeets.map(({ name, width }) => {
                                return (
                                  <th
                                    className="col"
                                    key={name}
                                    style={{ width }}
                                  >
                                    {name.toUpperCase()}
                                  </th>
                                );
                              })}
                            </tr>
                          </thead>
                          <tbody>
                            {console.log(props.results)}
                            {props.results
                              .filter(function (result) {
                                console.log(result.UserId);
                                console.log(
                                  parseInt(localStorage.getItem(USERID))
                                );
                                return (
                                  result.UserId ===
                                  parseInt(localStorage.getItem(USERID))
                                );
                              })
                              .map(function (result) {
                                return (
                                  <ListMeets
                                    meetResults={result}
                                    key={result.id}
                                    userType={props.userType}
                                  />
                                );
                              })}
                          </tbody>
                        </table>
                     
                  ) : (
                    <>Add Code Here for other pages</>
                  )}
                   
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}

export default SearchResultsList;
