import React from "react";
import "./style.css";

function ListUsers(props) {
  const fullName= props.userResults.first_name + " " + props.userResults.last_name;
  let imageSRC ="";
  if(props.userResults.image){
    imageSRC = window.location.origin + "/" + props.userResults.image.substring(3);
  } else {
    imageSRC = window.location.origin + "/images/no-image.png";
  }    
      return (
            <tr key={props.userResults.id}  id={props.userResults.id} value={props.userResults.id}  onClick={props.handleDataBack}>  
            <td data-th="Id" data-id={props.userResults.id} data-user={fullName}  className="name-cell align-middle">
                {props.userResults.id}
              </td>            
              <td data-th="Name" data-id={props.userResults.id} data-user={fullName} className="name-cell align-middle">
              {fullName}
              </td>              
              <td data-th="Email"  data-id={props.userResults.id} data-user={fullName}  className="align-middle">                
                  {props.userResults.email}
              </td>
              <td data-th="Phone" data-id={props.userResults.id} data-user={fullName} className="align-middle">
                {props.userResults.phone}
              </td>                
              <td data-th="Image" data-id={props.userResults.id} data-user={fullName} className="align-middle">
                <img
                  src={imageSRC}
                  style={{width:"100%"}}
                  className="img-responsive"
                  alt="userImage"
                />
              </td>
            </tr>
  );
}

export default ListUsers;