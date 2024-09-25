import { useState } from 'react';
import Search from './Search';
import Card from './card';

const CourseList = ({ courses }) => {
  const [filterCourses, setFilterCourses] = useState(courses);

  return (
    <div>
      <Search courses={courses} setFilterCourses={setFilterCourses} />
      <div className="course-list flex flex-wrap justify-center">
        {filterCourses.map((course) => (
          <Card key={course.id} {...course} />
        ))}
      </div>
    </div>
  );
};

export default CourseList;