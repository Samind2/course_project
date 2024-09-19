import { useState, useEffect } from 'react';
import Card from './card'; // ปรับเส้นทางให้ตรงกับที่เก็บไฟล์ของคุณ
import Search from './Search';


const Course = () => {
    const [courses, setCourses] = useState([]); // สถานะเพื่อเก็บข้อมูลคอร์ส
    const [filteredCourses, setFilteredCourses] = useState([]); // สถานะสำหรับคอร์สที่กรองแล้ว
    const [loading, setLoading] = useState(true); // สถานะสำหรับการโหลดข้อมูล
    const [searchTerm, setSearchTerm] = useState(''); // สถานะสำหรับคำค้นหา
  
    useEffect(() => {
      // ฟังก์ชันเพื่อดึงข้อมูลคอร์สจาก API
      const fetchCourses = async () => {
        try {
          const response = await fetch("http://localhost:5000/courses");
          if (response.ok) {
            const data = await response.json();
            setCourses(data); // เก็บข้อมูลคอร์สใน state
            setFilteredCourses(data); // ตั้งค่า filteredCourses ให้เป็นข้อมูลคอร์สทั้งหมดเริ่มต้น
          } else {
            console.error("Failed to fetch courses");
          }
        } catch (error) {
          console.error("Error fetching courses:", error);
        } finally {
          setLoading(false); // การโหลดข้อมูลเสร็จสิ้น
        }
      };
  
      fetchCourses(); // เรียกใช้ฟังก์ชันเพื่อดึงข้อมูล
    }, []);
  
    useEffect(() => {
      // ฟังก์ชันสำหรับการค้นหา
      const handleSearch = () => {
        if (searchTerm === '') {
          setFilteredCourses(courses); // ถ้าไม่มีคำค้นหา ให้แสดงคอร์สทั้งหมด
        } else {
          const filtered = courses.filter(course =>
            course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.courseCode.toLowerCase().includes(searchTerm.toLowerCase())
          );
          setFilteredCourses(filtered);
        }
      };
  
      handleSearch(); // เรียกใช้ฟังก์ชันค้นหาทุกครั้งที่ searchTerm เปลี่ยน
    }, [searchTerm, courses]);
  
    if (loading) {
      return <div>Loading...</div>; // แสดงข้อความขณะรอข้อมูล
    }
  
    return (
      <div className="course-page">
        <h1 className="text-2xl font-bold mb-4">Courses</h1>
        <Search onSearch={setSearchTerm} /> {/* ใช้ Search component */}
        <div className="flex flex-wrap gap-4">
          {/* แสดงรายการคอร์สในรูปแบบของ Card */}
          {filteredCourses.map(course => (
            <Card
              key={course.id}
              id={course.id}
              courseCode={course.courseCode}
              name={course.name}
              description={course.description}
              credits={course.credits}
            />
          ))}
        </div>
      </div>
    );
  };
  
  export default Course;