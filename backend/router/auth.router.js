const express = require('express');
const router = express.Router();
const authController = require("../controllers/auth.controller");
const verifySignUp = require("../middlewares/verifySignup");

router.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

// ลงทะเบียนผู้ใช้
router.post(
    "/signup",
    [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted],
    authController.signup
);

// เข้าสู่ระบบ
router.post("/signin", authController.signin);

module.exports = router;