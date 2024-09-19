const express = require("express");
const cors = require("cors"); // Import cors package
require("dotenv").config();

const PORT = process.env.PORT || 5000;
const app = express();

const courseRouter = require("./router/Course.Router")
const authRouter = require("./router/auth.router") // นำเข้า Router สำหรับ Authentication

const db = require("./models/");
const Role = db.Role;

// Configure CORS options
const corsOptions = {
  origin: "http://localhost:5173",
};

// Function to initialize roles in the database
const initRole = async () => {
  try {
    await Role.findOrCreate({ where: { id: 1, name: "Instructor" } }); // อาจารย์
    await Role.findOrCreate({ where: { id: 2, name: "Student" } }); // นักเรียน
    await Role.findOrCreate({ where: { id: 3, name: "Staff" } }); // เจ้าหน้าที่
    console.log("Roles have been initialized.");
  } catch (error) {
    console.error("Error initializing roles:", error);
  }
};

// Use cors middleware
app.use(cors(corsOptions));

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define routes
app.use("/api/v1/courses", courseRouter); // เปลี่ยนเส้นทางของ courses
app.use("/api/v1/auth", authRouter); // เพิ่มเส้นทาง authRouter

app.get("/", (req, res) => {
  res.send("<h1>Hello Course API</h1>"); // เปลี่ยนข้อความแสดงผล
});

// Sync database and initialize roles
db.sequelize.sync({ force: false }).then(() => {
  console.log("Database connected and tables created.");
  initRole(); // เรียกใช้ฟังก์ชันเพื่อเพิ่มบทบาท
});

app.listen(PORT, () => {
  console.log("Listening to http://localhost:" + PORT);
});
