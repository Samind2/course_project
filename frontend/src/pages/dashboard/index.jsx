import { Outlet } from "react-router-dom";
import { CourseProvider } from "../../contexts/course.context";
import Footer from "../../component/Footer";
import Card from "../../component/card";
import Search from "../../component/Search"; // อย่าลืม import Search
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]); // สถานะสำหรับเก็บการค้นหา

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/v1/courses");
        const data = await response.json();
        console.log(data);
        setCourses(data); // ตั้งค่า courses ด้วยข้อมูลที่ได้
        setFilteredCourses(data); // ตั้งค่าให้ filteredCourses เป็น data เริ่มต้น
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
          <Search courses={courses} setFilterCourses={setFilteredCourses} /> {/* เพิ่ม Search component */}
          <div className="flex flex-wrap justify-center">
            {filteredCourses.length > 0 ? ( // ตรวจสอบว่า filteredCourses มีข้อมูลหรือไม่
              filteredCourses.map(course => (
                <Card key={course.id} className="card" {...course} />
              ))
            ) : (
              <p className="text-center">No courses found</p> // แสดงข้อความถ้าไม่มีการ์ด
            )}
          </div>
          <Outlet />
        </div>
        <Footer />
      </div>
    </CourseProvider>
  );
};

export default Dashboard;
