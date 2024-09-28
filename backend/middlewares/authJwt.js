const { Op } = require('sequelize');
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const db = require("../models");
const User = db.User;

const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }

    req.userId = decoded.id; // สมมติว่า token มี userId
    next();
  });
};

// Check if user is Instructorฤฤ
const isInstructor = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    if (!user) return res.status(404).send({ message: "User not found" });

    const roles = await user.getRoles();
    const isInstructorRole = roles.some((role) => role.name === "Instructor");

    if (isInstructorRole) {
      next();
    } else {
      return res.status(403).send({ message: "Unauthorized access, Require Instructor Role!" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Check if user is Student
const isStudent = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    if (!user) return res.status(404).send({ message: "User not found" });

    const roles = await user.getRoles();
    const isStudentRole = roles.some((role) => role.name === "Student");

    if (isStudentRole) {
      next();
    } else {
      return res.status(403).send({ message: "Unauthorized access, Require Student Role!" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Check if user is Staff
const isStaff = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    if (!user) return res.status(404).send({ message: "User not found" });

    const roles = await user.getRoles();
    const isStaffRole = roles.some((role) => role.name === "Staff");

    if (isStaffRole) {
      next();
    } else {
      return res.status(403).send({ message: "Unauthorized access, Require Staff Role!" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Check if user is Instructor or Staff
const isInstructorOrStaff = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    if (!user) return res.status(404).send({ message: "User not found" });

    const roles = await user.getRoles();
    const hasRole = roles.some((role) => role.name === "Instructor" || role.name === "Staff");

    if (hasRole) {
      next();
    } else {
      return res.status(403).send({ message: "Unauthorized access, Require Instructor Or Staff Role!" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const authJwt = {
  verifyToken,
  isInstructor,
  isStudent,
  isStaff,
  isInstructorOrStaff,
};

module.exports = authJwt;