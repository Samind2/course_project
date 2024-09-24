import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL; // ดึงค่า BASE_URL จาก environment variables
console.log(baseURL); // แสดงค่า BASE_URL ใน console

const instance = axios.create({
  baseURL: baseURL, // ตั้งค่า baseURL สำหรับ Axios
  headers: {
    "Content-Type": "application/json", // กำหนดประเภทเนื้อหา
  },
});

export default instance; // ส่งออก instance ของ Axios