import img from '../assets/img/artist/bhb.png';
import img2 from '../assets/img/artist/hecoz 1.png';
import img3 from '../assets/img/artist/tigarist 1.png';
import img4 from '../assets/img/artist/jaded 1.png';
import img5 from '../assets/img/artist/tdr 1.png';
import './Artist.css';

const Artist = () => {
    return (
        <div className="container text-center my-5">
            <div className="h1-artist display-1 mb-5">Artist</div>
            <div className="row justify-content-center">
                <div className="col-12 col-md-2">
                    <div className="image-container">
                        <img className="poto rounded img-fluid" src={img} alt="Artist 1" />
                        <div className="overlay">BlueHasanBlue</div>
                    </div>
                </div>
                <div className="col-12 col-md-2">
                    <div className="image-container">
                        <img className="poto rounded img-fluid" src={img2} alt="Artist 2" />
                        <div className="overlay">Hecoz</div>
                    </div>
                </div>
                <div className="col-12 col-md-2">
                    <div className="image-container">
                        <img className="poto rounded img-fluid" src={img3} alt="Artist 3" />
                        <div className="overlay">Tigarist</div>
                    </div>
                </div>
                <div className="col-12 col-md-2">
                    <div className="image-container">
                        <img className="poto rounded img-fluid" src={img4} alt="Artist 4" />
                        <div className="overlay">Jaded</div>
                    </div>
                </div>
                <div className="col-12 col-md-2">
                    <div className="image-container">
                        <img className="poto rounded img-fluid" src={img5} alt="Artist 5" />
                        <div className="overlay">The Dusty Rusty</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Artist;