import React, { useContext, useEffect, useState } from "react";
import "./BillingPage.css";
import { ExploreContext } from "../../Context/ExploreContext";
import { Link, useNavigate } from "react-router-dom";

export default function BillingPage() {
  const { GetCartItemTotalAmount, cartItems, fetchUsersCart, All_products,url } =
    useContext(ExploreContext);

  const token = localStorage.getItem("auth-token");

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    Country: "",
    House_numberStreet_name: "",
    Apartment_suit_unit: "",
    Town_city: "",
    State: "",
    pincode: "",
  });

  const changeHandler = (e) => {
    setFormData((data) => ({ ...formData, [e.target.name]: e.target.value }));
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/cart");
    } else if (GetCartItemTotalAmount() === 0) {
      navigate("/cart");
    }
  }, [token]);

  const placeOrder = async (event) => {
    event.preventDefault();

    // for (let key in formData) {
    //     if (!formData[key]) {
    //         alert(`Please fill out the ${key.replace(/_/g, " ")} field.`);
    //         return;
    //     }
    // }

    let orderItems = [];

    All_products.map((item) => {
      if (cartItems[item.id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item.id];
        orderItems.push(itemInfo);
      }
    });

    // console.log(orderItems);

    let orderData = {
      address: formData,
      items: orderItems,
      amount: GetCartItemTotalAmount(),
    };

    let responseData;

    await fetch(`${url}/order/place`, {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-type": "application/json",
        "auth-token": `${localStorage.getItem("auth-token")}`,
      },
      body: JSON.stringify(orderData),
    })
      .then((response) => response.json())
      .then((data) => (responseData = data));

    fetchUsersCart();

    console.log(responseData);
    navigate("/myorders");
  };

  return (
    <form onSubmit={placeOrder} className="billing-page">
      <div className="billing-page-left">
        <h3>Delivery Information</h3>
        <hr />
        <div className="billing-page-item-fields">
          <div className="name-fields">
            <div className="firstname">
              <p>First name</p>
              <input
                required
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={changeHandler}
              />
            </div>
            <div className="lastname">
              <p>Last name</p>
              <input
                required
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={changeHandler}
              />
            </div>
          </div>
        </div>
        <div className="billing-page-item-fields">
          <p>Country/Region</p>
          <input
            required
            type="text"
            name="Country"
            value={formData.Country}
            onChange={changeHandler}
          />
        </div>
        <div className="billing-page-item-fields">
          <p>Street Address</p>
          <div className="street-address">
            <input
              required
              type="text"
              name="House_numberStreet_name"
              value={formData.House_numberStreet_name}
              onChange={changeHandler}
              placeholder="House number and street name"
            />
            <input
              type="text"
              name="Apartment_suit_unit"
              value={formData.Apartment_suit_unit}
              onChange={changeHandler}
              placeholder="Apartment,suit,unit,etc.(optional)"
            />
          </div>
        </div>
        <div className="billing-page-item-fields">
          <p>Town/City</p>
          <input
            required
            type="text"
            name="Town_city"
            value={formData.Town_city}
            onChange={changeHandler}
          />
        </div>
        <div className="billing-page-item-fields">
          <p>State</p>
          <input
            required
            type="text"
            name="State"
            value={formData.State}
            onChange={changeHandler}
          />
        </div>
        <div className="billing-page-item-fields">
          <p>Pincode</p>
          <input
            required
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={changeHandler}
          />
        </div>
      </div>
      <div className="billing-page-right">
        <h3>Your Order</h3>
        <div>
          <div className="cartitems-total-items">
            <p>Subtotal</p>
            <p>Rs.{GetCartItemTotalAmount()}</p>
          </div>
          <hr />
          <div className="cartitems-total-items">
            <p>Shipping Fee</p>
            <p>Free</p>
          </div>
          <hr />
          <div className="cartitems-total-items">
            <h3>Total</h3>
            <h3>Rs.{GetCartItemTotalAmount()}</h3>
          </div>
          <hr />
        </div>
        {/* onClick={()=>{navigate("/myorders")}} */}
        
          <button type="submit" >
            PROCEED TO PAYMENT
          </button>
        
      </div>
    </form>
  );
}
