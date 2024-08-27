import React, { useState, useEffect } from 'react';

const Community = () => {
  const [posts, setPosts] = useState([]);
  const [question, setQuestion] = useState('');

  useEffect(() => {
    fetch('/api/posts')
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error fetching posts:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question }),
    })
      .then(response => response.json())
      .then(newPost => {
        setPosts([newPost, ...posts]);
        setQuestion('');
      })
      .catch(error => console.error('Error posting question:', error));
  };

  const handleAnswer = (postId, answer) => {
    fetch(`/api/posts/${postId}/answer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ answer }),
    })
      .then(response => response.json())
      .then(updatedPost => {
        setPosts(posts.map(post => (post._id === postId ? updatedPost : post)));
      })
      .catch(error => console.error('Error posting answer:', error));
  };

  return (
    <div>
      <h1>Community</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a question..."
        />
        <button type="submit">Post</button>
      </form>
      <div>
        {posts.map(post => (
          <div key={post._id}>
            <h2>{post.question}</h2>
            <ul>
              {post.answers.map((answer, index) => (
                <li key={index}>{answer.user.name}: {answer.answer}</li>
              ))}
            </ul>
            <input
              type="text"
              placeholder="Answer this question..."
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleAnswer(post._id, e.target.value);
                  e.target.value = '';
                }
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Community;
