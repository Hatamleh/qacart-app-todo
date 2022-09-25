import { useState, createContext, useEffect } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

const initUser = () => {
  const access_token = Cookies.get("access_token");
  const userID = Cookies.get("userID");
  const firstName = Cookies.get("firstName");

  let data;
  firstName && userID && access_token ? (data = { access_token, userID, firstName }) : (data = null);
  return data;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(initUser);

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};
