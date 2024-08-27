import React, { useEffect, useState } from 'react';

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState({ certificates: [], achievements: [] });

  useEffect(() => {
    fetch('/api/portfolio')
      .then(response => response.json())
      .then(data => setPortfolio(data))
      .catch(error => console.error('Error fetching portfolio:', error));
  }, []);

  return (
    <div>
      <h1>Portfolio</h1>
      <section>
        <h2>Certificates</h2>
        <ul>
          {portfolio.certificates.map(cert => (
            <li key={cert._id}>{cert.course} - Grade: {cert.grade}</li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Achievements</h2>
        <ul>
          {portfolio.achievements.map((achievement, index) => (
            <li key={index}>{achievement}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Portfolio;
