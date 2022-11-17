import React from "react";
import icon from "../assets/img/user.png";
import { Link } from "react-router-dom";
 
const Navbar = ({pages}) => {

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <div className="container"  style={{maxWidth: 1200}}>
        <img src={icon} alt="" style={{borderRadius:"50%", width: 40}}/>
        <Link to="/" className="navbar-brand ml-2">
          Random User
        </Link>
        <button
          className="navbar-toggler"
          data-toggle="collapse"
          data-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div id="navbarNav" className="collapse navbar-collapse">
          <ul
            style={{ fontSize: "0.8rem", letterSpacing: "0.2rem" }}
            className="navbar-nav ml-auto"
          >
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
              {pages.map((page) => (
                <li className="nav-item" key={page}>
                  <Link to={`/${page}`} className="nav-link">
                    {page}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
