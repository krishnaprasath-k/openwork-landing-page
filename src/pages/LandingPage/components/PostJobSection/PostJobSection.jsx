import React, { useState } from 'react';
import './PostJobSection.css';

const PostJobSection = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [jobRequirements, setJobRequirements] = useState('');
  const [amount, setAmount] = useState('48.81');
  const [selectedOracle, setSelectedOracle] = useState('UX/UI Skill Oracle');

  const handlePostJob = () => {
    console.log('Post Job clicked');
  };

  return (
    <section id="lp-4-section" className="lp-section lp-4-section">
      <div className="lp-4-container">
        {/* Left Content */}
        <div className="lp-4-content">
          <div className="lp-4-tags">
            <span className="lp-4-tag">For customer</span>
            <span className="lp-4-tag">For talents</span>
          </div>
          
          <h1 className="lp-4-heading">Post Job</h1>
          
          <p className="lp-4-description">
            Both Customers and Talents have the ability to post job opportunities on the Open Work Platform.
          </p>
          
          <button className="lp-4-button">
            <span>Read Whitepaper</span>
            <img src="/assets/arrow-right-icon.svg" alt="" className="lp-4-button-icon" />
          </button>
        </div>

        {/* Right Content - Job Creation Form */}
        <div className="lp-4-form-card">
          <div className="lp-4-form-header">
            <img src="/assets/arrow-left-icon.svg" alt="" className="lp-4-back-icon" />
            <span className="lp-4-form-title">Create a Job</span>
          </div>

          <div className="lp-4-form-content">
            <div className="lp-4-form-field">
              <input 
                type="text" 
                className="lp-4-input"
                placeholder="Job Title"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
              />
            </div>

            <div className="lp-4-form-field">
              <textarea 
                className="lp-4-textarea"
                placeholder="Job Requirements"
                value={jobRequirements}
                onChange={(e) => setJobRequirements(e.target.value)}
              />
            </div>

            <div className="lp-4-skill-tags">
              <span className="lp-4-skill-tag">UX Design</span>
              <span className="lp-4-skill-tag">Product Design</span>
              <span className="lp-4-skill-tag">Webflow</span>
            </div>

            <div className="lp-4-upload-area">
              <img src="/assets/upload-icon.svg" alt="" className="lp-4-upload-icon" />
              <span className="lp-4-upload-text">Click here to upload or drop files here</span>
            </div>

            <div className="lp-4-price-field">
              <input 
                type="text" 
                className="lp-4-price-input"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <img src="/assets/usdc-icon.png" alt="USDC" className="lp-4-usdc-icon" />
            </div>

            <div className="lp-4-oracle-field">
              <span className="lp-4-oracle-label">CHOOSE A SKILL ORACLE FOR DISPUTE RESOLUTION</span>
              <div className="lp-4-oracle-select">
                <span className="lp-4-oracle-value">{selectedOracle}</span>
                <img src="/assets/chevron-down-icon.svg" alt="" className="lp-4-chevron-icon" />
              </div>
            </div>
          </div>
          
          <button className="lp-4-submit-button" onClick={handlePostJob}>Post Job</button>
        </div>
      </div>
    </section>
  );
};

export default PostJobSection;