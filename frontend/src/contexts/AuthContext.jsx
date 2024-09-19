import { useState, useContext, createContext, useEffect } from "react";
import AuthService from "../services/auth.service";

const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getUser);
  const login = (user) => setUser(user);
  const logout = () => {
    AuthService.logout();
    setUser(null); //ทำให้ค่าเป็นปัจจุบัน หลังจาก logout แล้ว
  };

  function getUser(){
    const temp = localStorage.getItem("user");
    const savedUser = JSON.parse(temp);
    return savedUser || null; //ทำให้ค่าเป็นปัจจุบัน หรือ ล่าสุด เสมอ
  }
  useEffect(() => {
    const temp = JSON.stringify(user);
    localStorage.setItem("user", temp);
  }, [user]);


  
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuthContext = () => useContext(AuthContext);