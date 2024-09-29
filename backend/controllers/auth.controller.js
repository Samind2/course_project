require("dotenv").config(); // โหลดค่า.env
const { Op } = require("sequelize");
const User = require("../models/User.models"); // นำเข้าโมเดล User จากไฟล์โมเดลที่เกี่ยวข้อง
const Role = require("../models/Role.model"); // นำเข้าโมเดล Role
const bcrypt = require("bcryptjs"); // ใช้ bcrypt เพื่อเข้ารหัสรหัสผ่าน
const jwt = require("jsonwebtoken"); // ใช้ jwt เพื่อสร้าง JSON Web Token สำหรับการยืนยันตัวตน
const config = require("../config/auth.config")

exports.signup = async (req, res) => {
  const { Username, email, password, roles } = req.body;

  if (!Username || !email || !password) {
    return res.status(400).send({ message: "กรุณากรอกข้อมูลให้ครบถ้วน" });
  }

  const hashedPassword = bcrypt.hashSync(password, 8); // เข้ารหัสรหัสผ่าน

  try {
    const user = await User.create({
      // สร้างผู้ใช้ใหม่
      Username: Username,
      email: email,
      password: hashedPassword,
    });

    if (roles) {
      const roleEntities = await Role.findAll({
        where: { name: { [Op.or]: roles } },
      });
      await user.setRoles(roleEntities); // กำหนดบทบาทให้กับผู้ใช้
    } else {
      await user.setRoles([1]); // กำหนดบทบาทเริ่มต้น
    }

    res.send({ message: "ผู้ใช้ลงทะเบียนสำเร็จ!" });
  } catch (error) {
    res.status(500).send({
      message: error.message || "เกิดข้อผิดพลาดระหว่างการสร้างผู้ใช้.",
    });
  }
};

exports.signin = async (req, res) => {
  const { Username, password } = req.body;

  try {
    const user = await User.findOne({ where: { Username: Username } });

    if (!user) {
      return res.status(404).send({ message: "ไม่พบผู้ใช้." });
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password); // ตรวจสอบรหัสผ่าน

    if (!passwordIsValid) {
      return res
        .status(401)
        .send({ accessToken: null, message: "รหัสผ่านไม่ถูกต้อง!" });
    }

    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400, // 24 ชั่วโมง
    });

    const authorities = [];
    const roles = await user.getRoles();
    for (let i = 0; i < roles.length; i++) {
      authorities.push("ROLE_" + roles[i].name.toUpperCase());
    }

    res.status(200).send({
      id: user.id,
      Username: user.Username,
      email: user.email,
      roles: authorities,
      accessToken: token, // เพิ่มบรรทัดนี้
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "เกิดข้อผิดพลาดระหว่างการเข้าสู่ระบบ.",
    });
  }
};
