import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import Row from "../Row";
import Col from "../Col";

function SearchForm(props) {
  const style = { width: "100%", height: "auto", overflow: "hidden" };
  return (
    <form className="search" style={style}>
      {/* <h1>{props.pageName}</h1> */}
      {props.pageName === "Users" ? (
        <>
          {/* <Link to={`users/add`} className="btn btn-sm btn-success mb-2">
            Add User
          </Link> */}
          <div className="form-group">
            <Row>
              <Col size="md-9">
                <label htmlFor="user">Search by User Name:</label>
                <input
                  onChange={props.handleInputChange}
                  name="user"
                  type="text"
                  className="form-control"
                  placeholder="Type User Name to Search"
                  id="user"
                />
              </Col>
              <Col size="md-3">
                <label htmlFor="sortOptions">Sort by:</label>
                <select
                  id="sortOptions"
                  onChange={props.sortBy}
                  className="form-control"
                  style={{ height: "29px", padding: "2px" }}
                >
                  <option value="A-Z">A-Z</option>
                  <option value="Z-A">Z-A</option>
                </select>
              </Col>
            </Row>
          </div>
        </>
      ) : (
        <>
          {props.pageName === "Companies" ? (
            <>
              <Link
                to={`companies/add`}
                className="btn btn-sm btn-success mb-2"
              >
                Add Company
              </Link>
              <div className="form-group">
                <Row>
                  <Col size="md-9">
                    <label htmlFor="company">Search by Company Name:</label>
                    <input
                      onChange={props.handleInputChange}
                      name="company"
                      type="text"
                      className="form-control"
                      placeholder="Type Company Name to Search"
                      id="company"
                    />
                  </Col>
                  <Col size="md-3">
                    <label htmlFor="sortOptions">Sort by:</label>
                    <select
                      id="sortOptions"
                      onChange={props.sortBy}
                      className="form-control"
                      style={{ height: "29px", padding: "2px" }}
                    >
                      <option value="A-Z">A-Z</option>
                      <option value="Z-A">Z-A</option>
                    </select>
                  </Col>
                </Row>
              </div>
            </>
          ) : (
            <>
              {props.pageName === "Ads" ? (
                <>
                  {/* <Link to={`ads/add`} className="btn btn-sm btn-success mb-2">
                    Add Advertisment
                  </Link> */}
                  <div className="form-group">
                    <Row>
                      <Col size="md-9">
                        <label htmlFor="ad">Search by Advertisment Name:</label>
                        <input
                          onChange={props.handleInputChange}
                          name="ad"
                          type="text"
                          className="form-control"
                          placeholder="Type Advertisment Name to Search"
                          id="ad"
                        />
                      </Col>
                      <Col size="md-3">
                        <label htmlFor="sortOptions">Sort by:</label>
                        <select
                          id="sortOptions"
                          onChange={props.sortBy}
                          className="form-control"
                          style={{ height: "29px", padding: "2px" }}
                        >
                          <option value="A-Z">A-Z</option>
                          <option value="Z-A">Z-A</option>
                        </select>
                      </Col>
                    </Row>
                  </div>
                </>
              ) : (
                <>
                  {props.pageName === "Meets" ? (
                    <>
                      <Link
                        to={`meets/add`}
                        className="btn btn-sm btn-success mb-2"
                      >
                        Add User
                      </Link>
                      <div className="form-group">
                        <Row>
                          <Col size="md-9">
                            <label htmlFor="meet">Search by Meet Title:</label>
                            <input
                              onChange={props.handleInputChange}
                              name="meet"
                              type="text"
                              className="form-control"
                              placeholder="Type Meet Title to Search"
                              id="meet"
                            />
                          </Col>
                          <Col size="md-3">
                            <label htmlFor="sortOptions">Sort by:</label>
                            <select
                              id="sortOptions"
                              onChange={props.sortBy}
                              className="form-control"
                              style={{ height: "29px", padding: "2px" }}
                            >
                              <option value="A-Z">A-Z</option>
                              <option value="Z-A">Z-A</option>
                            </select>
                          </Col>
                        </Row>
                      </div>
                    </>
                  ) : (
                    <> Add code Here if more pages using this component needs to be added</>
                  )}
                </>
              )}
            </>
          )}
        </>
      )}
    </form>
  );
}

export default SearchForm;
