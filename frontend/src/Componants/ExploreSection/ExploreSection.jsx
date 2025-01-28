import React, { useContext } from "react";
// import Card_data from '../Assets/ExploreSectionData'
import ExploreCard from "../ExploreCard/ExploreCard";
import './ExploreSection.css'
import { ExploreContext } from "../../Context/ExploreContext";

export default function ExploreSection() {
    const {All_products} =useContext(ExploreContext);
    return (
        <div className="max-width explore-section">
            <h1 className="collection-title">Explore Section</h1>
            <hr />

            <div className="explore-grid">
                {All_products.map((item,i) => {
                    return <ExploreCard key={i} id={item.id} name={item.name} image={item.image} delivery_time={item.delivery_time} rating={item.rating} cuisine={item.cuisine} approx_price={item.approx_price}/>
                })}
            </div>
            
        </div>
    )
}