// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HeroSection from './components/hero/HeroSection';
import Navbar from './components/navbar/Navbar';
import Categories from './components/categories/Categories';
import FeaturedArticles from './components/article section/featuredArticles/FeaturedArticles';
import AllArticles from './components/article section/allArticles/AllArticles';
import ArticleForm from './components/article editor/ArticleForm';
import ArticleDetail from './components/article section/articleDetail/ArticleDetail';
import Testimonials from './components/testimonial/Testimonial';
import Banner from './components/banner/Banner';
import Newsletter from './components/newsletter/Newsletter';
import Footer from './components/footer/Footer';
function HomePage() {
  return (
    <>
      <HeroSection />
      <Categories />
      <FeaturedArticles />
      <AllArticles  />
      <Testimonials/>
      <Banner/>
      <Newsletter/>
      <Footer/>
    </>
  );
}

function CreateArticlePage() {
  return (
    <>
      <ArticleForm />
    </>
  );
}

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create-article" element={<CreateArticlePage />} />
        <Route path='/article/:id' element={<ArticleDetail/>}/>
      </Routes>
    </Router>
  );
}

export default App;
