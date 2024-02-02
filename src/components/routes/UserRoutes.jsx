import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import axios from "axios";
import { Outlet } from "react-router-dom";
import LoadRedirect from "../../pages/auth/LoadRedirect";

const UserRoutes = () => {
  const [auth, setAuth] = useAuth();
  const [proceed, setProceed] = useState(false);
  const userAuthentication = async () => {
    const response = await axios.get(
      `http://localhost:2000/api/v1/auth/user-auth`
    );
    console.log(response);
    if (response.data.eligible) {
      setProceed(true);
    }
  };
  useEffect(() => {
    if (auth?.token) userAuthentication();
  }, [auth?.token]);
  return proceed ? <Outlet /> : <LoadRedirect />;
};

export default UserRoutes;
