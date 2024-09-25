import  { useState } from "react";
import AuthService from "../service/auth.service";
import { useCourse } from "../contexts/course.context"; // ใช้ useCourse แทน
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Login() {
  const [user, setUser] = useState({
    Username: "",
    password: "",
  });

  const { login } = useCourse(); // เรียกใช้ login จาก CourseContext
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((user) => ({ ...user, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Attempting to log in with:", user); // แสดงค่าผู้ใช้ที่ส่งไป
      const response = await AuthService.login(user.Username, user.password);
      console.log(response); // สำหรับการดีบัก

      if (response.status === 200) {
        const currentUser = response.data;
        login(currentUser);
        Swal.fire({
          icon: 'success',
          title: 'Login successful!',
          text: 'You will be redirected to the homepage.',
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          navigate('/'); // เปลี่ยนเส้นทางหลังจากปิดแจ้งเตือน
        });

        setUser({
          Username: '',
          password: '',
        });
      }
    } catch (error) {
      console.error('Login error:', error); // สำหรับการดีบัก
      const errorMessage = error.response?.data?.message || 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ.';
      Swal.fire({
        icon: 'error',
        title: 'Login failed!',
        text: errorMessage,
        timer: 3000,
        showConfirmButton: true,
      });
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{ backgroundColor: "#F7F7F8" }}
    >
      <div
        className="w-full max-w-md p-8 space-y-8 rounded-lg shadow-2xl"
        style={{ backgroundColor: "#7C93C3" }}
      >
        <h2 className="text-3xl font-bold text-center" style={{ color: "#1E2A5E" }}>
          Login
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="Username"
              className="block text-sm font-medium"
              style={{ color: "#1E2A5E" }}
            >
              Username
            </label>
            <input
              type="text"
              id="Username"
              name="Username"
              value={user.Username}
              onChange={handleChange}
              className="block w-full px-3 py-2 mt-1 border rounded-md shadow-sm sm:text-sm"
              style={{
                borderColor: "#D1E9F6",
                backgroundColor: "#D1E9F6",
                color: "#1E2A5E",
              }}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium"
              style={{ color: "#1E2A5E" }}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              className="block w-full px-3 py-2 mt-1 border rounded-md shadow-sm sm:text-sm"
              style={{
                borderColor: "#D1E9F6",
                backgroundColor: "#D1E9F6",
                color: "#1E2A5E",
              }}
            />
          </div>
          <div>
            <button
              type="submit"
              className="flex justify-center w-full px-4 py-2 text-sm font-medium rounded-md shadow-sm"
              style={{
                backgroundColor: "#1E2A5E",
                color: "#C9DABF",
              }}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
