// Libraries
import React from 'react';
import { Link, useNavigate } from "react-router-dom";

// Assets
import logo from "./../assets/chiAlpha_trans.png"

const NavBar = ({handleLogout}) => {
  const authed = sessionStorage.getItem("username") && sessionStorage.getItem("token") ? true : false;
  console.log(authed);
  return (
    <div className="navContainer">
        <nav>
            <ul className="navbar">
            <div className="header">
                <img className="logo" src={logo} alt="Chi Alpha" />
                <h2>Chi Alpha: Christian Fellowship</h2>
            
            </div>
                {authed && <li><Link to="/announcements" className="link">Announcements</Link></li>}
                {authed && <li><Link to="/events" className="link">Events</Link></li>}
                {authed && <li><a className="link" onClick={handleLogout}>Logout</a></li>}
            </ul>
        </nav>
    </div>
  )
}

export default NavBar;