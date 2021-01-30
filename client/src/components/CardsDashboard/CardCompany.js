import React from "react";
import "./style.css";
import Row from "../Row";
import Col from "../Col";
import { Link } from "react-router-dom";

function CardCompany(props) {


  return (
    <div className="card mb-3" id={props.companyResults.id} key={props.companyResults.key}>
      <div className="card-header">
        <Row>
          <Col size="md-10">
            <h3>
              {props.companyResults.name}
            </h3>
          </Col>
          <Col size="md-2">
            {props.userType === "Admin" ? (
              <>                
                <Link
                  to={`edit/${props.companyResults.id}`}
                  className="btn btn-sm btn-primary mr-1"
                >
                  Edit
                </Link>
                <button id="delete" id={props.companyResults.id} value={props.companyResults.id} onClick={props.deleteCompany} className="btn btn-sm btn-danger" >
                  Delete
                </button>
              </>
            ) : (
              <Link
                to={`edit/${props.companyResults.id}`}
                className="btn btn-sm btn-primary mr-1"
              >
                Edit
              </Link>
            )}
          </Col>
        </Row>
      </div>
      <div className="card-body">
        <Row>
          <Col size="md-4">
            <span>
              <h5>Id: </h5>
              {props.companyResults.id}
            </span>
            <span>
              <h5>Description: </h5>
              {props.companyResults.description}
            </span>
            <span>
              <h5>Email: </h5>
              {props.companyResults.email}
            </span>
            <span>
              <h5>Phone: </h5>
              {props.companyResults.phone}
            </span>
            <span>
              <h5>Fax: </h5>
              {props.companyResults.fax}
            </span>
          </Col>
          <Col size="md-4">
            <span>
              <h5>Address: </h5> {props.companyResults.address},{" "}
              {props.companyResults.city}, {props.companyResults.state}{" "}
              {props.companyResults.zipcode} - {props.companyResults.country}
            </span>
            <span>
              <h5>Category </h5>
              {props.companyResults.CategoryId}
            </span>
            <span>
              <h5>Status </h5>
              {props.companyResults.type}
            </span>
          </Col>
          <Col size="md-4">
            <img alt="Pic" src={props.companyResults.logo} className="img-fluid" />            
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default CardCompany;
