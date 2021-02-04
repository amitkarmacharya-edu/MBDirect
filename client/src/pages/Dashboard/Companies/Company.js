import React, { useState, useEffect } from "react";
import API from "../../../utils/API";
import SearchForm from "../../../components/SearchForm";
import SearchResults from "../../../components/SearchResults";
import Container from "../../../components/Container";
import { alertService } from "../../../services";
import Row from "../../../components/Row";
import Col from "../../../components/Col";
import { USERID } from "../../../constants/apiConstants";
import Navbar from "../../../components/Navbar/Navbar";
import { Link } from "react-router-dom";

function Company({ match }, props) {
  const { path } = match;
  const [companies, setCompanies] = useState([]);
  const [userType, setUserType] = useState("");
  const [companyDeleted, setCompanyDeleted] = useState(false);
  const [filteredCompanies, setFilteredCompanies] = useState([companies]);
  const [sortType, setSortType] = useState("a-z");
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const [categories,setCategories] = useState([]);

  useEffect(() => {
    setCompanyDeleted(false);
    loadCompanies();
    typeUsers();
    loadCategories();
  }, [companyDeleted]);

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

  function loadCategories(){
    API.getCategories().then((res)=>{
      setCategories(res.data);
      console.log(res.data);
    })
  }

  function handleInputChange(e) {
    const listCompanies = companies.filter(
      (res) => res.name.toLowerCase().indexOf(e.target.value.toLowerCase()) >= 0
    );
    console.log(e.target.value);
    setFilteredCompanies(listCompanies);
  }

  // Function to sort result by option choosen from Sort by picklist
  function sortBy(event) {
    setSortType(event.target.value.toLowerCase());
    let listCompaniesSorted = [];
    if (sortType === "a-z") {
      listCompaniesSorted = companies.sort((a, b) =>
        a.name < b.name ? 1 : -1
      );
      console.log(listCompaniesSorted);
    }
    if (sortType === "z-a") {
      listCompaniesSorted = companies.sort((a, b) =>
        a.name > b.name ? 1 : -1
      );
      console.log(listCompaniesSorted);
    }
    return setFilteredCompanies(listCompaniesSorted);
  }

  function deleteCompany (e) {
    e.preventDefault();
    API.deleteCompany(e.target.id)
      .then(function (response) {
        console.log(response);
        alertService.success("Company has been deleted", {
          keepAfterRouteChange: true,
        });
        return setCompanyDeleted(true);
      })
      .catch(alertService.error);
  }

  return (
    <div>
      <Navbar sidebar={sidebar} isActive={showSidebar} />

      <Container
        sidebar={sidebar}
        isActive={showSidebar}
        style={{ marginTop: 30 }}
      >
        <Row>
          <Col size="md-12">
            <div>
              <Container style={{ minHeight: "80%" }}>
                {userType === "Admin" ? (
                  <>
                    <Link
                      to={`${path}/add`}
                      className="btn btn-sm btn-success mb-2"
                    >
                      Add Company
                    </Link>
                    <SearchForm
                      pageName="Companies"
                      handleInputChange={handleInputChange}
                      sortBy={sortBy}
                    />
                  </>
                ) : (
                  <></>
                )}

                <SearchResults
                  results={filteredCompanies}
                  userType={userType}
                  key={USERID}
                  categories={categories}
                  pageName="Companies"
                  deleteCompany = {deleteCompany}
                />
              </Container>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export { Company };
