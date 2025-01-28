// import './App.css'
import ExploreSection from "./Componants/ExploreSection/ExploreSection";
import Navbar from "./Componants/Navbar/Navbar";
import { Routes, Route, useLocation } from "react-router-dom";
import LoginSignup from "./Pages/LoginSignup";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
import Location from "./Pages/Location";
import HeroSection from "./Componants/HeroSection/HeroSection";
import Footer from "./Componants/Footer/Footer";
import BillingPage from "./Componants/BillingPage/BillingPage";
import MyOrders from "./Pages/MyOrders/MyOrders";

function App() {

  const location = useLocation();

  const isBillingPage = location.pathname === "/billing";

  return (
    <>
      {!isBillingPage && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeroSection/>
              <ExploreSection />
            </>
          }
        />
        <Route path="/Indore" element={<Location location="Indore"/>} />
        <Route path="/ujjain" element={<Location location="ujjain"/>} />
        <Route path="/Mumbai" element={<Location location="Mumbai"/>} />
        <Route path="/Banglore" element={<Location location="Banglore"/>}/>
        <Route path="/Signup" element={<LoginSignup />} />
        <Route path="/product" element={<Product />}>
          <Route path=":productid" element={<Product />} />
        </Route>
        <Route path="/Cart" element={<Cart/>} />
        <Route path="/billing" element={<BillingPage/>}/>
        <Route path="/myorders" element={<MyOrders/>}/>
      </Routes>
      {!isBillingPage && <Footer/>}
      </>
  );
}

export default App;
