import React from "react";
import "./style.css";

function ListCompanies(props) {


  console.log(props.results);
      return (
            <tr key={props.key}>  
            <td data-th="Id" className="name-cell align-middle">
                {props.companyResults.id}
              </td>            
              <td data-th="Name" className="name-cell align-middle">
                {props.companyResults.name}
              </td>
              <td data-th="Description" className="align-middle">
                {props.companyResults.description}
              </td>
              <td data-th="Email" className="align-middle">                
                  {props.companyResults.email}
              </td>
              <td data-th="Phone" className="align-middle">
                {props.companyResults.phone}
              </td>  
              
              <td data-th="Image" className="align-middle">
                <img
                  src={props.companyResults.logo}
                  className="img-responsive"
                />
              </td>
            </tr>
  );
}

export default ListCompanies;