import React from "react";
import "./HeroSection.css";

export default function HeroSection() {
  return (
    <div className="HeroSection">
      <div className="background-img">
        <div className="header-content">
          <h1>Fresh food from </h1>
          <h1>Our kitchen to your tiffin</h1>
          <form className="search-provider">
            <input type="text" placeholder="What are you looking for? " />
            <button>Order now</button>
          </form>
        </div>
      </div>
    </div>
  );
}
