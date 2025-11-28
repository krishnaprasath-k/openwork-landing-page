import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HeroSection.css';

const HeroSection = () => {
  const navigate = useNavigate();

  const handleReadWhitepaper = () => {
    navigate('/whitepaper');
  };

  const handleDirectContract = () => {
    document.getElementById('lp-5-section').scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  const handleDAO = () => {
    document.getElementById('lp-7-section').scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  const handlePostJob = () => {
    document.getElementById('lp-4-section').scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  const handleBrowseJobs = () => {
    document.getElementById('lp-6-section').scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <section className="lp-section lp-1-section">
      <main className="landing-main">
        {/* Hero Design Container - contains circle + glow + icons */}
        <div className="hero-design-container">
          {/* Outer glow image */}
          <img 
            src="/assets/hero-glow.svg" 
            alt="" 
            className="hero-glow-image"
          />
          
          {/* Circle with gradient stroke */}
          <img 
            src="/assets/hero-circle-outer.svg" 
            alt="" 
            className="hero-circle-image"
          />
          
          {/* Icon Buttons - positioned relative to the 1280px container */}
          {/* Direct Contract - Top Left */}
          <button 
            className="hero-icon-btn hero-icon-direct"
            onClick={handleDirectContract}
            aria-label="Direct Contract"
          >
            <img src="/assets/sidebar-icon-5.svg" alt="" />
          </button>

          {/* DAO - Top Right */}
          <button 
            className="hero-icon-btn hero-icon-dao"
            onClick={handleDAO}
            aria-label="DAO"
          >
            <img src="/assets/sidebar-icon-7.svg" alt="" />
          </button>

          {/* Post Job - Left Center */}
          <button 
            className="hero-icon-btn hero-icon-post"
            onClick={handlePostJob}
            aria-label="Post Job"
          >
            <img src="/assets/sidebar-icon-2.svg" alt="" />
          </button>

          {/* Browse Jobs (Search) - Right Center */}
          <button 
            className="hero-icon-btn hero-icon-search"
            onClick={handleBrowseJobs}
            aria-label="Browse Jobs"
          >
            <img src="/assets/hero-search-icon.svg" alt="" />
          </button>
        </div>

        {/* Center Content */}
        <div className="hero-center-content">
          <div className="hero-text-content">
            <h1 className="hero-main-heading">The future of work is decentralised.</h1>
            <p className="hero-main-description">
              OpenWork is a decentralised work protocol, allowing people to work 
              directly with each other using blockchain technology, with decentralised governance.
            </p>
          </div>
          
          <button 
            className="hero-cta-button"
            onClick={handleReadWhitepaper}
          >
            Read Whitepaper
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.666667 7.33333L7.33333 0.666667M7.33333 0.666667H0.666667M7.33333 0.666667V7.33333" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </main>
    </section>
  );
};

export default HeroSection;
