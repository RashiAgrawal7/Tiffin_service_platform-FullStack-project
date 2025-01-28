import React, { useContext } from "react";
import "./CSS/Location.css";
import { ExploreContext } from "../Context/ExploreContext";
import ExploreCard from "../Componants/ExploreCard/ExploreCard";
import { Link } from "react-router-dom";

export default function Location(props) {
  const {All_products} = useContext(ExploreContext);
    console.log("All_products:", All_products);

  const SelectedLocationCards = All_products.filter((card) => {
    // console.log("Props Location:", props.location);
    // console.log("Card Location:", card.location);

    return props.location === card.location;
  });
  return (
    <div className="location-page">
        <Link className="home-link" to="/"><p>Back to Home</p></Link>
      <h1>Home-Chefs in {props.location}</h1>
      <div className="locationFilter">
        {SelectedLocationCards.map((item, i) => {
          return (
            <ExploreCard
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              delivery_time={item.delivery_time}
              rating={item.rating}
              cuisine={item.cuisine}
              approx_price={item.approx_price}
            />
          );
        })}
      </div>
    </div>
  );
}
