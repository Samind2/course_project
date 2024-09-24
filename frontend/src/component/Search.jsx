import PropTypes from 'prop-types';
import { useState } from 'react';

const Search = ({ courses, setFilterCourses }) => {
  const [keyword, setKeyword] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setKeyword(value);

    if (value === "") {
      setFilterCourses(courses);
      return;
    }

    const result = courses.filter((course) =>
      course.name.toLowerCase().includes(value.toLowerCase()) ||
      course.courseCode.toLowerCase().includes(value.toLowerCase())
    );
    setFilterCourses(result);
  };

  return (
    <label className="input input-bordered flex items-center gap-2 w-5/6 mt-4 justify-center"> {/* เพิ่ม justify-center */}
      <input
        type="text"
        className="grow"
        placeholder="Search"
        value={keyword}
        onChange={handleChange}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="currentColor"
        className="w-4 h-4 opacity-70"
      >
        <path
          fillRule="evenodd"
          d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
          clipRule="evenodd"
        />
      </svg>
    </label>
  );
};

// เพิ่ม PropTypes
Search.propTypes = {
  courses: PropTypes.array.isRequired,
  setFilterCourses: PropTypes.func.isRequired,
};

export default Search;