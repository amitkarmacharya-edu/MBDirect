import React from "react";
import "./style.css";
import Row from "../Row";
import Col from "../Col";

function SearchForm(props) { 
  const style={ width: "100%", height: "auto",overflow: "hidden" };
  return (    
    <form className="search" style={style}>
      <div className="form-group" >
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
        <select id="sortOptions" onChange={props.sortBy} className="form-control">          
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>                 
        </select>     
        </Col>
        
      </Row>   
      </div>  
    </form>
    
  );
}

export default SearchForm;
