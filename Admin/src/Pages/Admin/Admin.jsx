import React from "react";
import './Admin.css'
import Sidebar from "../../Componants/Sidebar/Sidebar";
import { Routes,Route } from "react-router-dom";
import AddProduct from "../../Componants/AddProduct/AddProduct";
import ListProduct from "../../Componants/ListProduct/ListProduct";
import ListOrders from "../../Componants/ListOrders/ListOrders";

export default function Admin(){
    const url = "https://tiffintown-backend.onrender.com"
    return(
        <div className="admin">
            <Sidebar/>
            <Routes>
                <Route path="/addproduct" element={<AddProduct url={url}/>}/>
                <Route path="/listproduct" element={<ListProduct url={url}/>}/>
                <Route path="/listorders" element={<ListOrders url={url}/>}/>
            </Routes>
        </div>
    )
}
