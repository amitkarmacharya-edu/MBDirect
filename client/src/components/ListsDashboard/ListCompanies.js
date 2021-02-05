import React from "react";
import "./style.css";

function ListCompanies(props) {
  let imageSRC ="";
  if(props.companyResults.logo){
    imageSRC = window.location.origin + "/" + props.companyResults.logo.substring(3);
  }
  console.log(props.companyResults);
      return (
            <tr key={props.companyResults.id} id={props.companyResults.id} onClick={props.handleDataBack}>  
            <td data-th="Id" data-id={props.companyResults.id} data-company={props.companyResults.name} data-userid={props.companyResults.UserId} className="name-cell align-middle">
                {props.companyResults.id}
              </td>            
              <td data-th="Name"  data-id={props.companyResults.id} data-company={props.companyResults.name} data-userid={props.companyResults.UserId} className="name-cell align-middle">
                {props.companyResults.name}
              </td>
              <td data-th="Description"  data-id={props.companyResults.id} data-company={props.companyResults.name} data-userid={props.companyResults.UserId} className="align-middle">
                {props.companyResults.description}
              </td>
              <td data-th="Email"  data-id={props.companyResults.id} data-company={props.companyResults.name} data-userid={props.companyResults.UserId} className="align-middle">                
                  {props.companyResults.email}
              </td>
              <td data-th="Phone"  data-id={props.companyResults.id} data-company={props.companyResults.name} data-userid={props.companyResults.UserId} className="align-middle">
                {props.companyResults.phone}
              </td>  
              
              <td data-th="Logo"  data-id={props.companyResults.id} data-company={props.companyResults.name} data-userid={props.companyResults.UserId} className="align-middle">
                <img
                  src={imageSRC}
                  className="img-responsive"
                  style={{width:"100%"}}
                  alt="companyImage"
                />
              </td>
            </tr>
  );
}

export default ListCompanies;