import React from "react";
import "./Layout.css";
import { useAuth } from "../../context/auth";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [auth, setAuth] = useAuth();
  const handleUserLogout = () => {
    localStorage.removeItem("auth");
    setAuth({ user: null, token: "" });
  };
  return (
    <div className="navParent">
      <div className="leftNav">
        <h2>Exaltechs Ecommerce</h2>
      </div>
      <div className="rightNav">
        <Link to="" className="navLink">
          Home
        </Link>
        <Link to="" className="navLink">
          Products
        </Link>
        <Link to="" className="navLink">
          About
        </Link>
        {!auth?.user && (
          <Link to="/login" className="navLink">
            Login
          </Link>
        )}

        {!auth?.user && (
          <Link to="/register" className="navLink">
            Register
          </Link>
        )}
        {auth?.user?.fullname && (
          <div
            className="profileLinkContainer"
            style={{ display: "inline-block" }}
          >
            <Link to="" className="navLink" id="profileLink">
              {auth?.user?.fullname.split(" ")[0]}
            </Link>
            <div className="profileDropdown">
              <Link className="dropLinks" to="/user/profile">
                Your Profile
              </Link>
              <Link className="dropLinks" to="">
                Dashboard
              </Link>
              {auth?.user && (
                <Link
                  onClick={() => handleUserLogout()}
                  to="/login"
                  className="dropLinks"
                >
                  Logout
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
