import React, { useState, useEffect } from "react";
import * as FcIcons from "react-icons/fc";
import { Card } from "react-bootstrap";
import API from "../../utils/API";
import { USERID } from "../../constants/apiConstants";
import SearchForm from "../../components/SearchForm";
import SearchResultsList from "../../components/SearchResultsList";


function CardListCompanies(props) {
  const [companies, setCompanies] = useState([]);
  const [userType, setUserType] = useState();
  const [filteredCompanies, setFilteredCompanies] = useState([companies]);
  const [sortType, setSortType] = useState("a-z");
  const [users, setUsers] = useState([]);

  
    useEffect(() => {
        loadCompanies(); 
        loadUsers();
        typeUsers();            
    }, [])

  function loadCompanies() {
    API.getCompanies()
      .then((res) => {
        setCompanies(res.data);
        setFilteredCompanies(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }

  function loadUsers() {
    API.getUsers()
      .then((res) => {
        setUsers(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }

  function typeUsers() {
    const userId = localStorage.getItem(USERID);
    API.getUser(userId).then((res) => {
      console.log(res.data.type);
      setUserType(res.data.type);
    });
  }

  function sortBy(event) {    
    setSortType(event.target.value.toLowerCase());
    let listCompaniesSorted = [];
    if (sortType === "a-z") {
      listCompaniesSorted = companies.sort((a, b) =>
        a.name < b.name ? 1 : -1
      );
    }
    if (sortType === "z-a") {
      listCompaniesSorted = companies.sort((a, b) =>
        a.name > b.name ? 1 : -1
      );
    }
    return setFilteredCompanies(listCompaniesSorted);
}


  function handleInputChange(e) {
    const listCompanies = companies.filter(
      (res) => res.name.toLowerCase().indexOf(e.target.value.toLowerCase()) >= 0
    );
    setFilteredCompanies(listCompanies);
  }

  return (
    <>
      <Card className="card-chart mb-3" style={{ height: "600px" }}>
        <Card.Header>
          <Card.Title tag="h5" className="title-header">
            Companies
          </Card.Title>
          <p className="card-category">List</p>
        </Card.Header>
        <Card.Body style={{ overflow: "auto" }}>
          <div className="table-responsive">
            <SearchForm
              pageName="Companies"
              handleInputChange={handleInputChange}
              sortBy={sortBy}
            />
            <SearchResultsList
              results={filteredCompanies}
              userType={userType}
              key={USERID}
              pageName="Companies"
            />
          </div>
        </Card.Body>
        <Card.Footer>
          <hr />
          <div className="card-stats">
            <FcIcons.FcDataBackup /> Database Information
          </div>
        </Card.Footer>
      </Card>
    </>
  );
}

export default CardListCompanies;
