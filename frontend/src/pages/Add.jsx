import { useState } from "react"; // นำเข้า useState จาก React

function Add() {
  // สร้าง state สำหรับเก็บข้อมูล course
  const [course, setCourse] = useState({
    id: "",
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
  const handleSubmit = (e) => {
    e.preventDefault();
    // คุณสามารถเพิ่มฟังก์ชันในการเพิ่ม course ไปที่ backend ได้ที่นี่
    console.log(course);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl text-center mb-4">Add Courses</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="input input-bordered flex items-center gap-2">
          id
          <input
            type="text"
            className="grow p-2 border border-gray-300 rounded"
            placeholder="id"
            name="id"
            onChange={handleChange}
            value={course.id}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          courseCode
          <input
            type="text"
            className="grow p-2 border border-gray-300 rounded"
            placeholder="courseCode"
            name="courseCode"
            onChange={handleChange}
            value={course.courseCode}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          name
          <input
            type="text"
            className="grow p-2 border border-gray-300 rounded"
            placeholder="name"
            name="name"
            onChange={handleChange}
            value={course.name}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          description
          <input
            type="text"
            className="grow p-2 border border-gray-300 rounded"
            placeholder="description"
            name="description"
            onChange={handleChange}
            value={course.description}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          credits
          <input
            type="text"
            className="grow p-2 border border-gray-300 rounded"
            placeholder="credits"
            name="credits"
            onChange={handleChange}
            value={course.credits}
          />
        </label>
        <button
          className="btn btn-success bg-green-500 text-white py-2 px-4 rounded mx-auto block"
          type="submit"
        >
          Add Courses
        </button>
      </form>
    </div>
  );
}

export default Add;
