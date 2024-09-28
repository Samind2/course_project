import { createBrowserRouter } from "react-router-dom"; 
import MainLayout from "../layoust/MainLayout.jsx"
import Add from "../pages/Add.jsx";
import Home from "../pages/Home.jsx";
import Dashboard from "../pages/dashboard/index.jsx";
import Edit from "../pages/Edit.jsx";
import Login from "../pages/Login.jsx"; 
import Register from "../pages/Register.jsx";
import ProtectedRoute from "../pages/ProtectedRoute.jsx";
import NotAllowed from "../pages/NotAllowed.jsx";

const router = createBrowserRouter([
  {
    path: "/", // เส้นทางเริ่มต้น
    element: <MainLayout />,
    errorElement: <NotAllowed />, // ระบุ errorElement
    children: [
      {
        path: "/", // เส้นทางไปหน้า Home
        element: <Home />,
      },
      {
        path: "/dashboard", // เส้นทางไปหน้า Dashboardฤ
        element: (
            <Dashboard />
        ),
      },
      {
        path: "/add", // เส้นทางไปหน้า Add
        element: (
          <ProtectedRoute>
            <Add />
          </ProtectedRoute>
        ),
      },
      {
        path: "/edit/:id", // ปรับเส้นทางไปหน้า Edit ให้รับ id
        element: (
          <ProtectedRoute>
            <Edit />
          </ProtectedRoute>
        ),
      },
      {
        path: "/login", // เส้นทางไปหน้า Login
        element: <Login />,
      },
      {
        path: "/register", // เส้นทางไปหน้า Register
        element: <Register />,
      },
      {
        path: "/not-allowed", // เส้นทางไปหน้า NotAllowed
        element: <NotAllowed />,
      },
    ],
  },
]);

export default router;
