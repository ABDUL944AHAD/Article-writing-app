// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HeroSection from './components/hero/HeroSection';
import Navbar from './components/navbar/Navbar';
import Categories from './components/categories/Categories';
import FeaturedArticles from './components/article section/featuredArticles/FeaturedArticles';
import AllArticles from './components/article section/allArticles/AllArticles';
import ArticleForm from './components/article editor/ArticleForm';
function HomePage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <Categories />
      <FeaturedArticles />
      <AllArticles />
    </>
  );
}

function CreateArticlePage() {
  return (
    <>
      <Navbar />
      <ArticleForm />
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create-article" element={<CreateArticlePage />} />
      </Routes>
    </Router>
  );
}

export default App;
