import { useState, useEffect } from 'react';
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
            <div className="container mt-5 d-flex flex-column align-items-center">
                <h1 className="display-1 text-center">Gallery</h1>
            </div>
            
            <div className="d-flex flex-wrap justify-content-center">
                {images.map(image => (
                    <div key={image.id} className="m-2">
                        <img src={image.image_path} alt={image.title} className="img-fluid" style={{ width: '200px' }} />
                        <p className="text-center">{image.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Gallery;