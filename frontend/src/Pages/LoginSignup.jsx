import React, { useContext, useState } from "react";
import "./CSS/LoginSignup.css";
import { ExploreContext } from "../Context/ExploreContext";

export default function LoginSignup() {
  const [State, setState] = useState("Login");
  const {url} = useContext(ExploreContext);

  const [Formdata, SetFormdata] = useState({
    name: "",
    email: "",
    password: "",
  });

  const ChangeHandler = (e) => {
    SetFormdata({ ...Formdata, [e.target.name]: e.target.value });
  };

  const Login_Signup = async (event) => {
    event.preventDefault();

    if (State === "Login") {
      let responseData;
      await fetch(`${url}/users/login`, {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "Content-type": "application/json",
        },
        body: JSON.stringify(Formdata),
      })
        .then((response) => response.json())
        .then((data) => (responseData = data));

      if (responseData.success) {
        localStorage.setItem("auth-token", responseData.token);
        window.location.replace("/");
      } else {
        alert(responseData.errors);
      }
    } else {
      let responseData;

        await fetch(`${url}/users/Signup`, {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "Content-type": "application/json",
        },
        body: JSON.stringify(Formdata),
        })
        .then((response) => response.json())
        .then((data) => (responseData = data));

      console.log(responseData);

      if (responseData.success) {
        localStorage.setItem("auth-token", responseData.token);
        setTimeout(() => {
          window.location.replace("/");
        }, 1000);
      } else {
        alert(responseData.errors);
      }
    }
  };

  // const Login = async () =>{
  //     // console.log("Login function executed",Formdata);
  //     let responseData;
  //     await fetch('http://localhost:4000/users/login',{
  //         method: 'POST',
  //         headers:{
  //             Accept: 'application/form-data',
  //             'Content-type': 'application/json'
  //         },
  //         body: JSON.stringify(Formdata)
  //     }).then((response)=>response.json()).then((data)=>responseData=data);

  //     if(responseData.success){
  //         localStorage.setItem('auth-token',responseData.token);
  //         window.location.replace("/");
  //     }
  //     else{
  //         alert(responseData.errors);
  //     }
  // };

  // const Signup = async () =>{
  //     // console.log("Signup function executed",Formdata);

  //     let responseData;

  //     await fetch('http://localhost:4000/users/Signup',{
  //         method: 'POST',
  //         headers:{
  //             Accept: 'application/form-data',
  //             'Content-type': 'application/json'
  //         },
  //         body: JSON.stringify(Formdata) ,
  //     }).then((response)=>response.json()).then((data)=>responseData = data)

  //     console.log(responseData);

  //     if(responseData.success){
  //         localStorage.setItem('auth-token',responseData.token);
  //         setTimeout(() => {
  //             window.location.replace("/");
  //         }, 1000);
  //     }
  //     else{
  //         alert(responseData.errors);
  //     }
  // };

  return (
    <div className="loginSignup">
      <form onSubmit={Login_Signup} className="loginSignup-container">
        <h1>{State}</h1>
        <div className="loginSignup-fields">
          {State === "Sign up" ? (
            <input
              type="text"
              name="name"
              value={Formdata.name}
              onChange={ChangeHandler}
              placeholder="Your Name"
              required
            />
          ) : (
            <></>
          )}
          <input
            type="email"
            name="email"
            value={Formdata.email}
            onChange={ChangeHandler}
            placeholder="Email Address"
            required
          />
          <input
            type="password"
            name="password"
            onChange={ChangeHandler}
            value={Formdata.password}
            placeholder="Password"
            required
          />
        </div>
        {/* onClick={()=>{State === 'Sign up'?Signup():Login()}} */}
        <button type="submit">
          {State === "Sign up" ? "Create Account" : "Login"}
        </button>
        {State === "Sign up" ? (
          <p className="loginSignup-login">
            Already have an account?{" "}
            <span
              onClick={() => {
                setState("Login");
              }}
            >
              Login Here
            </span>
          </p>
        ) : (
          <p className="loginSignup-login">
            Create an account?{" "}
            <span
              onClick={() => {
                setState("Sign up");
              }}
            >
              Click Here
            </span>
          </p>
        )}
        <div className="loginSignup-agree">
          <input type="checkbox" required />
          <p>By continuing, i agree to terms of use and privacy policy.</p>
        </div>
      </form>
    </div>
  );
}
