import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const LoadRedirect = ({ path = "/login" }) => {
  const navigate = useNavigate();
  const location = useLocation();

  console.log("Load Redirect");

  useEffect(() => {
    // console.log(location);
    const test = setTimeout(() => {
      navigate(path, { state: location.pathname });
    }, 5000);
    return () => clearTimeout(test);
  }, [navigate, path, location]);
  return (
    <div>
      <h1>Redirecting to you</h1>
    </div>
  );
};

export default LoadRedirect;
