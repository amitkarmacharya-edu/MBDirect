import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { withRouter, Link } from "react-router-dom";
import { SidebarData } from "../SlidebarData/SlidebarData";
import "./Navbar.css";
import { IconContext } from "react-icons";
import { ACCESS_AUTHENTICATED } from "../../constants/apiConstants";
import API from "../../utils/API";

function Navbar(props) {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  return (
    <div>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbarSide">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
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
                <AiIcons.AiOutlineLogout/>                
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
