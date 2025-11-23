import React from 'react';
import Button from '../../../../components/Button/Button';
import './HeroSection.css';

const HeroSection = () => {
  const handleLearnMore = () => {
    document.getElementById('lp-2-section').scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  const handleDiscoverable = () => {
    document.getElementById('lp-2-section').scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  const handleDirectContract = () => {
    document.getElementById('lp-5-section').scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  const handleJobProgress = () => {
    document.getElementById('lp-6-section').scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  const handlePostJob = () => {
    document.getElementById('lp-4-section').scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  const handleRaiseDispute = () => {
    document.getElementById('lp-7-section').scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  const handleDAO = () => {
    const element = document.getElementById('lp-9-section');
    if (element) {
      const yOffset = -100; // Offset to bring it down a bit
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleSetProfile = () => {
    document.getElementById('lp-2-section').scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  const handleBotClick = () => {
    window.open('https://chatgpt.com/g/g-6811cd644b1c8191b203796b06deaa4a-openwork-simplified', '_blank');
  };

  return (
    <section className="lp-section lp-1-section">
      <main className="landing-main">
        {/* Glow Wrapper with Mask */}
        <div className="glow-wrapper">
          {/* Radiant Glow Background */}
          <div className="radiant-glow-container"></div>
        </div>

        {/* Background Circle Group */}
        <div className="circle-group">
          {/* Main Circle */}
          <img 
            src="/assets/f0a5bddf438bec766e653cd0886722bed6ea4ee3.svg" 
            alt="" 
            className="main-circle-bg"
          />
        </div>

        {/* Floating Icon Buttons */}
        <div className="floating-icons">
          <Button 
            icon="/assets/62526e6f62a12cd8f3ecb86db19a495650068ad0.svg"
            buttonCss="icon-btn icon-discoverable"
            label="Discoverable"
            onClick={handleDiscoverable}
          />
          <Button 
            icon="/assets/48d7e8cd65b4036c787ad29a2bdce07c13f29021.svg"
            buttonCss="icon-btn icon-direct-contract"
            label="Direct Contract"
            onClick={handleDirectContract}
          />
          <Button 
            icon="/assets/7fbdaad122c8922623aaea9b99c9cdd6cc503c6f.svg"
            buttonCss="icon-btn icon-job-progress"
            label="Job In Progress"
            onClick={handleJobProgress}
          />
          <Button 
            icon="/assets/5993be528342167da5598a847635eb201549dae4.svg"
            buttonCss="icon-btn icon-post-job"
            label="Post Job"
            onClick={handlePostJob}
          />
          <Button 
            icon="/assets/0db7d9f3333eba0f15f08e07625cd29728a834ec.svg"
            buttonCss="icon-btn icon-raise-dispute"
            label="Raise Dispute"
            onClick={handleRaiseDispute}
          />
          <Button 
            icon="/assets/141af504612ac4760b6ff60cc6346fee9cea46cc.svg"
            buttonCss="icon-btn icon-dao"
            label="DAO"
            onClick={handleDAO}
          />
          <Button 
            icon="/assets/3d388d45b23ed4826566c6c199aff49f93e7acec.svg"
            buttonCss="icon-btn icon-set-profile"
            label="Set Profile"
            onClick={handleSetProfile}
          />
        </div>

        {/* Navbar Floating Icons for Mobile */}
        <div className="navbar-floating-icons">
          <Button 
            icon="/assets/f424bb301166452f1d2aae2badd19051c2788323.svg"
            buttonCss="navbar-icon-btn navbar-icon-bot"
            onClick={handleBotClick}
          />
          <Button 
            icon="/assets/203519ed928f5759c5c5434e7d71de7598f55b96.svg"
            buttonCss="navbar-icon-btn navbar-icon-2"
          />
          <Button 
            icon="/assets/141ae2395558d7fc65c358b46cf1beaa163ad655.svg"
            buttonCss="navbar-icon-btn navbar-icon-3"
          />
        </div>

        {/* Center Content */}
        <div className="center-content">
          <div className="text-content">
            <h1 className="main-heading">The future of work is decentralised.</h1>
            <p className="main-description">
              OpenWork is a decentralised work protocol, allowing people to work 
              directly with each other using blockchain technology, with decentralised governance.
            </p>
          </div>
          
          <button 
            className="lp-blue-button"
            onClick={handleLearnMore}
          >
            Learn More
            <img src="/assets/b16a6ff87b2913f8bdc303dda7816c024bd687cb.svg" alt="" className="lp-button-icon" />
          </button>
        </div>
      </main>
    </section>
  );
};

export default HeroSection;
