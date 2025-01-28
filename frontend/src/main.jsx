import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import ExploreContextProvider from "./Context/ExploreContext";
// import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ExploreContextProvider>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </ExploreContextProvider>
  </React.StrictMode>,
)
