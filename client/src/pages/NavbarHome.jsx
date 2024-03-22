import React from "react";
import { BiMenu } from "react-icons/bi";
import { Link } from "react-router-dom";

function NavbarHome() {
  function myMenuFunction() {
    var i = document.getElementById("navMenu");
    if (i.className === "nav-menu") {
      i.className += " responsive";
    } else {
      i.className = "nav-menu";
    }
  }

  return (
    <nav className="nav">
      <div className="nav-logo">
        <p>
          <img className="main-logo" src={require("../images/logo.png")} />
        </p>
      </div>
      <div className="nav-menu" id="navMenu">
        <ul>
          <li>
            <a href="#" className="link active">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="link">
              Blog
            </a>
          </li>
          <li>
            <a href="#" className="link">
              Services
            </a>
          </li>
          <li>
            <a href="#" className="link">
              About
            </a>
          </li>
        </ul>
      </div>
      <div className="nav-menu-btn">
        <span onClick={myMenuFunction}>
          <BiMenu />
        </span>
      </div>
    </nav>
  );
}

export default NavbarHome;
