import { Outlet } from "react-router-dom";
import { CourseProvider } from "../../contexts/course.context";
import Footer from "../../component/Footer";
import Card from "../../component/card";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/v1/courses");
        const data = await response.json();
        console.log(data); // เพิ่มบรรทัดนี้
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <CourseProvider>
    <div className="flex flex-col min-h-screen dashboard">
      <div className="flex-grow">
        <h1 className="text-center text-2xl font-bold">Course Dashboard</h1>
        <div className="flex flex-wrap justify-center">
          {courses.map(course => (
            <Card key={course.id} className="card" {...course} />
          ))}
        </div>
        <Outlet /> {/* ถ้าคุณยังต้องการแสดงเนื้อหาย่อย */}
      </div>
      <Footer />
    </div>
  </CourseProvider>
);
};

export default Dashboard;
