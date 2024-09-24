const getLocalAccessToken = () => {
  const user = getUser();
  return user?.accessToken; // คืนค่า accessToken ของผู้ใช้
};

const setUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user)); // เก็บข้อมูลผู้ใช้ใน localStorage
};

const getUser = () => {
  return JSON.parse(localStorage.getItem("user")); // คืนค่าข้อมูลผู้ใช้จาก localStorage
};

const removeUser = () => {
  localStorage.removeItem("user"); // ลบข้อมูลผู้ใช้จาก localStorage
};

const tokenservice = {
  getLocalAccessToken,
  setUser,
  getUser,
  removeUser,
};

export default tokenservice; 
