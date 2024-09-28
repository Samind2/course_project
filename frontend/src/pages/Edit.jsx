import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";


const Edit = () => {
  const { id } = useParams(); // Get ID from URL
  const navigate = useNavigate();

  const [course, setCourse] = useState({
    id: "",
    courseCode: "",
    name: "",
    description: "",
    credits: ""
  });

  useEffect(() => {
    if (!id) {
      console.error("No ID provided in URL");
      return;
    }
  
    fetch(`http://localhost:5000/api/v1/courses/${id}`)
      .then((res) => {
        console.log("Response:", res);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((response) => {
        if (response) {
          setCourse(response);
        } else {
          alert("Course not found");
        }
      })
      .catch((err) => {
        console.log("Error fetching data:", err.message);
      });
  }, [id]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/v1/courses/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(course),
      });
  
      if (response.ok) {
        alert("Course updated successfully");
        navigate("/"); // เปลี่ยนเส้นทางไปยังหน้าหลัก
      } else {
        alert("Failed to update course");
      }
    } catch (error) {
      console.log("Error updating data:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl text-center mb-4">Edit Course</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="flex flex-col">
          <span className="mb-2">Course Code</span>
          <input
            type="text"
            className="p-2 border border-gray-300 rounded"
            placeholder="Course Code"
            name="courseCode"
            onChange={handleChange}
            value={course.courseCode}
          />
        </label>
        <label className="flex flex-col">
          <span className="mb-2">Name</span>
          <input
            type="text"
            className="p-2 border border-gray-300 rounded"
            placeholder="Name"
            name="name"
            onChange={handleChange}
            value={course.name}
          />
        </label>
        <label className="flex flex-col">
          <span className="mb-2">Description</span>
          <input
            type="text"
            className="p-2 border border-gray-300 rounded"
            placeholder="Description"
            name="description"
            onChange={handleChange}
            value={course.description}
          />
        </label>
        <label className="flex flex-col">
          <span className="mb-2">Credits</span>
          <input
            type="text"
            className="p-2 border border-gray-300 rounded"
            placeholder="Credits"
            name="credits"
            onChange={handleChange}
            value={course.credits}
          />
        </label>
        <button
          className="btn btn-success py-2 px-4 rounded mx-auto block"
          type="submit"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Edit;
