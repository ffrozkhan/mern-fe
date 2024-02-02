import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const LoadRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();

  console.log("Load Redirect");

  useEffect(() => {
    const test = setTimeout(() => {
      navigate("/");
    }, 5000);
    return () => clearTimeout(test);
  }, [navigate, location]);
  return (
    <div>
      <h1>Redirecting to you</h1>
    </div>
  );
};

export default LoadRedirect;
