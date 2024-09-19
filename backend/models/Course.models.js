const { DataTypes } = require("sequelize"); // นำเข้า DataTypes จากโมดูล sequelize
const sequelize = require("./db"); // นำเข้า instance ของ sequelize ที่เชื่อมต่อกับฐานข้อมูล

// กำหนด Schema ของฐานข้อมูลสำหรับตาราง Course (รายวิชา)
const Course = sequelize.define("course", {
  id: {
    type: DataTypes.INTEGER, // ประเภทข้อมูลเป็นจำนวนเต็ม
    primaryKey: true, // กำหนดให้เป็น Primary Key
    autoIncrement: true, // ให้ค่าเพิ่มขึ้นอัตโนมัติเมื่อเพิ่มข้อมูลใหม่
  },
  courseCode: {
    type: DataTypes.STRING, // ประเภทข้อมูลเป็นข้อความ
    allowNull: false, // ไม่อนุญาตให้ค่านี้เป็นค่าว่าง
    unique: true, // กำหนดให้รหัสวิชามีค่าไม่ซ้ำกัน
  },
  name: {
    type: DataTypes.STRING, // ประเภทข้อมูลเป็นข้อความ
    allowNull: false, // ไม่อนุญาตให้ค่านี้เป็นค่าว่าง
  },
  description: {
    type: DataTypes.STRING, // ประเภทข้อมูลเป็นข้อความแบบยาว (คำอธิบายวิชา)
    allowNull: true, // อนุญาตให้ค่านี้เป็นค่าว่างได้
  },
  credits: {
    type: DataTypes.INTEGER, // ประเภทข้อมูลเป็นจำนวนเต็ม (หน่วยกิต)
    allowNull: false, // ไม่อนุญาตให้ค่านี้เป็นค่าว่าง
  },
});

// สร้างตารางในฐานข้อมูลโดยไม่ลบข้อมูลเก่า
Course.sync({ force: false })
  .then(() => {
    console.log("Course table created successfully.");
  })
  .catch(err => {
    console.log("Failed to create table:", err);
  });

module.exports = Course;
