import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const BlogDetail = () => {
    const { id } = useParams(); // Get ID from URL
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        // Fetch blog detail by ID
        const fetchBlog = async () => {
            try {
                const response = await fetch(`http://localhost:3000/blogs/posts/${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setBlog(data);
            } catch (error) {
                console.error("Error fetching blog:", error);
            }
        };

        fetchBlog();
    }, [id]);

    if (!blog) return <p>Loading...</p>;

    return (
        <div className="container mt-4">
            <h1 className="mb-3">{blog.title}</h1>
            <p className="text-muted">{new Date(blog.date).toLocaleDateString()}</p>
            <p>{blog.description}</p>
            <p><em>Author: {blog.author}</em></p>
        </div>
    );
};

export default BlogDetail;
