import React, { useEffect, useState } from "react";
import "./style.css";
// import API from "../../utils/API";


function ListMeets(props) {
  const title= props.meetResults.title;
  useEffect(() => {
 
  }, [])  
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
              <td data-th="Guest"  className="align-middle">
                {props.meetResults.first_name} {props.meetResults.last_name}
              </td>
              <td data-th="Company"  className="align-middle">
                {props.meetResults.name}
              </td>
              <td data-th="Status"  className={props.meetResults.status === "Active" ? "align-middle text-success" : "align-middle text-danger"} >
                {props.meetResults.status}
              </td>
            </tr>
  );
}

export default ListMeets;