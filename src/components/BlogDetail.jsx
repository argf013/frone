// src/pages/BlogDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const BlogDetail = () => {
    const { id } = useParams(); // Mengambil ID dari URL
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        // Fetch detail blog berdasarkan ID
        const fetchBlog = async () => {
            try {
                const response = await fetch(`http://localhost:3000/blogs/posts/${id}`);
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
        <div>
            <h1>{blog.title}</h1>
            <p>{new Date(blog.date).toLocaleDateString()}</p>
            <p>{blog.description}</p>
            <p><em>Author: {blog.author}</em></p>
        </div>
    );
};

export default BlogDetail;
