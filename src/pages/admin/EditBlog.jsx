import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Ganti useHistory dengan useNavigate
import { fetchBlogPostById, editBlogPost } from '../../utils/handler'; // Pastikan import fungsi yang benar

const EditBlog = () => {
    const { id } = useParams(); // Ambil id dari URL
    const navigate = useNavigate(); // Ganti useHistory dengan useNavigate
    const [blog, setBlog] = useState({ title: '', description: '' });
    const [error, setError] = useState(null);

    useEffect(() => {
        const getBlogPost = async () => {
            try {
                const fetchedBlog = await fetchBlogPostById(id); // Ambil data blog berdasarkan ID
                setBlog(fetchedBlog);
            } catch (err) {
                setError(err.message);
            }
        };
        getBlogPost();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBlog((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            await editBlogPost(id, blog);
            navigate('/dashboard/blogs'); // Ganti history.push dengan navigate
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <h2>Edit Blog Post</h2>
            {error && <p>Error: {error}</p>}
            <div>
                <input
                    type="text"
                    name="title"
                    value={blog.title}
                    onChange={handleInputChange}
                    placeholder="Title"
                />
                <textarea
                    name="description"
                    value={blog.description}
                    onChange={handleInputChange}
                    placeholder="Description"
                />
                <button onClick={handleSubmit}>Save Changes</button>
            </div>
        </div>
    );
};

export default EditBlog;
