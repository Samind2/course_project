const Course = require("../models/Course.models") // นำเข้า Course

// สร้างรายวิชาใหม่
exports.create = async (req, res) => {
  const { courseCode, name, description, credits } = req.body;

  if (!courseCode || !name || !credits) {
    return res.status(400).send({ message: "Required fields are missing" });
  }

  try {
    const newCourse = await Course.create({ courseCode, name, description, credits });
    res.status(201).send(newCourse);
  } catch (error) {
    res.status(500).send({
      message: error.message || "An error occurred while creating the course.",
    });
  }
};

// ดึงข้อมูลรายวิชาทั้งหมด
exports.getAll = async (req, res) => {
  try {
    const courses = await Course.findAll();
    res.send(courses);
  } catch (error) {
    res.status(500).send({
      message: error.message || "An error occurred while retrieving the courses.",
    });
  }
};

// ดึงข้อมูลรายวิชาตาม ID
exports.getById = async (req, res) => {
  const id = req.params.id;
  try {
    const course = await Course.findByPk(id);
    if (!course) {
      res.status(404).send({ message: "Course not found with id " + id });
    } else {
      res.send(course);
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "An error occurred while retrieving the course.",
    });
  }
};

// อัปเดตรายวิชา
exports.update = async (req, res) => {
  const id = req.params.id;
  try {
    const [updated] = await Course.update(req.body, {
      where: { id: id },
    });
    if (updated) {
      res.send({ message: "Course updated successfully" });
    } else {
      res.send({ message: `Cannot update course with id=${id}. Course not found or body is empty!` });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "An error occurred while updating the course.",
    });
  }
};

// ลบรายวิชา
exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    const deleted = await Course.destroy({
      where: { id: id },
    });
    if (deleted) {
      res.send({ message: "Course deleted successfully" });
    } else {
      res.send({ message: `Cannot delete course with id=${id}. Course not found!` });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "An error occurred while deleting the course.",
    });
  }
};
