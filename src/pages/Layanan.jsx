import { Link } from "react-router-dom";
import img from '../assets/img/layanan/layanan 1.jpg';
import img2 from '../assets/img/layanan/layanan 1.jpg';
import img3 from '../assets/img/layanan/layanan 1.jpg';
import './layanan.css';

const Layanan = () => {
    return (
        <div className="h1-layanan container mt-5 d-flex flex-column align-items-center gap-4 vh-100 text-center">
            <div className="display-1 mb-1">Layanan</div>
            <div className="d-flex flex-wrap justify-content-center gap-3">
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    <div className="col">
                        <div className="rounded-5 card">
                            <img src={img} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">Aransemen</h5>
                                <p className="card-text">Menyampaikan pesan-pesan melalui lagu berdurasi pendek dengan lirik dan musik yang easy listening agar BRAND ANDA selalu diingat oleh konsumen.</p>
                                <Link to="/layanan/aransemen" className="btn btn-detail-layanan btn-detail-layanan border-0">Lihat Selengkapnya</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="rounded-5 card">
                            <img src={img2} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">Mixing & Mastering</h5>
                                <p className="card-text">Menyampaikan pesan-pesan melalui lagu berdurasi pendek dengan lirik dan musik yang easy listening agar BRAND ANDA selalu diingat oleh konsumen.</p>
                                <Link to="/layanan/mixing-mastering" className="btn btn-detail-layanan border-0">Lihat Selengkapnya</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="rounded-5 card">
                            <img src={img3} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">Soundtrack</h5>
                                <p className="card-text">Menyampaikan pesan-pesan melalui lagu berdurasi pendek dengan lirik dan musik yang easy listening agar BRAND ANDA selalu diingat oleh konsumen.</p>
                                <Link to="/layanan/soundtrack" className="btn btn-detail-layanan border-0">Lihat Selengkapnya</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Layanan;