import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchBlogPosts } from '../utils/handler';

const Blogs = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const loadBlogPosts = async () => {
      try {
        const posts = await fetchBlogPosts();
        setBlogPosts(posts || []);
      } catch (err) {
        setError(err.message);
      }
    };

    loadBlogPosts();
  }, []);

  const handlePostClick = (id) => {
    navigate(`/blogs/${id}`); // Navigate to blog detail page
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Blog Articles</h1>
      {error && <p className="text-danger">Error: {error}</p>}
      {blogPosts.length > 0 ? (
        <ul className="list-group">
          {blogPosts.map((post) => (
            <li
              key={post.id}
              className="list-group-item list-group-item-action"
              onClick={() => handlePostClick(post.id)}
              style={{ cursor: 'pointer' }}
            >
              <h2 className="h4">{post.title}</h2>
              <p>{post.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No blog posts available.</p>
      )}
    </div>
  );
};

export default Blogs;
