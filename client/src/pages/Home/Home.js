import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Header from "../../components/Header";
import Main from "../../components/Main";
import Footer from "../../components/Footer";
import Jumbo from "../../components/Jumbo";
import { MeetingProvider } from "../../utils/globalState/webrtc/webrtc-globalState";

function Home() {
  return (
    <>
      <Header />
      <Jumbo />
      <MeetingProvider>
        <Main />
      </MeetingProvider>
      <Footer />
    </>
  );
}

export default Home;
