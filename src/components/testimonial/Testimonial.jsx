import React from "react";
import "./Testimonial.css";

const testimonialsData = [
    {
        name: "Khalil Latif",
        text: "This platform changed the way I learn programming. The articles are clear and practical!",
        avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHVzZXIlMjBwcm9maWxlfGVufDB8fDB8fHww", // optional avatar
    },
    {
        name: "Sara Ahmed",
        text: "I love writing here! It's easy, fun, and my articles reach thousands of readers.",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
    },
    {
        name: "Ali Khan",
        text: "The user interface is beautiful and intuitive. Reading articles here is a joy!",
        avatar: "https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?semt=ais_hybrid&w=740&q=80",
    },
];

function Testimonials() {
    return (
        <section className="testimonials">
            <h2>What Our Readers Say</h2>
            <div className="testimonial-cards">
                {testimonialsData.map((t, index) => (
                    <div className="testimonial-card" key={index}>
                        <p>"{t.text}"</p>
                        <div className="testimonial-author">
                            {t.avatar && <img src={t.avatar} alt={t.name} />}
                            <h3>{t.name}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Testimonials;
