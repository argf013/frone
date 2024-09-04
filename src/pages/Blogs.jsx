import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchBlogPosts } from '../utils/handler';
import './Blog.css';

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
    <div className="container mt-5">
      <h1 className="h1-blog display-1 mb-4 text-center">Blog Articles</h1>
      {error && <div className="alert alert-danger">Error: {error}</div>}
      {blogPosts.length > 0 ? (
        <div className="row">
          {blogPosts.map((post) => (
            <div key={post.id} className="col-md-4 mb-4">
              <div
                className="card h-100"
                onClick={() => handlePostClick(post.id)}
                style={{ cursor: 'pointer' }}
              >
                <div className="card-body rounded">
                  <h2 className="card-title h5">{post.title}</h2>
                  <p className="card-text">{post.description}</p>
                  <a className="block text-blue-500 mt-2 hover:text-blue-400 underline" href="#">read more</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">No blog posts available.</p>
      )}
    </div>
  );
};

export default Blogs;