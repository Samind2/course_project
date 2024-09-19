

// สร้าง component Card และรับ props ได้แก่ id, courseCode, name, description, credits
const Card = ({ id, courseCode, name, description, credits }) => {
  // ฟังก์ชัน handleDelete สำหรับการลบ course
  const handleDelete = async () => {
    try {
      // ส่ง request ไปที่ server เพื่อทำการลบ course โดยใช้ method DELETE
      const response = await fetch("http://localhost:5000/courses/" + id, {
        method: "DELETE",
      });

      // ถ้า response โอเค (status code 200-299)
      if (response.ok) {
        alert("Course has been deleted"); // แจ้งผู้ใช้ว่า course ถูกลบแล้ว
        window.location.reload(); // reload หน้าเว็บเพื่ออัพเดทรายการ course
      }
    } catch (error) {
      console.log(error); // ถ้ามี error ในการลบ จะทำการ log error นั้น
    }
  };

  return (
    <div className="card bg-neutral text-neutral-content w-96">
      <div className="card-body items-center text-center">
        {/* ใช้ props name และ description */}
        <h2 className="card-title">{name}</h2>
        <p>{description || 'No description available'}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={handleDelete}>Delete</button>
          <button className="btn btn-ghost">More Info</button>
        </div>
      </div>
    </div>
  );
};

export default Card;