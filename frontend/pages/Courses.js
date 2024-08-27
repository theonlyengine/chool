import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch('/api/courses')
      .then(response => response.json())
      .then(data => setCourses(data))
      .catch(error => console.error('Error fetching courses:', error));
  }, []);

  return (
    <div>
      <h1>Available Courses</h1>
      <div className="course-list">
        {courses.map(course => (
          <div key={course._id} className="course-card">
            <h2>{course.title}</h2>
            <p>{course.description}</p>
            <Link to={`/courses/${course._id}`}>View Course</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
