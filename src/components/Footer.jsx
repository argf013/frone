import React from "react";
import Instagram from '../components/.logo/Instagram';
import Tiktok from '../components/.logo/Tiktok';
import Youtube from '../components/.logo/Youtube';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer mt-auto py-3 bg-dark">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 d-flex flex-column align-items-center text-center py-1 gap-2">
                        <a className="px-3" href="https://www.instagram.com/bbalconist/" target="_blank" rel="noopener noreferrer">
                            <Instagram />
                            bbalconist
                        </a>
                        <a className="px-3" href="https://www.tiktok.com/@bbalconist?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer">
                            <Tiktok />
                            bbalconist
                        </a>
                        <a className="px-3" href="http://www.youtube.com/@Balconist" target="_blank" rel="noopener noreferrer">
                            <Youtube />
                            Balconist
                        </a>
                        <span className="text-white d-flex justify-content-center py-2">Copyright © 2024 Balconist All rights reserved</span>
                    </div>
                    <div className="col-md-6">
                        <div className="card rounded">
                            <div className="card-body rounded">
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
                                    <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput2" className="form-label">Email address</label>
                                    <input type="email" className="form-control" id="exampleFormControlInput2" placeholder="name@example.com" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Example textarea</label>
                                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;