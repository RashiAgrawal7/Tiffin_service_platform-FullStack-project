import React from "react";
import './ListOrders.css';
import { useState, useEffect } from "react";
import parcel_icon from '../../assets/parcel_icon.png';
// import {toast} from 'react-toastify'

export default function ListOrders({url}){

    const [orders,setOrders] =useState([])

    const UpdateStatus = async (event,orderId) =>{
        // console.log(event,orderId);

        
        const response = await fetch(`${url}/order/status`,{
            method: 'POST',
            headers: {
                Accept: 'application/form-data',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                orderId:orderId,
                status: event.target.value
            })
        })

        const responseData = await response.json();

        if (responseData.success) {
            console.log("Status updated successfully");
            fetchAllOrders(); // Refresh orders after updating status
        } else {
            console.error("Failed to update status:", responseData.message);
        }
    
    }

    const fetchAllOrders = () =>{
        fetch(`${url}/order/list`)
        .then((response)=>response.json())
        .then((responsedata)=>{
            if(responsedata.success){
                setOrders(responsedata.data);
                // console.log(responsedata.data);                
            }
            else{
                console.log("Error fetching data");  
            }   
        })
    }

    useEffect(() => {
      fetchAllOrders();
      console.log("Orders: ",orders);
    }, [])
    
    
    
    return(
        <div className="list-orders">
            <h2>Order Page</h2>
            <div className="container">
                {orders.map((order,index)=>
                    (<div key={index} className="order-item">
                        <img className="order-img" src={parcel_icon} alt="" />
                        <div>
                        <p className="order-item-food">
                        {order.items && order.items.map((item, index) => {
                        if (index === order.items.length - 1) {
                        return item.name + " x " + item.quantity 
                        } else{
                        return item.name + " x " + item.quantity + ", "
                        }
                        return null;
                        })}</p>
                        <p className="order-item-name">{order.address.firstname+ " " + order.address.lastname}</p>
                        <div className="order-item-address">
                            <p>{order.address.House_numberStreet_name + " , "}</p>
                            <p>{order.address.Town_city + ", " + order.address.State + ", " + order.address.Country + " , " + order.address.pincode}</p>
                        </div>
                        </div>
                        <div>
                            <p>Items: {order.items.length}</p>
                        </div>
                        <div>
                            <p>Rs.{order.amount}</p>
                        </div>
                        <select onChange={(event)=>UpdateStatus(event,order._id)} value={order.status}>
                            <option value="Food Processing">Food Processing</option>
                            <option value="Out for Delivery">Out for Delivery</option>
                            <option value="Delivered">Delivered</option>
                        </select>
                    </div>))}
            </div>

        </div>
    )
}