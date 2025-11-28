import React from 'react';
import { useNavigate } from 'react-router-dom';
import './GovernanceSection.css';

const GovernanceSection = () => {
  const navigate = useNavigate();

  return (
    <section id="lp-7-section" className="lp-section lp-7-governance-section">
      <div className="governance-container">
        <div className="governance-content">
          <div className="governance-tag">
            <span>For governance</span>
          </div>
          <h1 className="governance-heading">Decentralized Autonomous Organization</h1>
          <p className="governance-description">
            As a governance, you can explore Decentralized Autonomous Organization (DAO) and skill oracles on Open Work seamlessly.
          </p>
          <button 
            className="governance-button"
            onClick={() => navigate('/whitepaper')}
          >
            Read Whitepaper
            <img src="/assets/arrow-up-right.svg" alt="" className="governance-button-icon" />
          </button>
        </div>

        <div className="dao-card">
          <div className="dao-card-header">
            <button className="dao-back-btn">
              <img src="/assets/chevron-down.svg" alt="Back" className="dao-back-icon" />
            </button>
            <h3 className="dao-card-title">Join the DAO</h3>
          </div>
          
          <div className="dao-card-body">
            <div className="dao-icon-wrapper">
              <img src="/assets/lp9-governance-icon.svg" alt="DAO" className="dao-icon" />
            </div>
            
            <p className="dao-card-description">
              OpenWork token holders govern the OpenWork DAO, which in turn governs the smart contracts, treasury and Athena's Skill Oracles. Read the OpenWork Paper to understand how it all works
            </p>
            
            <a href="/whitepaper" className="dao-paper-link">
              Read the OpenWork Paper
              <img src="/assets/arrow-up-right-blue.svg" alt="" className="dao-link-icon" />
            </a>
            
            <div className="dao-staking-info">
              <div className="dao-staking-row">
                <span className="dao-staking-label">MINIMUM STAKING AMOUNT</span>
                <div className="dao-staking-value">
                  <span>1,000,000</span>
                  <div className="dao-token-icon">
                    <img src="/assets/openwork-token.svg" alt="OWORK" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="dao-input-row">
              <input 
                type="text" 
                className="dao-amount-input" 
                placeholder="48.81"
                defaultValue="48.81"
              />
              <div className="dao-token-icon">
                <img src="/assets/openwork-token.svg" alt="OWORK" />
              </div>
            </div>
            
            <button className="dao-join-button">
              Join DAO
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GovernanceSection;
