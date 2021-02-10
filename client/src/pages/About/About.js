import React, { useState } from "react";
import Header from "../../components/Header";
import Card from "react-bootstrap/Card";
import AmitImage from "../../Images/amit.jfif";
import AdrianImage from "../../Images/adrian.jfif";
import CesarAImage from "../../Images/cesara.jfif";
import CesarHImage from "../../Images/cesarh.jpg";
import "./style.css";

function About(props) {
  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="text-center mb-5 mt-5">
          <div>
            <h1>About MBDirect</h1>
          </div>
        </div>

        <Card className="text-center">
          <Card.Body>
            <div className="row mb-5 mt-5">
              <div className="col-md-6 offset-3">
                <p className="h4">
                  MB Direct is application that connects users to businesses
                  that meets their criteria. This app allows customers to link
                  up with businesses directly, in return businesses can contact,
                  inform, negotiate and deliver customer satisfaction. This
                  website is fully functional, easy to navigate, with build in
                  authentication for users.
                </p>
              </div>
            </div>
            <div className="row mb-5 mt-5">
              <div className="col-md-6 offset-3">
                <h1>We are the dream Team</h1>
              </div>
            </div>
            <div className="row">
              <div className="col-md-3">
                <Card>
                  <Card.Body>
                    <img
                      className="rounded-circle img-fluid shadow mb-5"
                      src={CesarAImage}
                      alt="CesarAImage"
                    />
                    <Card.Title className="font-weight-bold mb-5">
                      Cesar A Martinez
                    </Card.Title>
                    <Card.Text className="mb-5">
                      I really enjoy working hard and always do my best. A
                      penchant professional with an aptitude to
                      workindependently and collaboratively to drive feasible
                      outcomes under pressure.
                    </Card.Text>
                    <Card.Text>
                      <small className="text-muted">Links</small>
                    </Card.Text>
                    <div className="d-flex flex-wrap justify-content-center mt-4">
                      <a
                        href="https://www.linkedin.com/in/cesar-augusto-martinez-auquilla"
                        className="fa fa-linkedin fa-2x mb-2 mr-4 text-primary"
                        target="_blank"
                      ></a>
                      <a
                        href="https://twitter.com/cesaguma"
                        className="fa fa-twitter fa-2x mb-2 mr-4 text-info"
                        target="_blank"
                      ></a>
                      <a
                        href="https://github.com/CesarAugustoMartinez"
                        target="_blank"
                        className="fa fa-github fa-2x mb-2 mr-4"
                        target="_blank"
                      ></a>
                      <a
                        href="https://www.instagram.com/augustomartineza/"
                        className="fa fa-instagram fa-2x mb-2 mr-4"
                        target="_blank"
                        id="insta"
                      ></a>
                    </div>
                  </Card.Body>
                </Card>
              </div>
              <div className="col-md-3">
                <Card>
                  <Card.Body>
                    <img
                      className="rounded-circle img-fluid shadow mb-5"
                      src={AmitImage}
                      alt="AmitImage"
                    />

                    <Card.Title className="font-weight-bold mb-5">
                      Amit Karmacharya{" "}
                    </Card.Title>
                    <Card.Text className="mb-5">
                      Programming is a natural instinct to me and most of time
                      is spent learning new technology. I also love playing
                      games but as I have grown older, my enthusiasm has shifted
                      from consuming to creating.
                    </Card.Text>
                    <Card.Text>
                      <small className="text-muted">Links</small>
                    </Card.Text>
                    <div className="d-flex flex-wrap justify-content-center mt-4">
                      <a
                        href="https://www.linkedin.com/in/amit-karmacharya-b344731ab/"
                        className="fa fa-linkedin fa-2x mb-2 mr-4 text-primary"
                        target="_blank"
                      ></a>
                      <a
                        href="#"
                        className="fa fa-twitter fa-2x mb-2 mr-4 text-info"
                        target="_blank"
                      ></a>
                      <a
                        href="https://github.com/amitkarmacharya-edu"
                        target="_blank"
                        className="fa fa-github fa-2x mb-2 mr-4"
                        target="_blank"
                      ></a>
                      <a
                        href="#"
                        className="fa fa-instagram fa-2x mb-2 mr-4"
                        target="_blank"
                        id="insta"
                      ></a>
                    </div>
                  </Card.Body>
                </Card>
              </div>
              <div className="col-md-3">
                <Card>
                  <Card.Body>
                    <img
                      className="rounded-circle img-fluid shadow mb-5"
                      src={AdrianImage}
                      alt="AdrianImage"
                    />

                    <Card.Title className="font-weight-bold mb-5">
                      Adrian Storr
                    </Card.Title>
                    <Card.Text className="mb-5">
                      Project manager, supply chain engineer, and junior web
                      developer.  <br></br> Critical thinker, team oriented, 21'st
                      century skills and problem solver.
                     
                    </Card.Text>
                    <Card.Text>
                      <small className="text-muted">Links</small>
                    </Card.Text>
                    <div className="d-flex flex-wrap justify-content-center mt-4">
                      <a
                        href="https://www.linkedin.com/in/adrian-storr-98773731/"
                        className="fa fa-linkedin fa-2x mb-2 mr-4 text-primary"
                        target="_blank"
                      ></a>
                      <a
                        href="#"
                        className="fa fa-twitter fa-2x mb-2 mr-4 text-info"
                        target="_blank"
                      ></a>
                      <a
                        href="https://github.com/AdrianStorr"
                        target="_blank"
                        className="fa fa-github fa-2x mb-2 mr-4"
                        target="_blank"
                      ></a>
                      <a
                        href="#"
                        className="fa fa-instagram fa-2x mb-2 mr-4"
                        target="_blank"
                        id="insta"
                      ></a>
                    </div>
                  </Card.Body>
                </Card>
              </div>
              <div className="col-md-3">
                <Card>
                  <Card.Body>
                    <img
                      className="rounded-circle img-fluid shadow mb-5"
                      src={CesarHImage}
                      alt="CesarHImage"
                    />

                    <Card.Title className="font-weight-bold mb-5">
                      Cesar H Martinez
                    </Card.Title>
                    <Card.Text className="mb-5">
                      Known as an innovator, able to solve complex problems, and
                      team collaborator makes me able to drive feasible outcomes
                      under pressure and develop life-enhancing user experiences.                     
                    </Card.Text>
                    <Card.Text>
                      <small className="text-muted">Links</small>
                    </Card.Text>
                    <div className="d-flex flex-wrap justify-content-center mt-4">
                      <a
                        href="https://www.linkedin.com/in/cesar-martinez-3986b3120/"
                        className="fa fa-linkedin fa-2x mb-2 mr-4 text-primary"
                        target="_blank"
                      ></a>
                      <a
                        href="https://twitter.com/chernanma"
                        className="fa fa-twitter fa-2x mb-2 mr-4 text-info"
                        target="_blank"
                      ></a>
                      <a
                        href="https://github.com/chernanma"
                        target="_blank"
                        className="fa fa-github fa-2x mb-2 mr-4"
                        target="_blank"
                      ></a>
                      <a
                        href="https://www.instagram.com/chernanma/"
                        target="_blank"
                        className="fa fa-instagram fa-2x mb-2 mr-4"
                        id="insta"
                      ></a>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

export default About;
