import api from "./api";

const getAllCourses = () => {
  return api.get("/api/v1/courses");
};

const createCourse = (data) => {
  return api.post("/api/v1/courses", data);
};

const updateCourse = (id, data) => {
  return api.put(`/api/v1/courses/${id}`, data);
};

const deleteCourse = (id) => {
  return api.delete(`/api/v1/courses/${id}`);
};

const courseservice = {
  getAllCourses,
  createCourse,
  updateCourse,
  deleteCourse,
};

export default courseservice;
