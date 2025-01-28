import React, { useContext } from "react";
import "./ProductDisplay.css";
import star_icon from '../Assets/star_icon.png'
import { ExploreContext } from "../../Context/ExploreContext";

export default function ProductDisplay(props) {
  const { product } = props;
  const {AddToCart} = useContext(ExploreContext);
  return (
    <div className="product-display">
      <div className="product-display-left">
        <div className="product-display-img-list">
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          {/* <img src={product.image} alt="" /> */}
        </div>
        <div className="product-display-main-img">
          <img src={product.image} alt="" />
        </div>
      </div>
      <div className="product-display-right">
        <h1>{product.name}</h1>
        <div className="product-display-right-star">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <p>({product.rating})</p>
        </div>
        <div className="product-display-price">
          Rs.{product.approx_price}
        </div>
        <div className="cuisine">
          <h5>Cuisine:</h5>
          <p>{product.cuisine}</p>
        </div>
        <button onClick={() => {AddToCart(product.id)}}>ADD TO CART</button>
      </div>
    </div>
  );
}
