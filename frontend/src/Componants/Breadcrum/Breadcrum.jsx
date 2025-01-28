import React from "react";
import "./Breadcrum.css";
import arrow_icon from "../Assets/arrow4.png";
import background from "../Assets/background2.png";
import { Link } from "react-router-dom";

export default function Breadcrum(props) {
  const { product } = props;

  return (
    <div className="Breadcrum-full">
      <div className="home-link">
        <Link className="home-link" to="/"><p>Back to Home</p></Link>
      </div>
      <div className="Breadcrum">
      HOME <img src={arrow_icon} alt="" /> EXPLORE SECTION <img src={arrow_icon} alt="" /> {product.name}
      </div>
    </div>
  );
}
