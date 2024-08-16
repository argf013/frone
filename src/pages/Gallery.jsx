import React, { useState, useEffect } from 'react';
import { fetchImages } from '../utils/handler'; // Pastikan path ini benar

const Gallery = () => {
    const [images, setImages] = useState([]);
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

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>Gallery</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {images.map(image => (
                    <div key={image.id} style={{ margin: '10px' }}>
                        <img src={image.image_path} alt={image.title} width="200px" />
                        <p>{image.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Gallery;
