import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HeroSection.css';

const HeroSection = () => {
  const navigate = useNavigate();
  const [isExpanding, setIsExpanding] = useState(false);
  const [activeIcon, setActiveIcon] = useState(null);
  const [expandDirection, setExpandDirection] = useState(null);
  const morphPathRef = useRef(null);

  const handleReadWhitepaper = () => {
    navigate('/whitepaper');
  };

  // Navigate with circle curve morph animation
  const navigateWithExpand = (sectionId, iconName) => {
    if (isExpanding) return;
    
    setActiveIcon(iconName);
    setIsExpanding(true);
    setExpandDirection(iconName);
    
    // Add class to body to trigger the portal transition
    document.body.classList.add('hero-transitioning');
    
    // Get the target section and add the unshrink animation class
    const targetEl = document.getElementById(sectionId);
    let targetSection = null;
    
    if (targetEl) {
      // Find the lp-section parent
      let section = targetEl;
      while (section && !section.classList.contains('lp-section')) {
        section = section.parentElement;
      }
      targetSection = section;
      if (section) {
        section.classList.add('page-unshrink-from-circle');
      }
    }
    
    // After animation completes, scroll to section and reset states
    setTimeout(() => {
      // Remove the unshrink class
      if (targetSection) {
        targetSection.classList.remove('page-unshrink-from-circle');
      }
      
      // NOW scroll to the target section (after animation is done)
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'instant', block: 'start' });
      }
      
      // Reset states
      setIsExpanding(false);
      setActiveIcon(null);
      setExpandDirection(null);
      document.body.classList.remove('hero-transitioning');
    }, 1000);
  };

  const handleHome = () => navigateWithExpand('lp-1-section', 'home');
  const handleDirectContract = () => navigateWithExpand('lp-5-section', 'direct');
  const handleDAO = () => navigateWithExpand('lp-7-section', 'dao');
  const handlePostJob = () => navigateWithExpand('lp-4-section', 'post');
  const handleBrowseJobs = () => navigateWithExpand('lp-6-section', 'search');
  const handleJobProgress = () => navigateWithExpand('lp-8-section', 'progress');
  const handleDisputes = () => navigateWithExpand('lp-9-section', 'disputes');

  // Get class for icon based on whether it's the active one
  const getIconClass = (iconName, baseClass) => {
    if (!isExpanding) return baseClass;
    if (activeIcon === iconName) {
      return `${baseClass} icon-traveling icon-travel-${iconName}`;
    }
    return `${baseClass} icon-fading`;
  };

  // Get container class based on expand direction
  const getContainerClass = () => {
    let classes = 'hero-design-container';
    if (isExpanding) {
      classes += ' expanding';
      if (expandDirection) {
        classes += ` expanding-${expandDirection}`;
      }
    }
    return classes;
  };

  return (
    <section className="lp-section lp-1-section">
      {/* Circle Portal Mask - reveals new page inside expanding circle */}
      {isExpanding && (
        <div className="circle-portal-overlay">
          <div className="circle-portal-mask"></div>
        </div>
      )}
      
      <main className="landing-main">
        {/* SVG Morphing Path - connects circle to sidebar */}
        <svg 
          className={`hero-morph-path-svg ${isExpanding ? 'animating' : ''} ${activeIcon ? `morph-${activeIcon}` : ''}`}
          viewBox="0 0 1200 800" 
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="morphGradient" x1="100%" y1="0%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#4D7FFF" stopOpacity="0.3" />
              <stop offset="30%" stopColor="#1246FF" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#1246FF" stopOpacity="1" />
              <stop offset="70%" stopColor="#1246FF" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#4D7FFF" stopOpacity="0.3" />
            </linearGradient>
            <filter id="morphGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur"/>
              <feMerge>
                <feMergeNode in="blur"/>
                <feMergeNode in="blur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          {/* Path that morphs from circle arc to sidebar curve */}
          <path
            ref={morphPathRef}
            className="morph-path"
            d="M 600 100 Q 750 400, 600 700"
            stroke="url(#morphGradient)"
            strokeWidth="2.5"
            fill="none"
            filter="url(#morphGlow)"
          />
        </svg>

        {/* Hero Design Container - contains circle + glow + icons */}
        <div className={getContainerClass()}>
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
          
          {/* Icon Buttons - positioned around the circle */}
          {/* Home - Top Center */}
          <button 
            className={getIconClass('home', 'hero-icon-btn hero-icon-home')}
            onClick={handleHome}
            aria-label="Home"
          >
            <img src="/assets/sidebar-icon-1.svg" alt="" />
          </button>

          {/* Direct Contract - Top Left */}
          <button 
            className={getIconClass('direct', 'hero-icon-btn hero-icon-direct')}
            onClick={handleDirectContract}
            aria-label="Direct Contract"
          >
            <img src="/assets/sidebar-icon-3.svg" alt="" />
          </button>

          {/* DAO - Top Right */}
          <button 
            className={getIconClass('dao', 'hero-icon-btn hero-icon-dao')}
            onClick={handleDAO}
            aria-label="DAO"
          >
            <img src="/assets/sidebar-icon-7.svg" alt="" />
          </button>

          {/* Post Job - Left Center */}
          <button 
            className={getIconClass('post', 'hero-icon-btn hero-icon-post')}
            onClick={handlePostJob}
            aria-label="Post Job"
          >
            <img src="/assets/sidebar-icon-2.svg" alt="" />
          </button>

          {/* Browse Jobs (Search) - Right Center */}
          <button 
            className={getIconClass('search', 'hero-icon-btn hero-icon-search')}
            onClick={handleBrowseJobs}
            aria-label="Browse Jobs"
          >
            <img src="/assets/search-icon.svg" alt="" />
          </button>

          {/* Job Progress - Bottom Left */}
          <button 
            className={getIconClass('progress', 'hero-icon-btn hero-icon-progress')}
            onClick={handleJobProgress}
            aria-label="Job Progress"
          >
            <img src="/assets/sidebar-icon-4.svg" alt="" />
          </button>

          {/* Disputes - Bottom Right */}
          <button 
            className={getIconClass('disputes', 'hero-icon-btn hero-icon-disputes')}
            onClick={handleDisputes}
            aria-label="Disputes"
          >
            <img src="/assets/sidebar-icon-5.svg" alt="" />
          </button>
        </div>

        {/* Center Content */}
        <div className={`hero-center-content ${isExpanding ? 'fading' : ''}`}>
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
