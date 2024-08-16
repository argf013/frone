import React, { useState, useEffect } from 'react';
import { uploadImage, deleteImage, fetchImages } from '../../utils/handler';

const GalleryDashboard = () => {
    const [images, setImages] = useState([]);
    const [title, setTitle] = useState('');
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch all images on component mount
        fetchImages()
            .then(data => {
                setImages(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching gallery images:', error);
                setLoading(false);
            });
    }, []);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');

        uploadImage(file, title, token)
            .then(data => {
                setImages(prevImages => [...prevImages, { id: data.imageId, title, image_path: data.image_path, uploaded_at: new Date().toISOString() }]);
                setTitle('');
                setFile(null);
            })
            .catch(error => {
                console.error('Error uploading image:', error);
            });
    };

    const handleDelete = (id) => {
        const token = localStorage.getItem('token');

        deleteImage(id, token)
            .then(() => {
                setImages(prevImages => prevImages.filter(image => image.id !== id));
            })
            .catch(error => {
                console.error('Error deleting image:', error);
            });
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>Gallery Dashboard</h1>
            <form onSubmit={handleUpload}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="file">Select Image:</label>
                    <input
                        type="file"
                        id="file"
                        onChange={handleFileChange}
                        required
                    />
                </div>
                <button type="submit">Upload Image</button>
            </form>

            <h2>Gallery Images</h2>
            <ul>
                {images.map(image => (
                    <li key={image.id}>
                        <img src={image.image_path} alt={image.title} width="200px" />
                        <p>{image.title}</p>
                        <button onClick={() => handleDelete(image.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GalleryDashboard;
