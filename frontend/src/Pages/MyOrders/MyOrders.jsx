import React, { useState,useEffect, useContext } from "react";
import './MyOrders.css';
import parcel_icon from '../../Componants/Assets/parcel_icon.png'
import { ExploreContext } from "../../Context/ExploreContext";

export default function MyOrders(){

    const token = localStorage.getItem('auth-token');

    const {url} = useContext(ExploreContext);

    const [data,setData] = useState([]);

    const fetchOrders = () => {
        if(token){
            fetch(`${url}/order/myOrders`,{
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'Content-type': 'application/json',
                    'auth-token': token,
                }
            })
            .then((response)=>{
                if(!response.ok){
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((resData)=> {
                console.log("resData: ",resData);
                console.log("resData.data : ",resData.data);
                
                setData(resData.data)
            } )
            .catch((error)=>{
                console.error("Error fetching orders: ", error);
            })     
        }
    }

    useEffect(() => {

        fetchOrders();

        // if(token){
        //     fetch('http://localhost:4000/order/myOrders',{
        //         method: 'POST',
        //         headers: {
        //             Accept: 'application/form-data',
        //             'Content-type': 'application/json',
        //             'auth-token': token,
        //         }
        //     })
        //     .then((response)=>{
        //         if(!response.ok){
        //             throw new Error(`HTTP error! status: ${response.status}`);
        //         }
        //         return response.json();
        //     })
        //     .then((resData)=> {
        //         console.log("resData: ",resData);
        //         console.log("resData.data : ",resData.data);
                
        //         setData(resData.data)
        //     } )
        //     .catch((error)=>{
        //         console.error("Error fetching orders: ", error);
        //     })     
        // }
      
    }, [token])

    useEffect(() => {
        console.log("Updated data: ", data);
    }, [data]);
    

    return(
        <div className="my-orders">
            <h2>My Orders</h2>
            <div className="container">
                {data.map((order,index)=>{
                    return(
                        <div key={index} className="my-orders-order">
                            <img className="order-img" src={parcel_icon} alt="" />
                            <p>{order.items && order.items.map((item, index) => {
                               if (index === order.items.length - 1) {
                               return item.name + " x " + item.quantity 
                               } else{
                                return item.name + " x " + item.quantity + ", "
                               }
                               return null;
                               })}</p>
                            <p>Rs.{order.amount}.00</p>
                            <p>Items: {order.items.length}</p>
                            <p><span>&#x25cf;  </span><b>{order.status}</b></p>
                            <button onClick={fetchOrders}>Track order</button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}