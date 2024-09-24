import api from "./api"; 
import TokenService from "./token.server"; // นำเข้า TokenService

const API_URL = "/api/v1/auth/"; // กำหนด API_URL

const register = async (Username, email, password) => {
  return await api.post(`${API_URL}signup`, { Username, email, password });
};

const login = async (Username, password) => {
  const response = await api.post(`${API_URL}signin`, { Username, password });
  if (response.data.accessToken) {
    TokenService.setUser(response.data); // เก็บข้อมูลผู้ใช้เมื่อเข้าสู่ระบบสำเร็จ
  }
  return response;
};

const logout = () => {
  TokenService.removeUser(); // ลบข้อมูลผู้ใช้เมื่อออกจากระบบ
};

const AuthService = {
  register,
  login,
  logout,
};

export default AuthService; 
