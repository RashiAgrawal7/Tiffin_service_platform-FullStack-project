import React from "react";
import './Navbar.css'
import tiffinLogo from '../../assets/tifiin_logo.png';
import navProfile from '../../assets/nav-profile-icon.png';
import dropdown from '../../assets/drop-down.png';

export default function Navbar(){
    return(
        <div className="navbar">
            <img src={tiffinLogo} alt="" className="nav-logo" />
            <div className="nav-logo-text">
                <h5>TIFFIN TOWN</h5>
                <p>Admin Panel</p>
            </div>
            <img src={navProfile} alt="" className="nav-profile" />
            <img src={dropdown} alt="" className="dropdown-icon" />
        </div>
    )
}