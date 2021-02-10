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

import MeetingRoom from "../../components/MeetingRoom";
import IncomingCall from "../../components/IncomingCall";
import meap from "../../utils/webrtc/webrtc-meap";
import { CLOSE_MEETING, INCOMING_CALL, SAVE_USER_INFO, SET_USER_ID, SHOW_ALERTS } from "../../utils/globalState/webrtc/actions";
import { useMeetingContext } from "../../utils/globalState/webrtc/webrtc-globalState";



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
  const [totalMeetsUser, setTotalMeetsUser] = useState([]);
  
  
  const [state, dispatch] = useMeetingContext();
  

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
      getMeetsUser(localStorage.getItem(USERID));
    }  

  }, [userType]);
  
  
  useEffect(() => {
    // check for user id
    if (localStorage.getItem("UserId") && localStorage.getItem("Authenticated") === "true") {
      console.log("LocalStorage userId : " + localStorage.getItem("UserId"));
      meap.userId = localStorage.getItem("UserId");
      dispatch({type: SET_USER_ID, userId: localStorage.getItem("UserId")});
    }

    if (!meap.signalingChannel) {
      meap.createSocketConnection(handleDialTone, callGotRejected)
        .then(() => {
          console.log(meap);
        });
    }
  }, [])
  
  function handleDialTone(data) {
        console.log("coming from handleDiatone inside Dashboard");
        console.log(data);
        dispatch({ type: INCOMING_CALL, data: data });
        console.log(state);
  }

  function callGotRejected() {
    console.log("call got rejected by the business");
    dispatch({type: SHOW_ALERTS, errMsg: "Business is busy with another client."});
    dispatch({type: CLOSE_MEETING});
  }

  function loadCompanies() {
    API.getCompanies()
      .then((res) => {
        setCompanies(res.data);
        setTotalCompaniesAdmin(res.data.length);
      })
      .catch((err) => console.log(err));
  }

  function loadCompaniesByUser(userId) {
    console.log(userId);
    API.getCompaniesByUser(userId)
      .then((res) => {
        setTotalCompaniesUser(res.data.length);
      })
      .catch((err) => console.log(err));
  }

  function loadAdsByUser(userId) {
    console.log(userId);
    API.getAdsByUser(userId)
      .then((res) => {
        setTotalAdsUser(res.data.length);
      })
      .catch((err) => console.log(err));

  }

  function loadUsers() {
    API.getUsers()
      .then((res) => {
        setTotalUsers(res.data.length);
      })
      .catch((err) => console.log(err));
  }

  function loadAds() {
    API.getAds()
      .then((res) => {
        setTotalAdsAdmin(res.data.length);
      })
      .catch((err) => console.log(err));
  }

  function loadMeets() {
    API.getMeets()
      .then((res) => {
        setTotalMeetsAdmin(res.data.length);
      })
      .catch((err) => console.log(err));
  }
  function getGuests(userId) {
    API.getGuestsbyUserId(userId)
      .then((res) => {
        setTotalGuests(res.data.length);
      })
      .catch((err) => console.log(err));
  }
  function getMeetsUser(userId) {
    API.getMeetsbyUserId(userId)
      .then((res) => {
        setTotalMeetsUser(res.data.length);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }
  function typeUsers() {
    const userId = localStorage.getItem(USERID);
    API.getUser(userId).then((res) => {
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
                        {userType === "Admin" ? (
                          <>
                          <p className="card-category">Users</p>
                          <Card.Title tag="p">{totalUsers}</Card.Title>
                          </>
                        ):(
                          <>
                          <p className="card-category">Guests</p>
                          <Card.Title tag="p">{totalGuests}</Card.Title>
                          </>
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
                          <Card.Title tag="p">{totalMeetsUser}</Card.Title>
                        )}     
                        <p />
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
                <Card.Footer>
                  <hr />
                  <div className="stats">
                    <Link to="/meets/"><FcIcons.FcViewDetails /> Show all </Link>
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
            <CardLinealChart userType={userType}/>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <CardListCompanies/>
            </Col>
          </Row>
        </div>
      </Container>
   
    {state.meetingStarted &&
        <MeetingRoom
          handleDialTone={handleDialTone}
          callGotRejected={callGotRejected}
        />}

      {state.showCallNotification &&
        <IncomingCall 
          handleDialTone={handleDialTone}
          callGotRejected={callGotRejected}
        />}
    </>
  );
}

export default DashboardHome;