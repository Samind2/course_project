import { createBrowserRouter } from "react-router-dom"; 
import MainLayout from "../layoust/MainLayout.jsx";
import Add from "../pages/Add.jsx";
import Home from "../pages/Home.jsx";
import Dashboard from "../pages/dashboard"; // แก้ไขชื่อจาก Dashbard เป็น Dashboard
import Edit from "../pages/Edit.jsx";
import Login from "../pages/Login.jsx"; // นำเข้า Login component
import Register from "../pages/Register.jsx"

// กำหนดตัวแปรสำหรับเส้นทาง
const ROUTES = {
  HOME: "/",
  DASHBOARD: "/dashboard",
  ADD: "/add",
  EDIT: "/edit/:id",
  LOGIN: "/login",
  REGISTER: "/register"
};

const router = createBrowserRouter([
  {
    path: ROUTES.HOME, 
    element: <MainLayout />,
    children: [
      {
        path: ROUTES.HOME, 
        element: <Home />, 
      },
      {
        path: ROUTES.DASHBOARD, 
        element: <Dashboard />, 
      },
      {
        path: ROUTES.ADD, 
        element: <Add />, 
      },
      {
        path: ROUTES.EDIT, 
        element: <Edit />, 
      },
      {
        path: ROUTES.LOGIN, // เพิ่มเส้นทางสำหรับ login
        element: <Login />, // คอมโพเนนต์สำหรับการเข้าสู่ระบบ
      },
      {
        path: ROUTES.REGISTER, // เพิ่มเส้นทางสำหรับ login
        element: <Register />, // คอมโพเนนต์สำหรับการเข้าสู่ระบบ
      },
      {
        path:"user",
        element:<div>user</div>
      },
    ],
  },
]);

export default router;
