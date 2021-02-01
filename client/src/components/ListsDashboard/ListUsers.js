import React from "react";
import "./style.css";

function ListUsers(props) {
  
  console.log(props.results);
      return (
            <tr key={props.key}>  
            <td data-th="Id" className="name-cell align-middle">
                {props.userResults.id}
              </td>            
              <td data-th="Name" className="name-cell align-middle">
                {props.userResults.first_name} {props.userResults.last_name}
              </td>              
              <td data-th="Email" className="align-middle">                
                  {props.userResults.email}
              </td>
              <td data-th="Phone" className="align-middle">
                {props.userResults.phone}
              </td>                
              <td data-th="Image" className="align-middle">
                <img
                  src={props.userResults.logo}
                  className="img-responsive"
                />
              </td>
            </tr>
  );
}

export default ListUsers;