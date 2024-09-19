const CourseController = require("../controllers/Course.controller");
const express = require("express");
const router = express.Router();

// Route สำหรับ CRUD รายวิชา
router.post("/", CourseController.create);
router.get("/", CourseController.getAll);
router.get("/:id", CourseController.getById);
router.put("/:id", CourseController.update);
router.delete("/:id", CourseController.delete);

module.exports = router; // ส่งออก router