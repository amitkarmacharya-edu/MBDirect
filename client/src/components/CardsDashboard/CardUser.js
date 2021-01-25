import React from "react";
import "./style.css";
import Row from "../Row";
import Col from "../Col";

function CardUser(props) {
   
  return (
    
    <div className="card" >      
      <div className="card-header"><h3>{props.userResults.first_name} {props.userResults.last_name}</h3></div>
      <div className="card-body">
        <Row>
          <Col size="md-4">             
            <span><h5>Id: </h5>{props.userResults.id}</span>     
            <span><h5>Email: </h5>{props.userResults.email}</span>            
            <span><h5>Phone: </h5>{props.userResults.phone}</span>            
          </Col>   
          <Col size="md-4">
            <span><h5>Address: </h5> {props.userResults.address}, {props.userResults.city}, {props.userResults.state} {props.userResults.zipcode} - {props.userResults.country}</span>                
            <span><h5>Type </h5>{props.userResults.type}</span>            
          </Col>
          <Col size="md-4">
          {/* <img alt="Pic" src={props.userResults.image} className="img-fluid" /> */}
            {/* <div><h5>Company: </h5>{props.userResults.Companies[0].name}</div> 
            <img alt="Pic" src={props.userResults.Companies[0].logo} className="img-fluid" /> */}
          </Col>
        </Row>        
      </div>      
    </div>
  );
}

export default CardUser;
