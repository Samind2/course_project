import { useState } from "react"; // นำเข้า useState จาก React

function Add() {
  // สร้าง state สำหรับเก็บข้อมูล course
  const [course, setCourse] = useState({
    courseCode: "",
    name: "",
    description: "",
    credits: ""
  });

  // ฟังก์ชันจัดการการเปลี่ยนแปลงของ input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ฟังก์ชันจัดการการส่งฟอร์ม
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/v1/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(course),
      });

      if (response.ok) {
        alert("Course added successfully");
        // ทำการรีเซ็ตฟอร์มหลังจากการเพิ่มสำเร็จ
        setCourse({
          courseCode: "",
          name: "",
          description: "",
          credits: ""
        });
      } else {
        alert("Failed to add course");
      }
    } catch (error) {
      console.log("Error adding course:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl text-center mb-4">Add Courses</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="input input-bordered flex items-center gap-2">
          Course Code
          <input
            type="text"
            className="grow p-2 border border-gray-300 rounded"
            placeholder="Course Code"
            name="courseCode"
            onChange={handleChange}
            value={course.courseCode}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          Name
          <input
            type="text"
            className="grow p-2 border border-gray-300 rounded"
            placeholder="Name"
            name="name"
            onChange={handleChange}
            value={course.name}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          Description
          <input
            type="text"
            className="grow p-2 border border-gray-300 rounded"
            placeholder="Description"
            name="description"
            onChange={handleChange}
            value={course.description}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          Credits
          <input
            type="text"
            className="grow p-2 border border-gray-300 rounded"
            placeholder="Credits"
            name="credits"
            onChange={handleChange}
            value={course.credits}
          />
        </label>
        <button
          className="btn btn-success bg-green-500 text-white py-2 px-4 rounded mx-auto block"
          type="submit"
        >
          Add Course
        </button>
      </form>
    </div>
  );
}

export default Add;
