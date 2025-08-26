// Newsletter.jsx
import React, { useState } from "react";
import "./Newsletter.css";

function Newsletter() {
    const [email, setEmail] = useState("");

    const handleSubscribe = (e) => {
        e.preventDefault();
        // implement subscription logic later
        alert(`Subscribed with ${email}`);
        setEmail("");
    };

    return (
        <section className="newsletter-section">
            <div className="newsletter-content">
                <h2>Stay Updated!</h2>
                <p>Subscribe to our newsletter and never miss a new article or update.</p>
                <form onSubmit={handleSubscribe} className="newsletter-form">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button type="submit">Subscribe</button>
                </form>
            </div>
        </section>
    );
}

export default Newsletter;
