import React, { useContext } from "react";
import "./Navbar.css";
import logo from "../Assets/tifiin_logo.png";
import dropdown from "../Assets/drop-down.png";
import { useNavigate, Link } from "react-router-dom";
import cart_icon from "../Assets/cart_icon.png";
import nav_profile from "../Assets/nav_profile_icon.png";
import nav_profile_bag_icon from "../Assets/nav_profile_bag_icon.webp";
import nav_profile_logout_icon from "../Assets/nav_profile_logout_icon.png";
import { ExploreContext } from "../../Context/ExploreContext";

export default function Navbar() {
  const {GetTotalCartItems} = useContext(ExploreContext);
  const navigate = useNavigate();
  const handleLocationChange = (event) => {
    const SelectedLocation = event.target.value;
    if(SelectedLocation){
      navigate(SelectedLocation);
    }
  }

  const Logout = () =>{
    localStorage.removeItem('auth-token');
    navigate("/")
  }
  return (
    <div className="navbar">
      <nav>
        <div className="logo">
        <img src={logo} alt="" />
        <h5>TIFFIN TOWN</h5>
        </div>
        <div>
          <select onChange={handleLocationChange} className="location">
            <option className="optionstyle" value="/" >
              Select Location
            </option>
            <option className="optionstyle" value="/Indore">
              Indore
            </option>
            <option className="optionstyle" value="/ujjain">
              Ujjain
            </option>
            <option className="optionstyle" value="/Mumbai">
              Mumbai
            </option>
            <option className="optionstyle" value="/Banglore">
              Banglore
            </option>
          </select>
        </div>

        <div className="login-cart">
          {/* {localStorage.getItem('auth-token')
          ?<button className="btn" onClick={()=>{localStorage.removeItem('auth-token');window.location.replace("/")}} >Logout</button>
          :<Link to="/Signup"><button className="btn">Login</button></Link>}  */}

          <div>
          {localStorage.getItem('auth-token')
          ?<div className="navbar-profile">
            <img className="nav-profile-icon" src={nav_profile} alt="" />
            <ul className="navbar-profile-dropdown">
              <li onClick={()=>{navigate('/myorders')}}><img className="nav-profile-bag-icon" src={nav_profile_bag_icon} alt="" /><p>Orders</p></li>
              <hr />
              <li onClick={Logout}><img className="nav-profile-logout-icon" src={nav_profile_logout_icon} alt="" /><p>Logout</p></li>
            </ul>
          </div>
          :<Link to="/Signup"><button className="btn">Login</button></Link>}
          </div>
            
          {/* <Link to="/Signup"><button className="btn">Login</button></Link> */}

          <div>
          <Link to='/Cart'><img src={cart_icon} alt="" className="cart_icon"/></Link>
          <div className="nav-cart-count">{GetTotalCartItems()}</div>
          </div>
        </div>
      </nav>
    </div>
  );
}
