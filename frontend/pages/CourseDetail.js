import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [personalization, setPersonalization] = useState({
    focusAreas: '',
    preferredLearningStyle: '',
  });

  useEffect(() => {
    fetch(`/api/courses/${id}`)
      .then(response => response.json())
      .then(data => setCourse(data))
      .catch(error => console.error('Error fetching course:', error));
  }, [id]);

  const handleEnrollment = () => {
    const url = isEnrolled ? `/api/courses/${id}/unenroll` : `/api/courses/${id}/enroll`;
    const method = isEnrolled ? 'DELETE' : 'POST';

    fetch(url, { method })
      .then(response => {
        if (response.ok) {
          setIsEnrolled(!isEnrolled);
        }
      })
      .catch(error => console.error('Error enrolling/unenrolling:', error));
  };

  const handlePersonalizationChange = (e) => {
    const { name, value } = e.target;
    setPersonalization({ ...personalization, [name]: value });
  };

  const handlePersonalizeCourse = () => {
    // Call API to save personalization (to be implemented)
    console.log('Personalization settings saved:', personalization);
  };

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{course.title}</h1>
      <p>{course.description}</p>
      
      <button onClick={handleEnrollment}>
        {isEnrolled ? 'Unenroll from Course' : 'Enroll in Course'}
      </button>
      
      {isEnrolled && (
        <div>
          <CourseContent courseId={id} />

          <h3>Personalize Your Learning Experience</h3>
          <div>
            <label>
              Focus Areas:
              <input
                type="text"
                name="focusAreas"
                value={personalization.focusAreas}
                onChange={handlePersonalizationChange}
              />
            </label>
          </div>
          <div>
            <label>
              Preferred Learning Style:
              <select
                name="preferredLearningStyle"
                value={personalization.preferredLearningStyle}
                onChange={handlePersonalizationChange}
              >
                <option value="visual">Visual</option>
                <option value="auditory">Auditory</option>
                <option value="kinesthetic">Kinesthetic</option>
              </select>
            </label>
          </div>
          <button onClick={handlePersonalizeCourse}>Save Personalization</button>
        </div>
      )}
    </div>
  );
};

const CourseContent = ({ courseId }) => {
  const [content, setContent] = useState([]);

  useEffect(() => {
    fetch(`/api/courses/${courseId}/content`)
      .then(response => response.json())
      .then(data => setContent(data))
      .catch(error => console.error('Error fetching course content:', error));
  }, [courseId]);

  return (
    <div>
      <h2>Course Content</h2>
      <ul>
        {content.map((url, index) => (
          <li key={index}>
            <a href={url} target="_blank" rel="noopener noreferrer">
              Content {index + 1}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseDetail;
