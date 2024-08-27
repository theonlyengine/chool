import React, { useState } from 'react';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState({ users: [], courses: [] });

  const handleSearch = (e) => {
    e.preventDefault();

    fetch(`/api/search?query=${query}`)
      .then(response => response.json())
      .then(data => setResults(data))
      .catch(error => console.error('Error performing search:', error));
  };

  return (
    <div>
      <h1>Search</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for teachers, courses, or friends"
        />
        <button type="submit">Search</button>
      </form>
      <div>
        <h2>Users</h2>
        <ul>
          {results.users.map(user => (
            <li key={user._id}>{user.name} ({user.role})</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Courses</h2>
        <ul>
          {results.courses.map(course => (
            <li key={course._id}>{course.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Search;
