import React from "react";
import "./Layout.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../../pages/auth/Login";
import Home from "./Home";
import { useAuth } from "../../context/auth";
import RegisterUser from "../../pages/auth/RegisterUser";
import UserRoutes from "../routes/UserRoutes";
import UserProfile from "../../pages/user/UserProfile";
import PageNotFound from "../../pages/auth/PageNotFound";
import AdminProfile from "../../pages/admin/AdminProfile";
import AdminRoutes from "../routes/AdminRoutes";

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
        <Route path="/dashboard/user/" element={<UserRoutes />}>
          <Route path="profile" element={<UserProfile />} />
        </Route>
        <Route path="/dashboard/admin" element={<AdminRoutes />}>
          <Route path="profile" element={<AdminProfile />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      {/* </BrowserRouter> */}
    </div>
  );
};

export default Main;
