import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function RegisterButton() {
  const [user, setUser] = useState({
    Username: "", // เปลี่ยนจาก userName เป็น Username
    email: "",
    password: "",
    roles: ["Student"], // กำหนดบทบาทเริ่มต้น
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!user.Username) newErrors.Username = "Username is required"; // เปลี่ยนจาก userName เป็น Username
    if (!user.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(user.email))
      newErrors.email = "Email is invalid";
    if (!user.password) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
    }
    setErrors({});
    setLoading(true);
  
    // อัปเดตข้อมูลผู้ใช้เพื่อรวมบทบาทที่ถูกต้อง
    const userData = {
        ...user,
        roles: ['Student'], // กำหนดบทบาทที่เหมาะสมที่นี่
    };

    try {
        console.log("User data being sent:", userData);
        const response = await axios.post(
            "http://localhost:5000/api/v1/auth/signup",
            userData
        );
        Swal.fire("Registration successful", response.data.message, "success");
        setUser({
            Username: "",
            email: "",
            password: "",
            roles: [''], // รีเซ็ตบทบาทเมื่อสำเร็จ
        });
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || "An error occurred";
        console.error("Registration error:", errorMessage);
        Swal.fire("Registration error", errorMessage, "error");
    } finally {
        setLoading(false);
    }
};

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{ backgroundColor: "#C9DABF" }}
    >
      <div
        className="w-full max-w-md p-10 space-y-8 rounded-lg shadow-xl"
        style={{ backgroundColor: "#9CA986" }}
      >
        <h2 className="text-3xl font-bold text-center" style={{ color: "#5F6F65" }}>
          Create an Account
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="Username" // เปลี่ยนจาก userName เป็น Username
              className="block text-sm font-medium"
              style={{ color: "#5F6F65" }}
            >
              Username
            </label>
            <input
              type="text"
              id="Username" // เปลี่ยนจาก userName เป็น Username
              name="Username" // เปลี่ยนจาก userName เป็น Username
              value={user.Username} // เปลี่ยนจาก userName เป็น Username
              onChange={handleChange}
              className="block w-full px-4 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              style={{
                borderColor: "#808D7C",
                backgroundColor: "#C9DABF",
                color: "#5F6F65",
              }}
              placeholder="Enter your username"
            />
            {errors.Username && ( // เปลี่ยนจาก userName เป็น Username
              <p className="mt-2 text-sm" style={{ color: "#FF0000" }}>
                {errors.Username}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium"
              style={{ color: "#5F6F65" }}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="block w-full px-4 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              style={{
                borderColor: "#808D7C",
                backgroundColor: "#C9DABF",
                color: "#5F6F65",
              }}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="mt-2 text-sm" style={{ color: "#FF0000" }}>
                {errors.email}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium"
              style={{ color: "#5F6F65" }}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              className="block w-full px-4 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              style={{
                borderColor: "#808D7C",
                backgroundColor: "#C9DABF",
                color: "#5F6F65",
              }}
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="mt-2 text-sm" style={{ color: "#FF0000" }}>
                {errors.password}
              </p>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="flex justify-center w-full px-4 py-2 text-sm font-medium rounded-md shadow-sm"
              style={{
                backgroundColor: "#808D7C",
                color: "#C9DABF",
              }}
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterButton;
