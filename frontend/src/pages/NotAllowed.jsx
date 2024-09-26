import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NotAllowed = () => {
  const [counter, setCounter] = useState(5); // เริ่มนับถอยหลังที่ 5 วินาที
  const navigate = useNavigate();

  useEffect(() => {
    // Timer สำหรับการนำทางหลังจาก 5 วินาที
    const timer = setTimeout(() => {
      navigate("/"); // นำทางกลับหน้าแรก
    }, 5000);

    // Countdown สำหรับการนับถอยหลัง
    const countDown = setInterval(() => {
      setCounter((prevCounter) => {
        if (prevCounter <= 1) {
          clearInterval(countDown); // หยุดการนับถอยหลังเมื่อเหลือ 0
          return 0;
        }
        return prevCounter - 1; // ลดค่าตัวเลขลง
      });
    }, 1000);

    // Clean up: ลบ timer และ countdown เมื่อ component ถูกลบออก
    return () => {
      clearTimeout(timer);
      clearInterval(countDown);
    };
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen"> {/* จัดตำแหน่งให้กลางหน้า */}
      <div className="card bg-base-100 w-96 shadow-xl">
        <figure className="px-10 pt-10">
          <img
            src="https://cdn-icons-png.flaticon.com/128/2822/2822009.png" // เปลี่ยน URL เป็นรูปโปรไฟล์ที่ต้องการ
            alt="Profile"
            className="rounded-full w-24 h-24" // ใช้ class สำหรับการทำให้เป็นรูปวงกลม
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">Not Allowed!</h2>
          <p>You will be redirected to the homepage in {counter} seconds.</p>
        </div>
      </div>
    </div>
  );
};

export default NotAllowed;
