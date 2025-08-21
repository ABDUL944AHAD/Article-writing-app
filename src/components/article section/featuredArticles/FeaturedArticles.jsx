import React from 'react'
import './FeaturedArticles.css'
import { motion } from 'framer-motion'

function FeaturedArticles() {
    const articlesData = [
        {
            id: 1,
            title: 'Why javascript is eating the world',
            excerpt: 'Explore the rise of JavaScript and how it has become a dominant force in web development',
            image: '/images/js.webp',
            author: "Sara khan",
            avatar: "/avatars/woman.png",
            date: '2024-01-15',
        },
        {
            id: 2,
            title: 'AI in Education: Revolution or Risk?',
            excerpt: 'How AI tools are reshaping learning experiences for students worldwide.',
            image: '/images/education.webp',
            author: 'Ali Rehman',
            avatar: '/avatars/boy.png',
            date: 'July 28, 2025',
        },
        {
            id: 3,
            title: 'Remote Work: New Normal',
            excerpt: 'Discover how remote work changed workplace culture forever.',
            image: '/images/remote.webp',
            author: 'Fatima Noor',
            avatar: '/avatars/girl.png',
            date: 'July 25, 2025',
        },
       
    ]

    return (
        <section
        className="featured-articles">
            <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8  , ease: 'easeOut' }}
                viewport={{ once: true, amount: 0.3 }}

            className="featured-header">
                <h2>Top picks for you</h2>
                <p>Curated reads from our editors and trending articles</p>
            </motion.div>
            <div className="featured-grid">
                {articlesData.map((article) => (
                    <motion.div
                        initial={{ opacity: 0, y: 60 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, ease: 'easeInOut' }}
                        viewport={{ once: true, amount: 0.3 }}
                        // whileHover={{y:-6}}
                     className="article-card" key={article.id}>
                        <img src={article.image} alt={article.title} className="article-image" />
                        <div className="article-content">
                            <h3>{article.title}</h3>
                            <p>{article.excerpt}</p>
                            <span className="article-date">{article.date}</span>
                            <div className="article-footer">
                                <img src={article.avatar} alt={article.author} className="author-avatar" />
                                <span>{article.author}</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>

    )
}

export default FeaturedArticles
