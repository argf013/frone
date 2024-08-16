import React, { useState, useEffect } from 'react';
import { fetchBlogPosts, createBlogPost, editBlogPost, deleteBlogPost } from '../../utils/handler'; // Import fungsi yang diperlukan
import { Link } from 'react-router-dom';

const BlogDashboard = () => {
    const [blogPosts, setBlogPosts] = useState([]);
    const [newBlog, setNewBlog] = useState({ title: '', description: '' });
    const [currentBlog, setCurrentBlog] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetchBlogPosts();
                setBlogPosts(response);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchPosts();
    }, []);

    const handleBlogChange = (e) => {
        const { name, value } = e.target;
        setNewBlog(prev => ({ ...prev, [name]: value }));
    };

    const handleCreateBlog = async () => {
        try {
            await createBlogPost(newBlog);
            setNewBlog({ title: '', description: '' });
            const response = await fetchBlogPosts();
            setBlogPosts(response);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleEditBlog = async (id) => {
        try {
            await editBlogPost(id, newBlog);
            setCurrentBlog(null);
            const response = await fetchBlogPosts();
            setBlogPosts(response);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDeleteBlog = async (id) => {
        try {
            await deleteBlogPost(id);
            const response = await fetchBlogPosts();
            setBlogPosts(response);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Blog Dashboard</h2>

            <div className="mb-4">
                <h3>Create New Blog Post</h3>
                <div className="mb-3">
                    <input
                        type="text"
                        name="title"
                        value={newBlog.title}
                        onChange={handleBlogChange}
                        placeholder="Title"
                        className="form-control mb-2"
                    />
                    <textarea
                        name="description"
                        value={newBlog.description}
                        onChange={handleBlogChange}
                        placeholder="Description"
                        className="form-control"
                        rows="5"
                    />
                </div>
                <button className="btn btn-primary" onClick={handleCreateBlog}>Create Blog Post</button>
            </div>

            <div>
                <h3>Existing Blog Posts</h3>
                {blogPosts.length > 0 ? (
                    <ul className="list-group">
                        {blogPosts.map((post) => (
                            <li className="list-group-item mb-3" key={post.id}>
                                <h4>{post.title}</h4>
                                <p>{post.description}</p>
                                <div className="btn-group" role="group">
                                    <Link to={`/dashboard/blogs/edit/${post.id}`} className="btn btn-warning me-2">
                                        Edit
                                    </Link>
                                    <button className="btn btn-danger" onClick={() => handleDeleteBlog(post.id)}>
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No blog posts available.</p>
                )}
            </div>
            {error && <p className="text-danger">Error: {error}</p>}
        </div>
    );
};

export default BlogDashboard;
