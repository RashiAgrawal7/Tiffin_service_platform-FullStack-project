import React, { useEffect, useState } from 'react'
import './ListProduct.css'
import removeIcon from '../../assets/cross-icon.png'
import {toast} from 'react-toastify';

const ListProduct = ({url}) => {
    const [allProduct,setallProducts] = useState([])
    
    const fetchInfo = async () =>{
        await fetch(`${url}/products/allproducts`)
        .then((res)=>res.json())
        .then((data)=>{
            if(data.success){
                setallProducts(data.data);
            }
            else{
                toast.error("Error");
            }
        });
    }
    useEffect(()=>{fetchInfo()},[]);

    const remove_product = async (id) =>{
        await fetch(`${url}/products/removeproduct`,{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id:id}),
        })
        await fetchInfo();
    }
  return (
    <div className='list-product'>
        <h1>All Products List</h1>
        <div className="listproduct-format-main">
            <p>Product</p>
            <p>Name</p>
            <p>Price</p>
            <p>Location</p>
            <p>Cuisine</p>
            <p>Delivery Time</p>
            <p>Remove</p>
        </div>
        <div className="listproduct-allproduct">
            <hr />
            {allProduct.map((product,index)=>{
                return <> <div key={index} className="listproduct-format-main listproduct-format">
                    <img src={`${url}/images/`+product.image} alt="" className="listproduct-product-icon" />
                    <p>{product.name}</p>
                    <p>Rs.{product.approx_price}</p>
                    <p>{product.location}</p>
                    <p>{product.cuisine}</p>
                    <p>{product.delivery_time}</p>
                    <img onClick={()=>{remove_product(product.id)}} src={removeIcon} alt="" className="listproduct-remove-icon" />
                </div>
                <hr />
                </>
            })}
        </div>
    </div>
  )
}

export default ListProduct