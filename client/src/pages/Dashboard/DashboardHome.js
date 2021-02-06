import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Container from "../../components/Container";
import "./Dashboard.css";
import * as GrIcons from "react-icons/gr";
import * as FcIcons from "react-icons/fc";
import { USERID } from "../../constants/apiConstants";
import { Card, Row, Col } from "react-bootstrap";
import API from "../../utils/API";
import { Link } from 'react-router-dom';
import CardStats from "../../components/CardsDashboard/CardStats";
import CardListCompanies from "../../components/CardsDashboard/CardListCompanies";
import CardLinealChart from "../../components/CardsDashboard/CardLinealChart";


function DashboardHome(props) {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const [companies, setCompanies] = useState([]);
  const [userType, setUserType] = useState("");
  const [totalUsers, setTotalUsers] = useState([]);
  const [totalCompaniesAdmin, setTotalCompaniesAdmin] = useState([]);
  const [totalCompaniesUser, setTotalCompaniesUser] = useState([]);
  const [totalAdsAdmin, setTotalAdsAdmin] = useState([]);
  const [totalAdsUser, setTotalAdsUser] = useState([]);
  const [totalMeetsAdmin, setTotalMeetsAdmin] = useState([]);
  const [totalGuests, setTotalGuests] = useState([]);
  

  useEffect(() => {
    loadCompanies();
    typeUsers();
    if (userType === "Admin") {
      loadUsers();
      loadAds();
      loadMeets();
    } else if (userType === "Owner") {
      getGuests(localStorage.getItem(USERID));
      loadCompaniesByUser(localStorage.getItem(USERID));
      loadAdsByUser(localStorage.getItem(USERID));

    }  

  }, [userType]);

  function loadCompanies() {
    API.getCompanies()
      .then((res) => {
        setCompanies(res.data);
        setTotalCompaniesAdmin(res.data.length);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }

  function loadCompaniesByUser(userId) {
    console.log(userId);
    API.getCompaniesByUser(userId)
      .then((res) => {
        console.log(res.data);
        setTotalCompaniesUser(res.data.length);
      })
      .catch((err) => console.log(err));
  }

  function loadAdsByUser(userId) {
    console.log(userId);
    API.getAdsByUser(userId)
      .then((res) => {
        console.log(res.data);
        setTotalAdsUser(res.data.length);
      })
      .catch((err) => console.log(err));
  }

  function loadUsers() {
    API.getUsers()
      .then((res) => {
        setTotalUsers(res.data.length);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }

  function loadAds() {
    API.getAds()
      .then((res) => {
        setTotalAdsAdmin(res.data.length);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }

  function loadMeets() {
    API.getMeets()
      .then((res) => {
        setTotalMeetsAdmin(res.data.length);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }
  function getGuests(userId) {
    let companiesIds = [];
    API.getCompanies()
      .then((res) => {
        companiesIds.push(res.data.id);
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
  
  
  return (
    <>
      <Navbar sidebar={sidebar} isActive={showSidebar} />
      <Container
        sidebar={sidebar}
        isActive={showSidebar}
        style={{ marginTop: 30 }}
      >
        <div className="content">
          <Row>
            <Col lg="3" md="6" sm="6">
              <Card className="card-stats mb-3">
                <Card.Body>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="text-center">
                        <FcIcons.FcConferenceCall className="icons-stats" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Users</p>
                        {userType === "Admin" ? (
                          <Card.Title tag="p">{totalUsers}</Card.Title>
                        ):(
                          <Card.Title tag="p">{totalGuests}</Card.Title>
                        )}                        
                        <p />
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
                <Card.Footer>
                  <hr />
                  <div className="stats">
                    <Link to="/users/"><GrIcons.GrUpdate /> Update Now</Link>
                  </div>
                </Card.Footer>
              </Card>
            </Col>
            <Col lg="3" md="6" sm="6">
              <Card className="card-stats mb-3">
                <Card.Body>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="text-center">
                        <FcIcons.FcFactory className="icons-stats" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Companies</p>
                        {userType === "Admin" ? (
                          <Card.Title tag="p">{totalCompaniesAdmin}</Card.Title>
                        ):(
                          <Card.Title tag="p">{totalCompaniesUser}</Card.Title>
                        )}                        
                        
                        <p />
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
                <Card.Footer>
                  <hr />
                  <div className="stats">
                    <Link to="/companies/"><FcIcons.FcSearch /> Company Maintenance </Link>
                  </div>
                </Card.Footer>
              </Card>
            </Col>
            <Col lg="3" md="6" sm="6">
              <Card className="card-stats mb-3">
                <Card.Body>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="text-center">
                        <FcIcons.FcAdvertising className="icons-stats" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Advertisements</p>
                        {userType === "Admin" ? (
                          <Card.Title tag="p">{totalAdsAdmin}</Card.Title>
                        ):(
                          <Card.Title tag="p">{totalAdsUser}</Card.Title>
                        )}     
                        <p />
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
                <Card.Footer>
                  <hr />
                  <div className="stats">
                    <Link to="/ads/"><FcIcons.FcAddImage /> Add now </Link>
                  </div>
                </Card.Footer>
              </Card>
            </Col>
            <Col lg="3" md="6" sm="6">
              <Card className="card-stats mb-3">
                <Card.Body>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="text-center">
                        <FcIcons.FcCollaboration className="icons-stats" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Meets</p>
                        {userType === "Admin" ? (
                          <Card.Title tag="p">{totalMeetsAdmin}</Card.Title>
                        ):(
                          <Card.Title tag="p">200</Card.Title>
                        )}     
                        <p />
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
                <Card.Footer>
                  <hr />
                  <div className="stats">
                    <Link to="/meets/"><FcIcons.FcCalendar /> Last Month </Link>
                  </div>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <CardStats/>
            </Col>
            <Col md="6">
            <CardLinealChart/>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <CardListCompanies/>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
}

export default DashboardHome;
