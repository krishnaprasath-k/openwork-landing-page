import React, { useState } from 'react';
import './DirectContractSection.css';

const DirectContractSection = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [jobRequirements, setJobRequirements] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [amount, setAmount] = useState('48.81');
  const [selectedOracle, setSelectedOracle] = useState('UX/UI Skill Oracle');
  const [activeTab, setActiveTab] = useState('customer');

  const handleEnterContract = () => {
    console.log('Enter Contract clicked');
  };

  return (
    <section id="lp-5-section" className="lp-section direct-contract-section">
      <div className="direct-contract-container">
        {/* Left Content */}
        <div className="direct-contract-content">
          <div className="tab-buttons">
            <button 
              className={`tab-button ${activeTab === 'customer' ? 'active' : ''}`}
              onClick={() => setActiveTab('customer')}
            >
              For customer
            </button>
            <button 
              className={`tab-button ${activeTab === 'talents' ? 'active' : ''}`}
              onClick={() => setActiveTab('talents')}
            >
              For talents
            </button>
          </div>

          <h1 className="direct-contract-heading">Direct Contract</h1>
          
          <p className="direct-contract-description">
            Customers and Talents can establish direct contracts with one another.
          </p>

          <button className="read-whitepaper-button">
            <span>Read Whitepaper</span>
            <img src="/assets/arrow-right-icon.svg" alt="" className="button-arrow-icon" />
          </button>
        </div>

        {/* Right Form Card */}
        <div className="create-contract-card">
          <div className="card-header">
            <img src="/assets/back-arrow-icon.svg" alt="" className="back-icon" />
            <h2 className="card-title">Create a Direct Contract</h2>
          </div>

          <p className="card-description">
            Enter a contract directly with someone you know here. This gives access to OpenWork's dispute resolution and helps build profile strength for both parties.
          </p>

          <div className="form-content">
            {/* Job Title */}
            <div className="form-group">
              <label className="form-label">Job Title</label>
              <input 
                type="text" 
                className="form-input"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
              />
            </div>

            {/* Job Requirements */}
            <div className="form-group">
              <label className="form-label">Job Requirements</label>
              <input 
                type="text" 
                className="form-input"
                value={jobRequirements}
                onChange={(e) => setJobRequirements(e.target.value)}
              />
            </div>

            {/* Skill Tags */}
            <div className="skill-tags">
              <button className="skill-tag">UX Design</button>
              <button className="skill-tag">Product Design</button>
              <button className="skill-tag">Webflow</button>
            </div>

            {/* File Upload */}
            <div className="file-upload-area">
              <img src="/assets/upload-icon.svg" alt="" className="upload-icon" />
              <span className="upload-text">Click here to upload or drop files here</span>
            </div>

            {/* Wallet Address */}
            <div className="form-group">
              <label className="form-label">Wallet Address of the Job Taker</label>
              <input 
                type="text" 
                className="form-input"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
              />
            </div>

            {/* Amount and Platform Fees */}
            <div className="amount-section">
              <div className="amount-input-wrapper">
                <input 
                  type="text" 
                  className="amount-input"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <img src="/assets/coin-icon.png" alt="" className="coin-icon" />
              </div>

              <div className="platform-fees">
                <div className="fees-label">
                  <span>PLATFORM FEES</span>
                  <img src="/assets/info-icon.svg" alt="" className="info-icon" />
                </div>
                <span className="fees-value">5%</span>
              </div>
            </div>

            {/* Skill Oracle Dropdown */}
            <div className="oracle-section">
              <label className="oracle-label">CHOOSE A SKILL ORACLE FOR DISPUTE RESOLUTION</label>
              <div className="oracle-dropdown">
                <span>{selectedOracle}</span>
                <img src="/assets/chevron-down-icon.svg" alt="" className="chevron-icon" />
              </div>
            </div>
          </div>

          {/* Enter Contract Button */}
          <button className="enter-contract-button" onClick={handleEnterContract}>
            Enter Contract
          </button>
        </div>
      </div>
    </section>
  );
};

export default DirectContractSection;