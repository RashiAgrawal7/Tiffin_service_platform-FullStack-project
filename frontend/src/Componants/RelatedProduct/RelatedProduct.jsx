import React, { useContext, useEffect, useState } from "react";
import "./RelatedProduct.css";
// import data_product from '../Assets/data'
import ExploreCard from "../ExploreCard/ExploreCard";
import { ExploreContext } from "../../Context/ExploreContext";

export default function RelatedProduct({productid}) {
  const [RelatedProducts,setRelatedProducts] = useState([]);
  const {url} = useContext(ExploreContext);

  // const [ProductDetails,setProductDetails] = useState({
  //   productid: ""
  // });

  useEffect( () => {
    if(productid){
      console.log(productid);
      fetch(`${url}/products/relatedproducts?id=${productid}`)
     .then((response)=>{
      if(!response.ok){
        throw new Error("Failed to fetch Related Products");
      }
      return response.json();
    })
    .then((data)=>{setRelatedProducts(data)})
    .catch((error)=> console.error("Error fetching Related products: ", error));
    } 
  }, [productid]);
  
  return (
    <div className="related-products">   
        <h1>Related Product</h1>
        <hr />
      <div className="related-product-item">
        {RelatedProducts.map((item,i)=>{
            return <ExploreCard key={i} id={item.id} name={item.name} image={item.image} delivery_time={item.delivery_time} rating={item.rating} cuisine={item.cuisine} approx_price={item.approx_price}/>
        })}
      </div>
    </div>
  );
}
