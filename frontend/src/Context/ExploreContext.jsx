import React, { createContext, useEffect, useState } from "react";
// import Card_data from "../Componants/Assets/ExploreSectionData";
// import CartItems from "../Componants/CartItems/CartItems";

export const ExploreContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for(let index = 1 ; index < 300 + 1 ; index ++)
    {
        cart[index] = 0;
    }
    return cart;
}

const ExploreContextProvider = (props) => {

    const url = 'http://localhost:4000';

    const [All_products,setAll_products] = useState([]);

    const [cartItems, setcartItems] = useState(getDefaultCart());

    const fetchUsersCart = async () =>{
        if(localStorage.getItem('auth-token')){
            fetch(`${url}/cart/getcart`,{
                method: 'POST',
                headers:{
                    Accept: 'application/form-data',
                    'Content-type': 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`
                },
                body: ""
            }).then((response)=>response.json())
            .then((data)=>setcartItems(data));
        }
    }

    useEffect(() => {
         fetch(`${url}/products/allproducts`)
        .then((response)=>response.json())
        .then((data)=>setAll_products(data.data));

        fetchUsersCart();
    }, [])
     
    const AddToCart =(itemid) =>{
        setcartItems((prev)=>{
            const updatedCart = {...prev, [itemid]: prev[itemid] + 1};
            console.log("Updated cart",updatedCart);
            return updatedCart;
        })
        if(localStorage.getItem('auth-token')){
            fetch(`${url}/cart/addtocart`,{
                method: 'POST',
                headers:{
                    Accept: 'application/form-data',
                    'auth-token' : `${localStorage.getItem('auth-token')}`,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({"itemId":itemid})
            }).then((response)=>response.json()).then((data)=>console.log(data));
        }
        // ({...prev,[itemid]:prev[itemid]+1})
        // console.log(cartItems);
    }

    const RemoveFromCart =(itemid) =>{
        setcartItems((prev)=> ({...prev,[itemid]:prev[itemid]-1}))
        if(localStorage.getItem('auth-token')){
            fetch(`${url}/cart/removefromcart`,{
                method: 'POST',
                headers:{
                    Accept: 'application/form-data',
                    'auth-token' : `${localStorage.getItem('auth-token')}`,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({"itemId":itemid})
            }).then((response)=>response.json()).then((data)=>console.log(data));
        }
    }

    const GetCartItemTotalAmount = () => {
        let TotalAmount = 0;
        for(const item in cartItems){
            if(cartItems[item] > 0){
                let iteminfo = All_products.find((product) => product.id === Number(item));
                TotalAmount += iteminfo.approx_price * cartItems[item];
            }
        }
        return TotalAmount;
    }

    const GetTotalCartItems =() =>{
        let Total_CartItems = 0;
        for(const item in cartItems){
            if(cartItems[item] > 0){
                Total_CartItems += cartItems[item];
            }
        }
        return Total_CartItems;
    }
    
    const contextValue = {GetTotalCartItems,GetCartItemTotalAmount,fetchUsersCart, All_products ,cartItems ,AddToCart ,RemoveFromCart,url};

    return(
    <ExploreContext.Provider value={contextValue}>
        {props.children}
     </ExploreContext.Provider>
     )   
}
export default ExploreContextProvider;