import { useEffect, useState } from 'react';
import Search from './Search';
import Card from './card';

const CourseList = ({ courses }) => {
  const [filterCourses, setFilterCourses] = useState(courses);

  useEffect(() => {
    setFilterCourses(courses); // ตั้งค่า filterCourses เป็น courses ทุกครั้งที่มีการเปลี่ยนแปลง
  }, [courses]);

  return (
    <div>
      <Search courses={courses} setFilterCourses={setFilterCourses} />
      <div className="course-list flex flex-wrap justify-center">
        {filterCourses.length > 0 ? ( // ตรวจสอบว่า filterCourses มีข้อมูลหรือไม่
          filterCourses.map((course) => (
            <Card key={course.id} {...course} />
          ))
        ) : (
          <p>No courses found</p> // แสดงข้อความถ้าไม่มีการ์ด
        )}
      </div>
    </div>
  );
};

export default CourseList;