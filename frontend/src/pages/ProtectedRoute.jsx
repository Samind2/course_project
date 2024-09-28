import { Navigate } from "react-router-dom";
import { useCourse } from "../contexts/course.context";

const ProtectedRoute = ({ children }) => {
    const { currentUser: user } = useCourse(); // ใช้ currentUser จาก context
    console.log("Current User:", user); // แสดงค่าผู้ใช้ปัจจุบันใน console
  
    if (!user) {
      return <Navigate to="/login" />; // ย้ายไปหน้า Login ถ้าไม่มีผู้ใช้
    }
  
    // ตรวจสอบบทบาท
    if (user.roles.includes("ROLES_Student")) {
      return <Navigate to="/NotAllowed" />; // ย้ายไปหน้า NotAllowed ถ้าเป็น Student
    }
  
    if (user.roles.includes("ROLE_INSTRUCTOR") || user.roles.includes("ROLE_STAFF")) {
        return children; // อนุญาตให้เข้าถึงถ้าเป็น Instructor หรือ Staff
      }
      
  
    return <Navigate to="/NotAllowed" />; // ย้ายไปหน้า NotAllowe ในกรณีที่ไม่มีสิทธิ์
};

export default ProtectedRoute;
