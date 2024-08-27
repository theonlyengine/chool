import React, { useEffect, useState } from 'react';

const TeacherDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    fetch('/api/dashboard/teacher')
      .then(response => response.json())
      .then(data => setDashboardData(data))
      .catch(error => console.error('Error fetching dashboard data:', error));
  }, []);

  if (!dashboardData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Teacher Dashboard</h1>
      <section>
        <h2>Managed Courses</h2>
        <ul>
          {dashboardData.managedCourses.map(course => (
            <li key={course._id}>{course.title}</li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Student Analytics</h2>
        {/* Display analytics data here */}
      </section>
      <section>
        <h2>Upload New Course</h2>
        <form action="/api/content/upload" method="POST" encType="multipart/form-data">
          <input type="file" name="files" multiple />
          <button type="submit">Upload</button>
        </form>
      </section>
    </div>
  );
};

export default TeacherDashboard;
