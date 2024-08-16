// pages/Blogs.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchBlogPosts } from '../utils/handler';

const Blogs = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Inisialisasi useNavigate

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
    navigate(`/blogs/${id}`); // Navigasi ke halaman detail blog
  };

  return (
    <div>
      <h1>Blog Articles</h1>
      {error && <p>Error: {error}</p>}
      {blogPosts.length > 0 ? (
        <ul>
          {blogPosts.map((post) => (
            <li key={post.id} onClick={() => handlePostClick(post.id)} style={{ cursor: 'pointer' }}>
              <h2>{post.title}</h2>
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
