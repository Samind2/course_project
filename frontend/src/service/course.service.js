import api from "./api";

const getAllCourses = () => {
  return api.get("/api/v1/courses"); // ดึงข้อมูลหลักสูตรทั้งหมด
};

const createCourse = (data) => {
  return api.post("/api/v1/courses", data); // สร้างหลักสูตรใหม่
};

const updateCourse = (id, data) => {
  return api.put(`/api/v1/courses/${id}`, data); // อัปเดตหลักสูตรที่มีอยู่
};

const deleteCourse = (id) => {
  return api.delete(`/api/v1/courses/${id}`); // ลบหลักสูตรที่มีอยู่
};

const courseservice = {
  getAllCourses,
  createCourse,
  updateCourse,
  deleteCourse,
};

export default courseservice; 
