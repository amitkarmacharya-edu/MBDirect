import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../../components/Navbar/Navbar";
import Container from "../../../components/Container";
import API from "../../../utils/API";
import { alertService } from "../../../services";
import SearchForm from "../../../components/SearchForm";
import SearchResults from "../../../components/SearchResults";
import { USERID } from "../../../constants/apiConstants";
import Row from "../../../components/Row";
import Col from "../../../components/Col";

function Ad({ match }, props) {
  const { path } = match;
  const [ads, setAds] = useState([]);
  const [userType, setUserType] = useState("");
  const [filteredAds, setFilteredAds] = useState([ads]);
  const [sortType, setSortType] = useState("a-z");
  const [adDeleted, setAdDeleted] = useState(false);

  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  useEffect(() => {
    setAdDeleted(false);
    loadAds();
    typeUsers();
  }, [adDeleted]);

  function loadAds() {
    API.getAds()
      .then((res) => {
        setAds(res.data);
        setFilteredAds(res.data);
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
    const listAds = ads.filter(
      (res) => res.name.toLowerCase().indexOf(e.target.value.toLowerCase()) >= 0
    );
    console.log(e.target.value);
    setFilteredAds(listAds);
  }

  // Function to sort result by option choosen from Sort by picklist
  function sortBy(event) {
    setSortType(event.target.value.toLowerCase());
    let listAdsSorted = [];
    if (sortType === "a-z") {
      listAdsSorted = ads.sort((a, b) => (a.name > b.name ? 1 : -1));
      console.log(listAdsSorted);
    }
    if (sortType === "z-a") {
      listAdsSorted = ads.sort((a, b) => (a.name < b.name ? 1 : -1));
      console.log(listAdsSorted);
    }
    return setFilteredAds(listAdsSorted);
  }

  function deleteAd(e) {
    e.preventDefault();
    API.deleteAd(e.target.id)
      .then(function (response) {
        console.log(response);
        alertService.success("Ad has been deleted")
        return setAdDeleted(true);
      })
      .catch(alertService.error);
  }

  return (
    <>
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
                      Add Advertisment
                    </Link>
                    <SearchForm
                      pageName="Ads"
                      handleInputChange={handleInputChange}
                      sortBy={sortBy}
                    />
                  </>
                ) : (
                  <></>
                )}

                <SearchResults
                  results={filteredAds}
                  userType={userType}
                  key={USERID}
                  pageName="Ads"
                  deleteUser={deleteAd}
                />
              </Container>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export { Ad };
