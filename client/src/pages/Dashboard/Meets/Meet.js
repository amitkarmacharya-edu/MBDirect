import React, { useState, useEffect} from "react";
import Navbar from "../../../components/Navbar/Navbar";
import Container from "../../../components/Container";
import SearchForm from "../../../components/SearchForm";
import API from "../../../utils/API";
import { alertService } from "../../../services";
import Row from "../../../components/Row";
import Col from "../../../components/Col";
import { USERID } from "../../../constants/apiConstants";
import { Link } from "react-router-dom";
import SearchResultsList from "../../../components/SearchResultsList";




function Meet({ match }, props) {
  const { path } = match;
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const [meets, setMeets] = useState([]);
  const [userType, setUserType] = useState("");
  const [filteredMeets, setFilteredMeets] = useState([meets]);
  const [sortType, setSortType] = useState("newest-oldest");
  
    

  useEffect(() => {
    loadMeets();   
    typeUsers();
  }, [])

  function loadMeets() {
    API.getMeets()
      .then((res) => {
        setMeets(res.data);
        setFilteredMeets(res.data);
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
    const listMeets = meets.filter(
      (res) => res.title.toLowerCase().indexOf(e.target.value.toLowerCase()) >= 0
    );
    console.log(e.target.value);
    setFilteredMeets(listMeets);
  }

  // Function to sort result by option choosen from Sort by picklist
  function sortBy(event) {
    setSortType(event.target.value.toLowerCase());
    let listMeetsSorted = [];
    if (sortType === "newest-oldest") {
      listMeetsSorted = meets.sort((a, b) =>
        a.start_time < b.start_time ? 1 : -1
      );
      console.log(listMeetsSorted);
    }
    if (sortType === "oldest-newest") {
      listMeetsSorted = meets.sort((a, b) =>
        a.start_time > b.start_time ? 1 : -1
      );
      console.log(listMeetsSorted);
    }
    return setFilteredMeets(listMeetsSorted);
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
                      Add Meet
                    </Link>
                    <SearchForm
                      pageName="Meets"
                      handleInputChange={handleInputChange}
                      sortBy={sortBy}
                    />
                  </>
                ) : (
                  <></>
                )}
                <div className="card">
                      <div className="card-body">  
                <SearchResultsList
                  results={filteredMeets}
                  userType={userType}
                  key={USERID}
                  pageName="Meets"
                />
                </div>
                </div>
              </Container>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export {Meet};
