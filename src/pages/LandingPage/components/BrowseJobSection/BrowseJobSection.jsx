import React, { useState } from 'react';
import './BrowseJobSection.css';

const BrowseJobSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  // Mock data for the ledger table
  const ledgerData = [
    {
      id: 1,
      name: 'Mollie Hall',
      avatar: '/assets/user-avatar-1.png',
      rating: 4.9,
      skills: 'UX Design',
      skillCount: 5,
      experience: '4 Years',
      hourlyRate: 30
    },
    {
      id: 2,
      name: 'Jollie Hall',
      avatar: '/assets/user-avatar-2.png',
      rating: 3.2,
      skills: 'Webflow',
      skillCount: 2,
      experience: '10 Years',
      hourlyRate: 89
    },
    {
      id: 3,
      name: 'Mollie Hall',
      avatar: '/assets/user-avatar-1.png',
      rating: 4.9,
      skills: 'UX Design',
      skillCount: 5,
      experience: '4 Years',
      hourlyRate: 30
    },
    {
      id: 4,
      name: 'Jollie Hall',
      avatar: '/assets/user-avatar-2.png',
      rating: 3.2,
      skills: 'Webflow',
      skillCount: 2,
      experience: '10 Years',
      hourlyRate: 89
    },
    {
      id: 5,
      name: 'Mollie Hall',
      avatar: '/assets/user-avatar-1.png',
      rating: 4.9,
      skills: 'UX Design',
      skillCount: 5,
      experience: '4 Years',
      hourlyRate: 30
    }
  ];

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <section id="lp-6-section" className="browse-job-section">
      <div className="browse-job-container">
        {/* Left Content */}
        <div className="browse-job-content">
          <div className="browse-job-tag">
            <span>For talents</span>
          </div>

          <h1 className="browse-job-heading">Browse Job</h1>
          
          <p className="browse-job-description">
            Talents can efficiently search for relevant job opportunities and submit their bids accordingly.
          </p>

          <button className="browse-job-button">
            <span>Read Whitepaper</span>
            <img src="/assets/arrow-right-icon.svg" alt="" className="browse-job-button-icon" />
          </button>
        </div>

        {/* Right Ledger Panel */}
        <div className="openwork-ledger-panel">
          {/* Header */}
          <div className="ledger-header">
            <div className="ledger-header-left">
              <button className="ledger-back-btn">
                <img src="/assets/chevron-down-icon.svg" alt="" className="back-chevron" />
              </button>
              <h2 className="ledger-title">OpenWork Ledger</h2>
            </div>
            <div className="ledger-header-right">
              <button className="ledger-dropdown-btn">
                <span>Talent View</span>
                <img src="/assets/chevron-down-icon.svg" alt="" className="dropdown-chevron" />
              </button>
              <button className="ledger-dropdown-btn">
                <span>People</span>
                <img src="/assets/chevron-down-icon.svg" alt="" className="dropdown-chevron" />
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="ledger-toolbar">
            <div className="ledger-search">
              <img src="/assets/search-icon.svg" alt="" className="search-icon" />
              <input 
                type="text" 
                placeholder="Search"
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="ledger-filters">
              <button className="filter-btn">
                <span>Table Columns</span>
                <img src="/assets/chevron-down-icon.svg" alt="" className="filter-chevron" />
              </button>
              <button className="filter-btn">
                <span>Filter</span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.5 3H1.5M8.5 6H3.5M6.5 9H5.5" stroke="#868686" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="ledger-table-wrapper">
            <table className="ledger-table">
              <thead>
                <tr>
                  <th className="th-name">
                    <span>Name</span>
                    <svg className="sort-icon" width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 2V8M5 8L3 6M5 8L7 6" stroke="#868686" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </th>
                  <th className="th-rating">Rating</th>
                  <th className="th-skills">Skills</th>
                  <th className="th-experience">Experience</th>
                  <th className="th-hourly-rate">Hourly Rate</th>
                  <th className="th-action"></th>
                </tr>
              </thead>
              <tbody>
                {ledgerData.map((row) => (
                  <tr key={row.id}>
                    <td className="td-name">
                      <div className="name-cell">
                        <img src={row.avatar} alt={row.name} className="user-avatar" />
                        <span>{row.name}</span>
                      </div>
                    </td>
                    <td className="td-rating">
                      <div className="rating-cell">
                        <span className="rating-value">{row.rating}</span>
                        <svg className="star-icon" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6 1L7.545 4.13L11 4.635L8.5 7.07L9.09 10.51L6 8.885L2.91 10.51L3.5 7.07L1 4.635L4.455 4.13L6 1Z" fill="#FFB800" stroke="#FFB800" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </td>
                    <td className="td-skills">
                      <div className="skills-cell">
                        <span className="skill-tag">{row.skills}</span>
                        <span className="skill-count">+{row.skillCount}</span>
                      </div>
                    </td>
                    <td className="td-experience">
                      <span>{row.experience}</span>
                    </td>
                    <td className="td-hourly-rate">
                      <div className="rate-cell">
                        <span>{row.hourlyRate} / Hr</span>
                        <img src="/assets/coin-icon.png" alt="coin" className="coin-icon" />
                      </div>
                    </td>
                    <td className="td-action">
                      <button className="profile-btn">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 6C1 6 2.5 2.5 6 2.5C9.5 2.5 11 6 11 6C11 6 9.5 9.5 6 9.5C2.5 9.5 1 6 1 6Z" stroke="#868686" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                          <circle cx="6" cy="6" r="1.5" stroke="#868686" strokeWidth="1"/>
                        </svg>
                        <span>Profile</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="ledger-pagination">
            <button 
              className="pagination-arrow"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 1L2 6L7 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <span className="pagination-text">
              Page {currentPage} of {totalPages}
            </span>
            <button 
              className="pagination-arrow"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L6 6L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrowseJobSection;