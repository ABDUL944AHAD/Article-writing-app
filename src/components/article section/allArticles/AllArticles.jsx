import React, { useState } from 'react';
import axios from 'axios';
import './AllArticles.css';
import { Link } from 'react-router-dom';
import SkeletonCard from '../../Skeleton/Skeleton';
import { API_BASE_URL } from '../../../config/Config';

const sampleArticles = [
    {
        id: 1,
        articleName: "Streetwear Meets Elegance: The 2025 Bold Prints Trend",
        authorName: "Sara Khan",
        avatar: "/avatars/ladki.png",
        excerpt: "Oversized fits and bold prints are transforming streetwear into chic, everyday style.",
        category: "Fashion"
    },
    {
        id: 2,
        articleName: "The Quantum Leap in Computing",
        authorName: "Ali Mirza",
        avatar: "/avatars/samar.png",
        excerpt: "Quantum computers are moving from labs to real-world use, reshaping innovation.",
        category: "Science"
    },
    {
        id: 3,
        articleName: "Rising Digital Nomad Hotspots of 2025",
        authorName: "Nida Raza",
        avatar: "/avatars/nida.png",
        excerpt: "Remote workers are chasing sunsets in Bali, Lisbon, and Seoul while earning online and enjoying.",
        category: "Finance"
    },
    {
        id: 4,
        articleName: "SpaceX and the New Space Race",
        authorName: "Tariq Bilal",
        avatar: "/avatars/kamran.png",
        excerpt: "Interest in Mars missions and interstellar travel is surging, as new discoveries and innovations ",
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
            const response = await axios.get(`${API_BASE_URL}/articles/get`);
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


    const deleteArticle = async (id) => {
        try {
            // Call backend delete endpoint
            await axios.delete(`${API_BASE_URL}/article/delete/${id}`);

            // Remove it from frontend state
            setArticles(prev => prev.filter(article => article._id !== id && article.id !== id));
            console.log(`Article with ID ${id} deleted successfully!`);
        } catch (error) {
            console.error("Error deleting article:", error);
        }
    };
    const stripHtmlTags = (html) => {
        if (!html) return "";
        const div = document.createElement("div");
        div.innerHTML = html;
        return div.textContent || div.innerText || "";
    };


    return (
        <div className="all-articles" id='all-articles'>
            <div className="articles-header">
                <h2>Latest Articles</h2>
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

            <div className="allarticles-grid">
                {loading
                    ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />) // ✅ Show 4 skeletons while loading
                    : filteredArticles.length > 0
                        ? filteredArticles.map((article) => (
                            <Link
                                className={`article-card ${!showSamples ? "backend-article" : ""}`}
                                key={article._id || article.id}
                                to={`/article/${article._id || article.id}`}
                            >
                                {/* ✅ Show first image if available */}
                                {article.images && article.images.length > 0 && (
                                    <img
                                        src={article.images[0]}
                                        alt={article.articleName}
                                        className="article-thumbnail"
                                    />
                                )}

                                <div className="article-content">
                                    <h3>{article.articleName}</h3>
                                    <p>
                                        {article.excerpt
                                            ? article.excerpt
                                            : `${stripHtmlTags(article.articleContent)?.slice(0, 120)}...`}
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
                            </Link>
                        ))
                        : (
                            <p style={{ fontFamily: "Playwrite AU QLD" }}>
                                No articles found in this category.
                            </p>
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




