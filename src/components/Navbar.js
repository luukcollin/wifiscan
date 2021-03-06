import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { BrowserRouter, Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "./Navbar.css";
import { IconContext } from "react-icons";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <BrowserRouter>
            <Link to="#" className="menu-bars">
              <FaIcons.FaBars onClick={showSidebar} />
            </Link>
          </BrowserRouter>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <BrowserRouter>
                <Link to="#" className="menu-bars">
                  <AiIcons.AiOutlineClose />
                </Link>
              </BrowserRouter>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <BrowserRouter>
                    <Link to={item.path}>
                      {item.icon}
                      <span style={{ color: "#fefefe" }}>{item.title}</span>
                    </Link>
                  </BrowserRouter>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
