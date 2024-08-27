import React, { useEffect, useState } from 'react';

const StudentDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    fetch('/api/dashboard/student')
      .then(response => response.json())
      .then(data => setDashboardData(data))
      .catch(error => console.error('Error fetching dashboard data:', error));
  }, []);

  if (!dashboardData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Student Dashboard</h1>
      <section>
        <h2>Enrolled Courses</h2>
        <ul>
          {dashboardData.enrolledCourses.map(course => (
            <li key={course._id}>{course.title}</li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Tasks</h2>
        <p>Completed: {dashboardData.tasks.completed}</p>
        <p>Pending: {dashboardData.tasks.pending}</p>
      </section>
      <section>
        <h2>Recent Contacts</h2>
        <ul>
          {dashboardData.recentContacts.map((contact, index) => (
            <li key={index}>{contact.name} ({contact.email})</li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Performance Analytics</h2>
        <p>Weekly Progress: {dashboardData.performanceAnalytics.weeklyProgress}%</p>
      </section>
      <section>
        <h2>Progress Reports</h2>
        <ul>
          {dashboardData.progressReports.map((report, index) => (
            <li key={index}>{report.week}: {report.report}</li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Recommended Activities</h2>
        <ul>
          {dashboardData.recommendedActivities.map((activity, index) => (
            <li key={index}>{activity.title}: {activity.description}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default StudentDashboard;
