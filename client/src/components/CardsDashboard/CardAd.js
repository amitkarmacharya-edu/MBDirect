import React from "react";
import "./style.css";
import Row from "../Row";
import Col from "../Col";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import * as FaIcons from 'react-icons/fa';
import * as BiIcons from 'react-icons/bi';
import * as MdIcons from 'react-icons/md';
import * as TiIcons from 'react-icons/ti';
function CardAd(props) {
   
  return (
    <div className="card mb-3" id={props.adResults.id} key={props.adResults.key}>
      <div className="card-header">
        <Row>
          <Col size="md-10">
            <h3>
              {props.adResults.name}
            </h3>
          </Col>
          <Col size="md-2">
            {props.userType === "Admin" ? (
              <>                
                <Link
                  to={`edit/${props.adResults.id}`}
                  className="btn btn-sm btn-primary mr-1"
                >
                  Edit
                </Link>
                <button id={props.adResults.id} value={props.adResults.id} onClick={props.deleteAd} className="btn btn-sm btn-danger" >
                  Delete
                </button>
              </>
            ) : (
              <Link
                to={`edit/${props.adResults.id}`}
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
              <h5><BiIcons.BiUserPin/> {props.adResults.id} </h5>              
            </span>
            <span>
              <h5><MdIcons.MdDescription/> {props.adResults.description}</h5> 
            </span>
            <span>
              <h5><FaIcons.FaPercent/> Discount: {props.adResults.discount} </h5>              
            </span>
            <span>
              <h5><TiIcons.TiTickOutline/> {props.adResults.status} </h5>              
            </span>
          </Col>
          <Col size="md-4">
            <span>
              <h5><FaIcons.FaRegCalendarPlus/> {props.adResults.start_date}</h5> 
            </span>
            <span>
                <h5><FaIcons.FaRegCalendarMinus/> {props.adResults.end_date}</h5>
            </span>         
          </Col>
          <Col size="md-4">
              <img className="rounded-circle img-fluid " src={props.adResults.image}
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

export default CardAd;
