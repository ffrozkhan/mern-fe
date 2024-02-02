import React from "react";
import "./Layout.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../../pages/auth/Login";
import Home from "./Home";
import { useAuth } from "../../context/auth";
import RegisterUser from "../../pages/auth/RegisterUser";
import UserRoutes from "../routes/UserRoutes";
import UserProfile from "../../pages/user/UserProfile";

const Main = () => {
  const [auth, setAuth] = useAuth();
  return (
    <div className="mainParent">
      {/* <BrowserRouter> */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterUser />} />
        <Route path="/forgot-password" />
        <Route path="/" element={<Home />} />
        {/* https://localhost:3000/user */}
        <Route path="/user" element={<UserRoutes />}>
          <Route path="profile" element={<UserProfile />} />
        </Route>
        <Route />
      </Routes>
      {/* </BrowserRouter> */}
    </div>
  );
};

export default Main;
