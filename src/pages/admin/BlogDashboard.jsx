// pages/BlogDashboard.js

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
        <div>
            <h2>Blog Dashboard</h2>
            <div>
                <h3>Create New Blog Post</h3>
                <input
                    type="text"
                    name="title"
                    value={newBlog.title}
                    onChange={handleBlogChange}
                    placeholder="Title"
                />
                <textarea
                    name="description"
                    value={newBlog.description}
                    onChange={handleBlogChange}
                    placeholder="Description"
                />
                <button onClick={handleCreateBlog}>Create Blog Post</button>
            </div>

            <div>
                <h3>Existing Blog Posts</h3>
                {blogPosts.length > 0 ? (
                    <ul>
                        {blogPosts.map((post) => (
                            <li key={post.id}>
                                <h4>{post.title}</h4>
                                <p>{post.description}</p>
                                <Link to={`/dashboard/blogs/edit/${post.id}`}>
                                    <button>Edit</button>
                                </Link>
                                <button onClick={() => handleDeleteBlog(post.id)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No blog posts available.</p>
                )}
            </div>
            {error && <p>Error: {error}</p>}
        </div>
    );
};

export default BlogDashboard;
