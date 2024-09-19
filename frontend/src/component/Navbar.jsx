import { useState } from 'react';
import { Link } from 'react-router-dom';
import UserProfile from './UserProfile'; // ปรับเส้นทางให้ตรงกับที่เก็บไฟล์ของคุณ
import RegisterButton from './RegisterButton'; // ปรับเส้นทางให้ตรงกับที่เก็บไฟล์ของคุณ
import LoginButton from './LoginButton'; // ปรับเส้นทางให้ตรงกับที่เก็บไฟล์ของคุณ
import { useAuthContext } from '../contexts/AuthContext';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useAuthContext(); // เข้าถึงสถานะการล็อกอินของผู้ใช้

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    // เพิ่มโค้ดเพื่อจัดการการค้นหาที่นี่
  };

  return (
    <div className="navbar bg-base-100 shadow-md">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">CourseApp</Link>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="flex items-center gap-2">
          <RegisterButton /> {/* แสดงปุ่มลงทะเบียนหากผู้ใช้ไม่ได้ล็อกอิน */}
          <LoginButton /> {/* แสดงปุ่มเข้าสู่ระบบหากผู้ใช้ไม่ได้ล็อกอิน */}
          <UserProfile /> {/* แสดงโปรไฟล์ของผู้ใช้หากผู้ใช้ล็อกอิน */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
