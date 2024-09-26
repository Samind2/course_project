import { createContext, useContext, useEffect, useState } from "react";
import courseservice from "../service/course.service"; // Import course service
import Swal from "sweetalert2"; // Import SweetAlert2 for alerts

export const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentUser, setCurrentUser] = useState(getCurrentUser());

    function getCurrentUser() {
        const temp = localStorage.getItem("user");
        const savedUser = JSON.parse(temp);
        console.log("Current User from Local Storage:", savedUser); // ดูค่าผู้ใช้
        return savedUser || null;
    }

    const fetchCourses = async () => {
        setLoading(true);
        try {
            const response = await courseservice.getAllCourses();
            if (response.status === 200) {
                setCourses(response.data);
            } else {
                throw new Error("Failed to fetch courses");
            }
        } catch (error) {
            console.error(error);
            setError(error.message);
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: error.message,
                timer: 3000,
                showConfirmButton: true,
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    const login = (user) => {
        console.log("User Logging In:", user); // ดูค่าผู้ใช้ที่ล็อกอิน
        setCurrentUser(user);
        localStorage.setItem("user", JSON.stringify(user));
    };

      const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem("user"); // ลบข้อมูลผู้ใช้เมื่อออกจากระบบ
      };

    const addCourse = async (course) => {
        try {
            const response = await courseservice.createCourse(course);
            if (response.status === 200) {
                setCourses((prev) => [...prev, response.data]);
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: error.message,
                timer: 3000,
                showConfirmButton: true,
            });
        }
    };

    const updateCourse = async (id, newCourse) => {
        try {
            const response = await courseservice.updateCourse(id, newCourse);
            if (response.status === 200) {
                setCourses((prev) =>
                    prev.map((course) =>
                        course.id === id ? { ...course, ...response.data } : course
                    )
                );
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: error.message,
                timer: 3000,
                showConfirmButton: true,
            });
        }
    };

    const deleteCourse = async (id) => {
        try {
            const response = await courseservice.deleteCourse(id);
            if (response.status === 200) {
                setCourses((prev) => prev.filter((course) => course.id !== id));
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: error.message,
                timer: 3000,
                showConfirmButton: true,
            });
        }
    };

    return (
        <CourseContext.Provider
            value={{ courses, loading, error, addCourse, updateCourse, deleteCourse, login, logout, currentUser }}
        >
            {children}
        </CourseContext.Provider>
    );
};

export const useCourse = () => useContext(CourseContext);