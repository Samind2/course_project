import { useNavigate } from "react-router-dom";

function Course() {
  const navigate = useNavigate();

  const handleViewCourseDetails = () => {
    navigate("/course-details"); // แก้ไขเส้นทางตามที่คุณต้องการ
  };

  return (
    <div className="flex items-center">
      <span className="mr-4">Course Management</span>
      <div className="dropdown dropdown-end">
        <div tabIndex="0" role="button" className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Course Thumbnail"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            />
          </div>
        </div>
        <ul
          tabIndex="0"
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
        >
          <li>
            <a onClick={handleViewCourseDetails}>View Course Details</a>
          </li>
          <li>
            <a>Add New Course</a>
          </li>
          <li>
            <a>Manage Courses</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Course;
