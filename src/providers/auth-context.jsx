import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const decodeJwt = (token) => {
    const decoded = jwtDecode(token);
    const claim = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/";
    return {
      token,
      name: decoded[claim + "name"] + " " + decoded[claim + "surname"],
      email: decoded[claim + "emailaddress"],
    };
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = decodeJwt(token);
      setUser(decoded);
    }
    setLoading(false);
  }, []);

  const setToken = (token) => {
    localStorage.setItem("token", token);
    const decoded = decodeJwt(token);
    setUser(decoded);
  };

  const removeToken = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setToken, removeToken, isAuthenticated: !!user }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
