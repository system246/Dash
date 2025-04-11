import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate, Router } from "react-router-dom";
import Nav from "./Compo/Nav";
import Sidebar from "./Compo/Sidebar";
import Dasbrd from "./Compo/DashBoard/Dasbrd";
import Valid from "./Compo/DashBoard/Valid";
import Category from "./Compo/DashBoard/Category";
import AllBndle from "./Compo/DashBoard/AllCateBndl";
import AddCategory from "./Compo/DashBoard/AddCategory";
import AddValidty from "./Compo/DashBoard/AddValidity";
import Signup from "./Compo/Login/Sign_up";
import Signin from "./Compo/Login/Sign_in";

const AppLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  // Watch for login status change
  useEffect(() => {
    const loginStatus = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loginStatus);

    // Redirect to login if not logged in and trying to access protected route
    const isAuthRoute = location.pathname === "/" || location.pathname === "/signin";
    if (!loginStatus && !isAuthRoute) {
      navigate("/signin");
    }
  }, [location]);

  const isAuthRoute = location.pathname === "/" || location.pathname === "/signin";

  return (
    <>
      {isLoggedIn && !isAuthRoute && <Nav />}
      {isLoggedIn && !isAuthRoute && <Sidebar />}

      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/Dash" element={<Dasbrd />} />
        <Route path="/category" element={<Category />} />
        <Route path="/allbndl/:categoryName" element={<AllBndle />} />
        <Route path="/valid/:categoryName" element={<Valid />} />
        <Route path="/addC" element={<AddCategory />} />
        <Route path="/emp" element={<AddValidty />} />
      </Routes>
      
    </>
  );
};

export default AppLayout;
