import React from "react";
import "./Footer.css";
import logo from "../Assets/tifiin_logo.png";
import instagram_icon from "../Assets/instagram_icon2.webp";
import pinterest_icon from "../Assets/pinterest_icon.png";
import twitter_icon from "../Assets/twitter_icon.png";

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer-logo">
        <img src={logo} alt="" />
        <p>TIFFIN TOWN</p>
      </div>
      <ul className="footer-links">
        <li>Admin</li>
        <li>Services</li>
        <li>Locations</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
      <div className="footer-social-icons">
        <div className="footer-icon-container">
          <img src={instagram_icon} alt="" />
        </div>
        <div className="footer-icon-container">
          <img src={pinterest_icon} alt="" />
        </div>
        <div className="footer-icon-container">
          <img src={twitter_icon} alt="" />
        </div>
      </div>
      <div className="footer-copyright">
        <hr />
        <p>Copyright @ 2024 - All Rights Reserved.</p>
      </div>
    </div>
  );
}
