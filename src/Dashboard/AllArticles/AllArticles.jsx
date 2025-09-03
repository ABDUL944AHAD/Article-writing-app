import React, { useState, useEffect } from "react";
import axios from "axios";
import SkeletonCard from "../../components/Skeleton/Skeleton";
import "./AllArticles.css";

const AllArticles = ({ role, token }) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visibleCount, setVisibleCount] = useState(6); // Show 6 initially
    const [selectedCategory, setSelectedCategory] = useState("All");

    // Fetch articles
    useEffect(() => {
        const fetchArticles = async () => {
            setLoading(true);
            try {
                const url =
                    role === "admin"
                        ? "http://localhost:5000/admin/articles"
                        : "http://localhost:5000/articles/my";

                const res = await axios.get(url, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const data = role === "admin" ? res.data : res.data.data;
                setArticles(data);
            } catch (err) {
                console.error("Error fetching articles:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchArticles();
    }, [role, token]);

    // Delete article
    const deleteArticle = async (id) => {
        if (!window.confirm("Are you sure you want to delete this article?")) return;

        try {
            const url =
                role === "admin"
                    ? `http://localhost:5000/admin/articles/${id}`
                    : `http://localhost:5000/articles/delete/${id}`;

            await axios.delete(url, { headers: { Authorization: `Bearer ${token}` } });
            setArticles((prev) => prev.filter((a) => a._id !== id));
            alert("Article deleted successfully!");
        } catch (err) {
            console.error("Delete error:", err);
            alert("Failed to delete article.");
        }
    };

    // Update article
    const updateArticle = (article) => {
        window.location.href = `/editor/${article._id}`;
    };

    // Categories
    const categories = [
        "All",
        ...Array.from(new Set(articles.map((a) => a.category || "Other"))),
    ];

    // Filtered articles
    const filteredArticles =
        selectedCategory === "All"
            ? articles
            : articles.filter((a) => (a.category || "Other") === selectedCategory);

    // Articles to show based on visibleCount
    const visibleArticles = filteredArticles.slice(0, visibleCount);

    // Strip HTML
    const stripHtml = (html) => {
        if (!html) return "";
        const div = document.createElement("div");
        div.innerHTML = html;
        return div.textContent || div.innerText || "";
    };

    return (
        <div className="all-articles">
            <div className="articles-header">
                <h2>All Articles</h2>
                <p>Browse the latest articles.</p>

                <div className="category-buttons">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={selectedCategory === cat ? "active" : ""}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className="allarticles-grid">
                {loading
                    ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
                    : visibleArticles.length > 0
                        ? visibleArticles.map((article) => (
                            <div key={article._id} className="article-card backend-article">
                                {article.images && article.images[0] && (
                                    <img
                                        src={article.images[0]}
                                        alt={article.articleName}
                                        className="article-thumbnail"
                                    />
                                )}
                                <div className="article-content">
                                    <h3>{article.articleName}</h3>
                                    <p>{stripHtml(article.articleContent).slice(0, 120)}...</p>
                                    <div className="article-footer">
                                        {article.avatar && (
                                            <img
                                                src={article.avatar}
                                                alt={article.authorName}
                                                className="author-avatar"
                                            />
                                        )}
                                        <span>{article.authorName}</span>

                                        {role === "admin" && (
                                            <div
                                                style={{
                                                    marginLeft: "auto",
                                                    display: "flex",
                                                    gap: "0.5rem",
                                                }}
                                            >
                                                <button onClick={() => updateArticle(article)}>Update</button>
                                                <button onClick={() => deleteArticle(article._id)}>Delete</button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                        : (
                            <p>No articles found in this category.</p>
                        )}
            </div>

            {/* Load More Button */}
            {visibleCount < filteredArticles.length && (
                <div style={{ marginTop: "2rem" }}>
                    <button
                        className="load-btn"
                        onClick={() => setVisibleCount((prev) => prev + 6)}
                    >
                        Load More
                    </button>
                </div>
            )}
        </div>
    );
};

export default AllArticles;
