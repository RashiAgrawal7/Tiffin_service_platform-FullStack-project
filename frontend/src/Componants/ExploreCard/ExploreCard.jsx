import React from "react";
import './ExploreCard.css'
import { Link } from "react-router-dom";

export default function ExploreCard(props) {
    return (

        <div className="explore-card cur-po">
                <div className="explore-card-cover">
                    <Link to={`/product/${props.id}`}><img onClick={window.scrollTo(0,0)} src={props.image} alt="" className="explore-card-image" /></Link>
                    <div className="delivery-time">{props.delivery_time}</div>
                </div>
                <div className="res-row">
                    <div className="res-name">{props.name}</div>
                    <div className="res-rating absolute-center">
                        {props.rating}<i className="fi fi-rr-star absolute-center"></i>
                    </div>
                </div>
                <div className="res-row">
                    <div className="res-cuisine">
                          <span className="res-cuisine-tag">{props.cuisine}</span>
                    </div>
                    <div className="res-price">Rs.{props.approx_price}</div>
                </div>
        </div>
    )
}