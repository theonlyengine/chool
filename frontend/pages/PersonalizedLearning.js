import React, { useEffect, useState } from 'react';

const PersonalizedLearning = () => {
  const [personalizedContent, setPersonalizedContent] = useState(null);

  useEffect(() => {
    fetch('/api/superclass')
      .then(response => response.json())
      .then(data => setPersonalizedContent(data.optimized_lessons))
      .catch(error => console.error('Error fetching personalized content:', error));
  }, []);

  if (!personalizedContent) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Your Personalized Learning Path</h1>
      <div className="personalized-lessons">
        {personalizedContent.map((lesson, index) => (
          <div key={index} className="lesson-card">
            <h2>{lesson.lesson_summary}</h2>
            <p>Teaching Tactics: {lesson.teaching_tactics}</p>
            <p>Recommended Activities: {lesson.recommended_activities.join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonalizedLearning;
