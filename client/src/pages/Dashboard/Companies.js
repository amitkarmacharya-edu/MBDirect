import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import API from "../../utils/API";
import SearchForm from "../../components/SearchForm";
import SearchResults from "../../components/SearchResults";
import Container from "../../components/Container";
import Row from "../../components/Row";
import Col from "../../components/Col";
import { USERID } from "../../constants/apiConstants";

function Companies(props) {
  const [companies, setCompanies] = useState([]);
  const [userType, setUserType] = useState("");
  const [filteredCompanies, setFilteredCompanies] = useState([companies]);
  const [sortType, setSortType] = useState("a-z");

  useEffect(() => {
    loadCompanies();
    typeUsers();   
  }, []);

  function loadCompanies() {
    API.getCompanies()
      .then((res) => {
        setCompanies(res.data);
        setFilteredCompanies(res.data);
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

  function handleInputChange(e) {
    const listCompanies = companies.filter(
      (res) =>
        (res.name.toLowerCase()).indexOf(e.target.value.toLowerCase()) >= 0
    );
    console.log(e.target.value);
    setFilteredCompanies(listCompanies);
  }

  // Function to sort result by option choosen from Sort by picklist
  function sortBy (event) {    
    setSortType(event.target.value.toLowerCase());
    let listCompaniesSorted =[];
    if (sortType === 'a-z'){
      listCompaniesSorted = companies.sort((a,b) => (a.name < b.name) ? 1 : -1);
      console.log(listCompaniesSorted);       
    }
    if (sortType === 'z-a') {
      listCompaniesSorted = companies.sort((a,b) => (a.name > b.name) ? 1 : -1);
      console.log(listCompaniesSorted);           
    }       
    return setFilteredCompanies(listCompaniesSorted);
  };

  return (
    <div>            
      <Container style={{ marginTop: 30 }}>      
      <Row>
          <Col size="md-12">        
            <div>
              <Container style={{ minHeight: "80%" }}>             
                <SearchForm pageName="Companies"                 
                  handleInputChange={handleInputChange}
                  sortBy={sortBy}
                />
                <SearchResults results={filteredCompanies} userType={userType} pageName="Companies"/>
              </Container>
            </div>
          </Col>
        </Row>      
      </Container>
    </div>
  );
}

export default Companies;
