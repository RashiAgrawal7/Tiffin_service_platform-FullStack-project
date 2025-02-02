import React from "react";
import Navbar from "./Componants/Navbar/Navbar";
import Admin from "./Pages/Admin/Admin";
import { ToastContainer, toast } from 'react-toastify';

export default function App(){
  
  return(
    <div>
      <ToastContainer/>
      <Navbar/>
      <Admin />
    </div>
  )
}