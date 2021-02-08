import React, {useState, useEffect} from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { withRouter, Link } from "react-router-dom";
import { SidebarData } from "../SlidebarData/SlidebarData";
import "./Navbar.css";
import { IconContext } from "react-icons";
import { ACCESS_AUTHENTICATED } from "../../constants/apiConstants";
import API from "../../utils/API";
import { USERID } from "../../constants/apiConstants";
import logo from "../../Images/MBDIRECT-Pagr.png";



function Navbar(props) {
  const [userName, setUserName] = useState("");
  const [userImageSrc, setUserImageSrc] = useState("");
  // const [userType, setUserType] = useState("");

  useEffect(() => {    
    typeUsers();
  }, [])

  function typeUsers() {
    const userId = localStorage.getItem(USERID);
    API.getUser(userId).then((res) => {
      console.log(res.data.type);
      // setUserType(res.data.type);
      setUserImageSrc(res.data.image);
      if (!res.data.image) {
        setUserImageSrc(window.location.origin + "/images/userAvatar.png");
      }      
      setUserName(res.data.first_name + " " + res.data.last_name);

    });
  }

  return (
    <div>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbarSide">          
            <div className="col-md-8">
              <Link to="#" className="menu-bars">
                <FaIcons.FaBars onClick={props.isActive} />
              </Link>
              <a className="navbar-brand text-danger m-auto " href="/"><img className="navbar-brand logo-mbdirect lp-2" src={logo} alt="logoIntranet" width="130" height="50" /></a>

            </div>
            <div className="col-md-4 text-white">
              <div>
              <span className="text-lg-right float-right" style={{paddingTop: "15px"}}> Welcome, {userName} !  <img
              className="rounded-circle img-fluid "
              src={userImageSrc}
              style={{width:"35px", height:"35px"}}
              data-holder-rendered="true"
              alt="User"
            /></span>
              </div>
              
            </div>
          </div>
        
        <nav className={props.sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={props.isActive}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
            <li key={SidebarData.length + 1} className="nav-text">
              <button
                onClick={() => {
                  localStorage.setItem(ACCESS_AUTHENTICATED, "false");
                  API.logout().then(function (response) {
                    props.history.push("/");
                  });
                }}
              >
                <AiIcons.AiOutlineLogout />
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </nav>
      </IconContext.Provider>
    </div>
  );
}

export default withRouter(Navbar);
