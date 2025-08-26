// Banner.jsx
import React from "react";
import "./Banner.css";

function Banner() {
    return (
        <section className="banner-section">
            <div className="banner-content">
                <h2>Join Our Community of Knowledge Seekers</h2>
                <p>
                    Discover, write, and explore articles that inspire and educate. Start contributing and make your voice heard!
                </p>
                <button className="banner-cta">Start Writing</button>
            </div>
            <div className="banner-image">
                <img
                    src="https://miro.medium.com/v2/resize:fit:1400/1*JCo7t_aIpbsKhifmPEDqpw.jpeg"
                    alt="Banner Illustration"
                />
            </div>
        </section>
    );
}

export default Banner;
