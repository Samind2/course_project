import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from "react-router-dom"; // นำเข้า RouterProvider จาก react-router-dom เพื่อใช้ในการจัดการระบบเส้นทาง (routing)
import router from "./router/Router"; // นำเข้าอ็อบเจกต์ router ที่เกี่ยวข้องจากไฟล์ ./router/Router
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
