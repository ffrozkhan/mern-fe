import { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  axios.defaults.headers.common["Authorization"] = auth?.token;

  useEffect(() => {
    const userData = localStorage.getItem("auth");
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      setAuth({
        ...auth,
        user: parsedUserData.data,
        token: parsedUserData.token,
      });
    }
  }, []);
  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
      {/* <App /> */}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext); //--> [auth, setAuth]

export { useAuth, AuthProvider };
