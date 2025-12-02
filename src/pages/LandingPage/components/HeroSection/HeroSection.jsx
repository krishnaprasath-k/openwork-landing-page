import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HeroSection.css';

const HeroSection = () => {
  const navigate = useNavigate();

  const handleReadWhitepaper = () => {
    navigate('/whitepaper');
  };

  return (
    <section className="lp-section lp-1-section" id="lp-1-section">
      <main className="landing-main">
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
