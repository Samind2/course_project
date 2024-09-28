import { useState, useEffect } from "react";
import Course from "../component/Course"
import courseservice from "../service/course.service";
import Swal from "sweetalert2";

function Home() {
  const [courses, setCourses] = useState([]);
  const [filterCourses, setFilterCourses] = useState([]);

  useEffect(() => {
    const getCourses = async () => {
      try {
        const response = await courseservice.getAllCourses();
        if (response.status === 200) {
          setCourses(response.data);
          setFilterCourses(response.data);
        }
      } catch (error) {
        Swal.fire({
          title: "Get All Courses",
          text: error?.response?.data?.message || error.message,
          icon: "error",
        });
      }
    };
    getCourses();
  }, []);

  return (
    <div className="container flex flex-col items-center mx-auto">
      <Course courses={filterCourses} /> {/* ใช้คอมโพเนนต์ Course */}
    </div>
  );
}

export default Home;