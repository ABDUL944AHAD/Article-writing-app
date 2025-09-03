import React, { useState } from 'react';
import TiptapEditor from './Editor';
import axios from 'axios';
import Toast from '../Toaster/Toast';
import './ArticleForm.css';

const ArticleForm = () => {
    const [articleName, setArticleName] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [category, setCategory] = useState('');
    const [articleContent, setArticleContent] = useState('');
    const [toastMessage, setToastMessage] = useState('');
    const [images, setImages] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!articleName || !authorName || !category || !articleContent) {
            setToastMessage("⚠️ Please fill in all fields");
            return;
        }

        try {
            await axios.post('http://localhost:5000/articles/save', {
                articleName,
                authorName,
                category,
                articleContent,
                images,
            });

            setToastMessage("🚀 Great job! Your article is published. Check it out in All Articles!");
            
            // Reset form fields
            setArticleName('');
            setAuthorName('');
            setCategory('');
            setArticleContent('');
            setImages([]);
        } catch (error) {
            console.error('Submission error:', error);
            setToastMessage("❌ Error submitting article");
        }
    };

    return (
        <>
            <form className="article-form" onSubmit={handleSubmit}>
                <h2>Create New Article</h2>

                <input
                    type="text"
                    placeholder="Title"
                    value={articleName}
                    onChange={(e) => setArticleName(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Author Name"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                />

                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="">Select Category</option>
                    <option value="Programming">Programming</option>
                    <option value="Tech">Tech</option>
                    <option value="Education">Education</option>
                    <option value="Science">Science</option>
                    <option value="Health">Health</option>
                    <option value="Finance">Finance</option>
                    <option value="Travel">Travel</option>
                    <option value="Food">Food</option>
                    <option value="Progress">Progress</option>
                </select>

                <TiptapEditor 
                    onChange={setArticleContent} 
                    onImagesChange={setImages} 
                />

                <button type="submit">Submit Article</button>
            </form>

            {toastMessage && (
                <Toast message={toastMessage} onClose={() => setToastMessage('')} />
            )}
        </>
    );
};

export default ArticleForm;
