import React from 'react';
import './LandingPage.css';
import LandingHeader from './components/LandingHeader/LandingHeader';
import LandingSidebar from './components/LandingSidebar/LandingSidebar';
import HeroSection from './components/HeroSection/HeroSection';
import ProfileSection from './components/ProfileSection/ProfileSection';
import LedgerSection from './components/LedgerSection/LedgerSection';
import PostJobSection from './components/PostJobSection/PostJobSection';
import DirectContractSection from './components/DirectContractSection/DirectContractSection';
import BrowseJobSection from './components/BrowseJobSection/BrowseJobSection';
import JobProgressSection from './components/JobProgressSection/JobProgressSection';
import DisputeSection from './components/DisputeSection/DisputeSection';
import EarnTokenSection from './components/EarnTokenSection/EarnTokenSection';
import GovernanceSection from './components/GovernanceSection/GovernanceSection';
import MultiChainSection from './components/MultiChainSection/MultiChainSection';
import ArchitectureSection from './components/ArchitectureSection/ArchitectureSection';
import RevolutionSection from './components/RevolutionSection/RevolutionSection';
import ContactSection from './components/ContactSection/ContactSection';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <LandingSidebar />
      <LandingHeader />
      <HeroSection />
      <div id="discoverable">
        <ProfileSection />
      </div>
      <div id="job-contract">
        <LedgerSection />
      </div>
      <div id="direct-contract">
        <PostJobSection />
      </div>
      <div id="job-progress">
        <DirectContractSection />
      </div>
      <div id="browse-job">
        <BrowseJobSection />
      </div>
      <div id="dao">
        <GovernanceSection />
      </div>
      <div id="raise-dispute">
        <JobProgressSection />
      </div>
      <div id="earn-govern">
        <DisputeSection />
      </div>
      <div id="earn-token">
        <EarnTokenSection />
      </div>
      <div id="local-network">
        <MultiChainSection />
      </div>
      <div id="openwork-arch">
        <ArchitectureSection />
      </div>
      <div id="work-revolution">
        <RevolutionSection />
        <ContactSection />
      </div>
    </div>
  );
};

export default LandingPage;
