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
        <div className="container mt-4">
            <h1 className="mb-4">Gallery Dashboard</h1>
            <form onSubmit={handleUpload} className="mb-4">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title:</label>
                    <input
                        type="text"
                        id="title"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="file" className="form-label">Select Image:</label>
                    <input
                        type="file"
                        id="file"
                        className="form-control"
                        onChange={handleFileChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Upload Image</button>
            </form>

            <h2 className="mb-4">Gallery Images</h2>
            {images.length > 0 ? (
                <div className="row">
                    {images.map(image => (
                        <div className="col-md-4 mb-3" key={image.id}>
                            <div className="card">
                                <img src={image.image_path} alt={image.title} className="card-img-top" />
                                <div className="card-body">
                                    <h5 className="card-title">{image.title}</h5>
                                    <button className="btn btn-danger" onClick={() => handleDelete(image.id)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No images available.</p>
            )}
        </div>
    );
};

export default GalleryDashboard;
