import React, { useContext } from "react";
import './CartItems.css'
import { ExploreContext } from "../../Context/ExploreContext";
import cross_icon from '../Assets/cross-icon.png'
import {Link} from 'react-router-dom';

export default function CartItems(){
    const {GetCartItemTotalAmount,All_products,cartItems,RemoveFromCart} = useContext(ExploreContext);
    return(
        <div className="cart-items">
            <div className="cart-items-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>               
            </div>
            <hr />
            {All_products.map((e) => {
                if(cartItems[e.id] > 0){
                 return <div> 
                           <div className="cart-items-format cart-items-format-main">
                             <img src={e.image} alt="" className="carticon-product-icon" />
                             <p>{e.name}</p>
                             <p>Rs.{e.approx_price}</p>
                             <button className="cartitem-quantity">{cartItems[e.id]}</button>
                             <p>Rs.{e.approx_price*cartItems[e.id]}</p>
                             <img src={cross_icon} onClick={() => RemoveFromCart(e.id)} alt="" className="remove-icon" />
                           </div>
                           <hr />
                        </div>  
                }
                return null;
            })}

            <div className="cartitems-down">
                <div className="cartitems-total">
                  <h1>Cart Items</h1>
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
                   <Link to='/billing'><button>PLACE ORDER</button></Link> 
                </div>
            </div>

            <div className="cartitems-promocode">
                <p>If you have a promo-code enter it here</p>
                <div className="cartitem-promobox">
                    <input type="text" placeholder="promo code" />
                    <button>Submit</button>
                </div>
            </div>
        </div>
    )
}