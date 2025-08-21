import React, { useState } from 'react';
import axios from 'axios';
import './AllArticles.css';

const sampleArticles = [
    {
        id: 1,
        articleName: "Why JavaScript is Eating the World",
        authorName: "Sara Khan",
        avatar: "/avatars/sara.jpg",
        excerpt: "Explore the rise of JavaScript and how it’s shaping modern web development.",
        category: "Programming"
    },
    {
        id: 2,
        articleName: "The Future of Education in the AI Era",
        authorName: "Ali Mirza",
        avatar: "/avatars/ali.jpg",
        excerpt: "How artificial intelligence is revolutionizing modern classrooms.",
        category: "Education"
    },
    {
        id: 3,
        articleName: "Fintech Startups to Watch in 2025",
        authorName: "Nida Raza",
        avatar: "/avatars/nida.jpg",
        excerpt: "We review the most promising fintech players disrupting the industry.",
        category: "Finance"
    },
    {
        id: 4,
        articleName: "SpaceX and the New Space Race",
        authorName: "Tariq Bilal",
        avatar: "/avatars/tariq.jpg",
        excerpt: "The renewed global interest in Mars missions and interstellar travel.",
        category: "Science"
    }
];
const AllArticles = () => {
    // State: stores real articles fetched from backend
    const [articles, setArticles] = useState([]);

    // State: true while fetching articles from backend (for loading spinners, disabling buttons, etc.)
    const [loading, setLoading] = useState(false);

    // State: controls whether to show hardcoded sample articles or fetched backend articles
    const [showSamples, setShowSamples] = useState(true);

    // State: which category is currently selected ("All" = show everything)
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Function: fetches real articles from backend
    const loadMoreArticles = async () => {
        setLoading(true); // Show loading indicator
        try {
            // Request articles from backend
            const response = await axios.get('http://localhost:3000/article/get');
            const fetchedArticles = response.data.data; // Extract array from response

            // Filter out any incomplete articles
            const filteredArticles = fetchedArticles.filter(
                (article) =>
                    article.articleName &&  // Must have title
                    article.authorName &&   // Must have author
                    article.articleContent  // Must have content
            );

            // Save the clean list to state
            setArticles(filteredArticles);

            // Switch from showing samples to showing real fetched articles
            setShowSamples(false);

        } catch (error) {
            console.error("Error loading articles:", error);
        } finally {
            setLoading(false); // Stop loading indicator no matter what
        }
    };

    // Function: goes back to showing only sample articles
    const showLessArticles = () => {
        setArticles([]);              // Remove fetched articles
        setShowSamples(true);          // Switch back to showing samples
        setSelectedCategory('All');    // Reset category filter
    };

    // Decide which list to show: samples or fetched articles
    const combinedArticles = showSamples ? sampleArticles : articles;

    // Generate category list for filter dropdown/buttons
    const categories = [
        'All', // Always have "All" option
        ...Array.from(
            new Set(
                combinedArticles.map(
                    (article) => article.category || 'Uncategorized' // If no category, label as "Uncategorized"
                )
            )
        )
    ];

    // Filter articles based on selected category
    const filteredArticles = selectedCategory === 'All'
        ? combinedArticles // No filter → show everything
        : combinedArticles.filter(article => article.category === selectedCategory);


    return (
        <div className="featured-articles">
            <div className="featured-header">
                <h2>All Articles</h2>
                <p>Browse our latest insights, tutorials, and educational write-ups.</p>

                {/* Category buttons */}
                <div className="category-buttons" >
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            style={{
                                padding: '0.5rem 1.25rem',
                                backgroundColor: selectedCategory === cat ? '#2563EB' : '#F1F5F9',
                                color: selectedCategory === cat ? '#ffffff' : '#0F172A',
                                border: selectedCategory === cat ? 'none' : '1px solid #CBD5E1',
                                borderRadius: '0.75rem',
                                fontFamily: 'Playwrite AU QLD',
                                fontWeight: '500',
                                fontSize: '0.95rem',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                boxShadow: selectedCategory === cat ? '0 4px 10px rgba(37, 99, 235, 0.3)' : 'none',
                            }}
                            onMouseEnter={(e) => {
                                if (selectedCategory !== cat) {
                                    e.target.style.backgroundColor = '#E2E8F0';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (selectedCategory !== cat) {
                                    e.target.style.backgroundColor = '#F1F5F9';
                                }
                            }}
                        >
                            {cat}
                        </button>

                    ))}
                </div>
            </div>

            <div className="featured-grid">
                {filteredArticles.length > 0 ? filteredArticles.map((article) => (
                    <div className="article-card" key={article._id || article.id}>
                        <div className="article-content">
                            <h3>{article.articleName}</h3>
                            <p>
                                {article.excerpt
                                    ? article.excerpt
                                    : `${article.articleContent?.slice(0, 100)}...`}
                            </p>
                            <div className="article-footer">
                                {article.avatar && (
                                    <img
                                        src={article.avatar}
                                        alt={article.authorName}
                                        className="author-avatar"
                                    />
                                )}
                                <span>{article.authorName}</span>
                            </div>
                        </div>
                    </div>
                )) : (
                    <p style={{ fontFamily: 'Playwrite AU QLD' }}>No articles found in this category.</p>
                )}
            </div>

            {/* Button */}
            <div style={{ marginTop: '2rem' }}>
                {showSamples ? (
                    <button
                        onClick={loadMoreArticles}
                        disabled={loading}
                        style={{
                            padding: '0.75rem 1.5rem',
                            backgroundColor: '#2563EB',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '0.5rem',
                            fontFamily: 'Playwrite AU QLD',
                            cursor: 'pointer'
                        }}
                    >
                        {loading ? 'Loading...' : 'Load More'}
                    </button>
                ) : (
                    <button
                        onClick={showLessArticles}
                        style={{
                            padding: '0.75rem 1.5rem',
                            backgroundColor: '#1E40AF',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '0.5rem',
                            fontFamily: 'Playwrite AU QLD',
                            cursor: 'pointer'
                        }}
                    >
                        Show Less
                    </button>
                )}
            </div>
        </div>
    );
};

export default AllArticles;




