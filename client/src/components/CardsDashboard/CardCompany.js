import React,{ useState, useEffect } from "react";
import "./style.css";
import Row from "../Row";
import Col from "../Col";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as BiIcons from "react-icons/bi";
import * as MdIcons from "react-icons/md";
import * as TiIcons from "react-icons/ti";

function CardCompany(props) {
  const [caterogies, setCategories] = useState([]);

  useEffect(()=>{
    setCategories (props.categories);
  },[caterogies]);
  
  return (
    <div
      className="card mb-3"
      id={props.companyResults.id}
      key={props.companyResults.key}
    >
      <div className="card-header">
        <Row>
          <Col size="md-10">
            <h3>{props.companyResults.name}</h3>
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
                <button
                  id="delete"
                  id={props.companyResults.id}
                  value={props.companyResults.id}
                  onClick={props.deleteCompany}
                  className="btn btn-sm btn-danger"
                >
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
              <h5>
                <BiIcons.BiUserPin /> {props.companyResults.id}{" "}
              </h5>
            </span>
            <span>
              <h5>
                <MdIcons.MdDescription /> {props.companyResults.description}
              </h5>
            </span>
            <span>
              <h5>
                <BiIcons.BiMailSend /> {props.companyResults.email}
              </h5>
            </span>
            <span>
              <h5>
                <BiIcons.BiPhoneCall /> {props.companyResults.phone}
              </h5>
            </span>
            <span>
              <h5>
                <FaIcons.FaFax /> {props.companyResults.fax}
              </h5>
            </span>
          </Col>
          <Col size="md-4">
            <span>
              <h5>
                <FaIcons.FaPeriscope /> {props.companyResults.address}
              </h5>
            </span>
            <span>
              <h5>
                <FaIcons.FaCity /> {props.companyResults.city},{" "}
                {props.companyResults.state}, {props.companyResults.zip_code}
              </h5>
            </span>
            <span>
              <h5>
                <FaIcons.FaGlobeAmericas /> {props.companyResults.country}
              </h5>
            </span>
            <span>
              {caterogies.map((result) => (
                <>
                  {result.id === props.companyResults.CategoryId ? (
                    
                      <h5 key={result.id}>
                        <FaIcons.FaObjectGroup /> {result.name}
                      </h5>
                   
                  ) : (
                    <></>
                  )}
                </>
              ))}
             </span>
            <span>
              <h5>
                <TiIcons.TiTickOutline /> {props.companyResults.status}
              </h5>
            </span>
          </Col>
          <Col size="md-4">
            <img
              className="rounded-circle img-fluid "
              src={props.companyResults.logo}
              data-holder-rendered="true"
            />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default CardCompany;
