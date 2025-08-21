// src/components/ArticleDetail.jsx
import React from 'react';
import './ArticleDetail.css';
import { useParams, useNavigate } from 'react-router-dom';
import { div } from 'framer-motion/client';

const allArticlesData = [
    {
        id: 1,
        title: 'Why JavaScript is Eating the World',
        excerpt: 'Explore the rise of JavaScript and how it’s shaping modern web development.',
        image: '/images/js.webp',
        author: 'Sara Khan',
        avatar: '/avatars/girl.png',
        date: '2025-07-30',
        category: 'Programming',
    },
    {
        id: 2,
        title: 'Tech’s Role in Shaping the Future',
        excerpt: 'How emerging technologies are transforming industries.',
        image: '/images/tech-future.jpg',
        author: 'Ali Raza',
        avatar: '/avatars/ali.jpg',
        date: '2025-07-28',
        category: 'Tech',
    },
    {
        id: 3,
        title: 'Education in the Digital Age',
        excerpt: 'Online learning, AI tutors, and what education looks like tomorrow.',
        image: '/images/education-digital.jpg',
        author: 'Fatima Noor',
        avatar: '/avatars/fatima.jpg',
        date: '2025-07-25',
        category: 'Education',
    },
    {
            id: 4,
            title: 'Everyday Wellness: Building Healthy Habits',
            excerpt: 'Simple and effective ways to stay mentally and physically healthy in daily life.',
            image: '/images/health.avif',
            author: 'Dr. Ayesha Malik',
            avatar: '/avatars/ladki.png',
            date: 'August 1, 2025',
        },
        {
            id: 5,
            title: 'Global Flavors: A Foodie’s Guide',
            excerpt: 'Explore culinary traditions from around the world.',
            image: '/images/food.avif',
            author: 'Omer Zafar',
            avatar: '/avatars/samar.png',
            date: 'August 3, 2025',
        },
        {
            id: 6,
            title: 'Backpacking Europe on a Budget',
            excerpt: 'Tips and tricks for affordable and memorable adventures.',
            image: '/images/travel.png',
            author: 'Mehwish Tariq',
            avatar: '/avatars/mehwish.png',
            date: 'August 4, 2025',
        },
        {
            id: 7,
            title: 'The Wonders of Space Exploration',
            excerpt: 'From Mars missions to black holes, explore recent breakthroughs in science.',
            image: '/images/space.png',
            author: 'Dr. Kamran Aziz',
            avatar: '/avatars/kamran.png',
            date: 'August 2, 2025',
        },
        {
            id: 8,
            title: 'Smart Money: Financial Planning for Youth',
            excerpt: 'Learn the basics of budgeting, saving, and investing early.',
            image: '/images/finance.avif',
            author: 'Nida Jameel',
            avatar: '/avatars/nida.png',
            date: 'August 4, 2025',
        },
];

const ArticleDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const article = allArticlesData.find((a) => a.id === parseInt(id));

    if (!article) return <div>Article not found</div>;
    console.log("Article ID from URL:", id);
    console.log("All Articles Data:", allArticlesData);
    console.log("Found Article:", article);

    return (
        <>

        {/* 🧭 Back Button */ }
        < button className = "back-button" onClick = {() => navigate('/')}>
                ← Back to Home
            </button >
        <div className="article-detail">
            <img src={article.image} alt={article.title} className="detail-image" />
            <h1>{article.title}</h1>
            <div className="author-section">
                <img src={article.avatar} alt={article.author} className="detail-avatar" />
                <div>
                    <p className="author-name">{article.author}</p>
                    <p className="article-date">{article.date}</p>
                </div>
            </div>
            <p className="article-category">{article.category}</p>
            <p className="article-excerpt">{article.excerpt}</p>
            <p className="article-body">
                {/* Placeholder content for now */}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
            </p>
        </div>
        </>
    );
};

export default ArticleDetail;
