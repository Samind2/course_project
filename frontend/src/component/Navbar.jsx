// Navbar.js
import UserProfile from "./UserProfile";
import RegisterButton from "./RegisterButton";
import LoginButton from "./loginButton"; // เปลี่ยนจาก loginButton เป็น LoginButton
import { useCourse } from "../contexts/course.context"; // ใช้ useCourse แทน

const Navbar = () => {
  const { currentUser, logout } = useCourse(); // ใช้ currentUser แทน user

  const handleLogout = () => {
    logout(); // Call logout function from context
  };

  return (
    <nav
      className="navbar p-5 shadow-lg rounded-lg"
      style={{ backgroundColor: "#D1E9F6" }}
    >
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle text-white"
            style={{ color: "#D1E9F6" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              style={{ stroke: "#D1E9F6" }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content mt-3 p-2 shadow-lg bg-white text-black rounded-box w-52"
            style={{ backgroundColor: "#D1E9F6", color: "#1E2A5E" }}
          >
            <li>
              <a href="/" className="hover:bg-indigo-200">
                Home Page
              </a>
            </li>
            <li>
              <a href="/add" className="hover:bg-indigo-200">
                Add Restaurant
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="navbar-end flex items-center space-x-4">
        {currentUser ? ( // เปลี่ยนจาก user เป็น currentUser
          <>
            <div className="text-lg" style={{ color: "#1E2A5E" }}>
              <span>Welcome, </span>
              <span className="font-semibold">{currentUser.Username}</span>
              {/* ชื่อของผู้ใช้ที่เข้าสู่ระบบ */}
              {currentUser.roles.map((role, index) => (
                <span
                  key={index}
                  className="ml-2 px-2 py-1 bg-indigo-700 text-white rounded-full text-xs"
                  style={{ backgroundColor: "#1E2A5E", color: "#E1D7B7" }}
                >
                  {role}
                </span>
              ))}
            </div>

            <UserProfile />
            <button
              onClick={handleLogout}
              className="btn btn-outline btn-white hover:bg-white hover:text-indigo-600"
              style={{ borderColor: "#1E2A5E", color: "#5F6F65" }}
            >
              Logout
            </button>
          </>
        ) : (
          <div className="space-x-2">
            <RegisterButton />
            <LoginButton />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;