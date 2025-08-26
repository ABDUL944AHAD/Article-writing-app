import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa";
import "./Footer.css";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                {/* Brand + tagline */}
                <div className="footer-brand">
                    <h3 className="footer-logo">DevWrite</h3>
                    <p className="footer-tagline">Your space to write, share & inspire.</p>
                </div>

                {/* Social icons */}
                <div className="footer-socials">
                    <a href="#" aria-label="Facebook"><FaFacebookF /></a>
                    <a href="#" aria-label="Twitter"><FaTwitter /></a>
                    <a href="#" aria-label="LinkedIn"><FaLinkedinIn /></a>
                    <a href="#" aria-label="GitHub"><FaGithub /></a>
                </div>
            </div>

            {/* Bottom line */}
            <div className="footer-bottom">
                <p>© {new Date().getFullYear()} DevWrite. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
