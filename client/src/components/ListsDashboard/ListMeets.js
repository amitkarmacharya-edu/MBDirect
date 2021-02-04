import React, { useEffect, useState } from "react";
import "./style.css";
import API from "../../utils/API";


function ListMeets(props) {
  const title= props.meetResults.title;
  const [userName, setUserName] = useState();
  const [companyName, setCompanyName] = useState();

  useEffect(() => {
    getUserName(props.meetResults.UserId);
    getCompanyName(props.meetResults.CompanyId);
  }, [])
  
  function getUserName(Id) {
    API.getUser(Id).then((res) => {
      setUserName(res.data.first_name + " " + res.data.last_name);
    });
  }

  function getCompanyName(Id) {
    API.getCompany(Id).then((res) => {
      setCompanyName(res.data.name);
    });
  }

  // console.log(props.userResults);
      return (
            <tr key={props.meetResults.id}  id={props.meetResults.id} value={props.meetResults.id}>  
            <td data-th="Id" className="name-cell align-middle">
                {props.meetResults.id}
              </td>            
              <td data-th="Title" className="name-cell align-middle">
              {title}
              </td>              
              <td data-th="Description"  className="align-middle">                
                  {props.meetResults.description}
              </td>
              <td data-th="Start_time"   className="align-middle">
                {props.meetResults.start_time}
              </td> 
              <td data-th="End_time"   className="align-middle">
                {props.meetResults.end_time}
              </td>                
              <td data-th="User"  className="align-middle">
                {userName}
              </td>
              <td data-th="Company"  className="align-middle">
                {companyName}
              </td>
              <td data-th="Status"  className="align-middle">
                {props.meetResults.status}
              </td>
            </tr>
  );
}

export default ListMeets;