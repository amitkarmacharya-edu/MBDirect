import React from "react";
import "./style.css";
import Row from "../Row";
import Col from "../Col";
import { Link } from "react-router-dom";
import API from "../../utils/API";

function CardUser(props) {

  const deleteUser = (e) => {
    e.preventDefault();
    API.deleteUser(e.target.id)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
  }

  return (
    <div className="card mb-3" id={props.userResults.id} key={props.userResults.key}>
      <div className="card-header">
        <Row>
          <Col size="md-10">
            <h3>
              {props.userResults.first_name} {props.userResults.last_name}
            </h3>
          </Col>
          <Col size="md-2">
            {props.userType === "Admin" ? (
              <>                
                <Link
                  to={`edit/${props.userResults.id}`}
                  className="btn btn-sm btn-primary mr-1"
                >
                  Edit
                </Link>
                <button id="delete" value={props.userResults.id} onClick={deleteUser} className="btn btn-sm btn-danger" >
                  Delete
                </button>
              </>
            ) : (
              <Link
                to={`edit/${props.userResults.id}`}
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
              {props.userResults.id}
            </span>
            <span>
              <h5>Email: </h5>
              {props.userResults.email}
            </span>
            <span>
              <h5>Phone: </h5>
              {props.userResults.phone}
            </span>
          </Col>
          <Col size="md-4">
            <span>
              <h5>Address: </h5> {props.userResults.address},{" "}
              {props.userResults.city}, {props.userResults.state}{" "}
              {props.userResults.zipcode} - {props.userResults.country}
            </span>
            <span>
              <h5>Type </h5>
              {props.userResults.type}
            </span>
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
