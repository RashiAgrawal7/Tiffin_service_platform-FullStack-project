import React from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom'
import addproduct from '../../assets/add-product-icon.png';
import listproduct from '../../assets/list-product-icon.png';
import listorder from '../../assets/parcel_icon.png';

export default function Sidebar() {
  return (
    <div className='sidebar'>
        <Link to={"/addproduct"} style={{textDecoration:"none"}}>
        <div className="sidebar-item">
            <img src={addproduct} alt="" className="add-product-icon" />
            <p>Add product</p>
        </div>
        </Link>
        <Link to={"/listproduct"} style={{textDecoration:"none"}}>
        <div className="sidebar-item">
            <img src={listproduct} alt="" className="list-product-icon" />
            <p>Product List</p>
        </div>
        </Link>
        <Link to={"/listorders"} style={{textDecoration:"none"}}>
        <div className="sidebar-item">
            <img src={listorder} alt="" className="list-product-icon" />
            <p>Orders</p>
        </div>
        </Link>
    </div>
  )
}
