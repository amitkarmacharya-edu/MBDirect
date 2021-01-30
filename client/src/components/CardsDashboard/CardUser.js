import React from "react";
import "./style.css";
import Row from "../Row";
import Col from "../Col";
import { Link } from "react-router-dom";
import * as FaIcons from 'react-icons/fa';
import * as BiIcons from 'react-icons/bi';

function CardUser(props) {
   
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
                <button id={props.userResults.id} value={props.userResults.id} onClick={props.deleteUser} className="btn btn-sm btn-danger" >
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
              <h5><BiIcons.BiUserPin/> {props.userResults.id} </h5>              
            </span>
            <span>
              <h5><BiIcons.BiMailSend/> {props.userResults.email}</h5> 
            </span>
            <span>
              <h5><BiIcons.BiPhoneCall/> {props.userResults.phone} </h5>              
            </span>
            <span>
              <h5><FaIcons.FaUserTag/> {props.userResults.type} </h5>              
            </span>
          </Col>
          <Col size="md-4">
            <span>
              <h5><FaIcons.FaPeriscope/> {props.userResults.address}</h5> 
            </span>
            <span>
              <h5><FaIcons.FaCity/> {props.userResults.city}, {props.userResults.state}, {props.userResults.zip_code}</h5> 
            </span>
            <span>
              <h5><FaIcons.FaGlobeAmericas/> {props.userResults.country}</h5> 
            </span>            
          </Col>
          <Col size="md-4">
              <img className="rounded-circle img-fluid " src="https://mdbootstrap.com/img/Photos/Avatars/img%20(31).jpg"
              data-holder-rendered="true"/>
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
