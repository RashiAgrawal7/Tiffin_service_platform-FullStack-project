import React, { useContext } from "react";
// import Card_data from "../Componants/Assets/ExploreSectionData";
import { useParams } from "react-router-dom";
import { ExploreContext } from "../Context/ExploreContext";
import Breadcrum from "../Componants/Breadcrum/Breadcrum";
import ProductDisplay from "../Componants/ProductDisplay/ProductDisplay";
import RelatedProduct from "../Componants/RelatedProduct/RelatedProduct";
// import { Link } from "react-router-dom";


export default function Product() {
  const { All_products } = useContext(ExploreContext);
  const { productid } = useParams();
  const product = All_products.find((e) => e.id === Number(productid));
  return (
    <>
      <Breadcrum product={product} />
      <ProductDisplay product={product} />
      <RelatedProduct productid={productid}/>
    </>
  );
}
