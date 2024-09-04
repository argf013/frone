import { useState, useEffect } from "react";
import './Home.css';
import img1 from '../assets/img/Balconist-6.jpg';
import img2 from '../assets/img/Balconist-7.jpg';
import img3 from '../assets/img/Balconist-8.jpg';

const images = [img1, img2, img3];

const Home = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [animationClass, setAnimationClass] = useState('animate__slideInLeft');

    useEffect(() => {
        const interval = setInterval(() => {
            setAnimationClass(''); // Remove animation class
            setTimeout(() => {
                setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
                setAnimationClass('animate__slideInLeft'); // Re-add animation class
            }, 50); // Small delay to allow class removal
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="container-sm d-flex align-items-center justify-content-center py-5 my-5">
            <div className="row d-flex align-items-center">
                <div className="col">
                    <h1 className="h1-title display-1">Balconist</h1>
                    <p className="p-title">Label Musik dan Studio Rekaman berbasis di Jakarta Utara</p>
                </div>
                <div className="col" id="image-container">
                    <img
                        src={images[currentImageIndex]}
                        className={`img-fluid rounded-3 img-balconist animate__animated ${animationClass}`}
                        alt="Ruangan Balconist"
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;