import React from "react";
import { useAuth } from "../../context/auth";

const Home = () => {
  const [auth, setAuth] = useAuth();
  return (
    <div>
      <h1>Home Component</h1>
      <h1>Hello {auth?.user?.fullname}!</h1>
    </div>
  );
};

export default Home;
