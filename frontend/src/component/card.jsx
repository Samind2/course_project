import PropTypes from "prop-types";

const Card = ({ id, courseCode, name, description, credits }) => {
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5000/courses/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Course has been deleted");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card w-80 bg-[#F9F5F6] shadow-xl m-4 border border-[#FDCEDF] rounded-lg overflow-hidden">
      <div className="card-body p-5">
        <h2 className="card-title ">{name}</h2>
        <p className="text-[#0f1c53]">{description}</p>
        <p>Course Code: <span className="font-bold">{courseCode}</span></p>
        <p>Credits: <span className="font-bold">{credits}</span></p>
        <div className="card-actions justify-end">
          <a className="btn btn-edit" href={`edit/${id}`}>
            Edit
          </a>
          <button className="btn btn-delete" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

// เพิ่ม PropTypes เพื่อตรวจสอบความถูกต้องของ props ที่ส่งเข้าไปใน component
Card.propTypes = {
    id: PropTypes.number.isRequired,
    courseCode: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    credits: PropTypes.number.isRequired,
  };

export default Card;
