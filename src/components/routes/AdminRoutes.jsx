import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import LoadRedirect from "../../pages/auth/LoadRedirect";
import { useAuth } from "../../context/auth";
import axios from "axios";

const AdminRoutes = () => {
  const [auth, setAuth] = useAuth();
  const [proceed, setProceed] = useState(false);

  const adminAuthentication = async () => {
    const response = await axios.get(
      `http://localhost:2000/api/v1/auth/user-auth`
    );
    if (response.data.eligible) {
      setProceed(true);
    }
  };

  useEffect(() => {
    if (auth?.user?.role == 1) adminAuthentication();
  }, [auth?.token]);
  return proceed ? <Outlet /> : <LoadRedirect />;
};

export default AdminRoutes;
