import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import "./LandingSidebar.css";

const LandingSidebar = () => {
  const [activeSection, setActiveSection] = useState("lp-4-section");
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const pathRef = useRef(null);

  const sidebarItems = [
    { id: 1, icon: "/assets/sidebar-icon-1.svg", label: "Home", section: "lp-2-section" },
    { id: 2, icon: "/assets/sidebar-icon-2.svg", label: "Post Job", section: "lp-4-section" },
    { id: 3, icon: "/assets/sidebar-icon-3.svg", label: "Direct Contract", section: "lp-5-section" },
    { id: 4, icon: "/assets/search-icon.svg", label: "Browse Jobs", section: "lp-6-section" },
    { id: 5, icon: "/assets/sidebar-icon-7.svg", label: "DAO", section: "lp-7-section", isDao: true },
    { id: 6, icon: "/assets/sidebar-icon-4.svg", label: "Job Progress", section: "lp-8-section" },
    { id: 7, icon: "/assets/sidebar-icon-5.svg", label: "Disputes", section: "lp-9-section" },
  ];

  // Get the index of the currently active section
  const activeIndex = sidebarItems.findIndex(item => item.section === activeSection);

  /** ---------------------------------------------------------
   *  GET POINT ON CURVE - Calculate position along the SVG path
   *  percent: 0 to 1, where 0.5 is the center (deepest part of curve)
   * ---------------------------------------------------------*/
  const getPointOnCurve = (percent) => {
    // Clamp percent between 0 and 1
    const clampedPercent = Math.max(0, Math.min(1, percent));
    
    // Always use the path element for accurate positioning
    if (pathRef.current) {
      const path = pathRef.current;
      const totalLength = path.getTotalLength();
      const point = path.getPointAtLength(totalLength * clampedPercent);
      
      // Scale from SVG coordinates (viewBox 0 0 120 800) to actual element size
      const svg = path.ownerSVGElement;
      const svgRect = svg.getBoundingClientRect();
      const scaleX = svgRect.width / 120;
      const scaleY = svgRect.height / 800;
      
      return { 
        x: point.x * scaleX, 
        y: point.y * scaleY 
      };
    }
    
    // Fallback: calculate quadratic bezier curve mathematically
    // Matches: M 95 0 Q 20 400, 95 850
    const startX = 95, startY = 0;
    const controlX = 20, controlY = 400;
    const endX = 95, endY = 850;
    
    const t = clampedPercent;
    const mt = 1 - t;
    
    // Quadratic bezier formula: B(t) = (1-t)²P0 + 2(1-t)tP1 + t²P2
    const x = mt * mt * startX + 2 * mt * t * controlX + t * t * endX;
    const y = mt * mt * startY + 2 * mt * t * controlY + t * t * endY;
    
    return { x, y };
  };

  /** ---------------------------------------------------------
   *  CALCULATE ICON POSITION BASED ON ACTIVE SECTION
   *  Icons cluster around the center, with active at 0.5
   *  Active icon has extra gap from neighbors
   * ---------------------------------------------------------*/
  const getIconPosition = (itemIndex) => {
    const baseSpacing = 0.09; // Normal spacing between icons
    const activeGap = 0.05; // Extra gap around the active icon
    
    // Calculate offset from active icon
    const offsetFromActive = itemIndex - activeIndex;
    
    // Active icon is at center (0.5)
    const centerPercent = 0.5;
    
    let percent = centerPercent;
    
    if (offsetFromActive !== 0) {
      // Add extra gap for icons adjacent to active
      const direction = offsetFromActive > 0 ? 1 : -1;
      const absOffset = Math.abs(offsetFromActive);
      
      // First icon after active gets extra gap, rest have normal spacing
      percent = centerPercent + (direction * activeGap) + (offsetFromActive * baseSpacing);
    }
    
    return getPointOnCurve(percent);
  };

  /** ---------------------------------------------------------
   *  SCROLL SECTION TRACKING
   * ---------------------------------------------------------*/
  useEffect(() => {
    const handleScroll = () => {
      // Don't update active section during click animation
      if (isAnimating) return;
      
      const scrollMid = window.scrollY + window.innerHeight / 2;
      const profile = document.getElementById("lp-2-section");
      const disputeSection = document.getElementById("lp-9-section");

      if (profile && disputeSection) {
        // Show sidebar after profile section, hide after disputes section
        const showStart = profile.offsetTop - 200;
        const hideAfter = disputeSection.offsetTop + disputeSection.offsetHeight;
        setSidebarVisible(window.scrollY >= showStart && scrollMid < hideAfter);
      } else if (profile) {
        setSidebarVisible(window.scrollY >= profile.offsetTop - 200);
      }

      for (let i = sidebarItems.length - 1; i >= 0; i--) {
        const sec = document.getElementById(sidebarItems[i].section);
        if (sec && scrollMid >= sec.offsetTop) {
          setActiveSection(sidebarItems[i].section);
          break;
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sidebarItems, isAnimating]);

  const scrollTo = (id) => {
    if (isAnimating) return; // Prevent multiple clicks during animation
    
    const currentEl = document.getElementById(activeSection);
    const targetEl = document.getElementById(id);
    
    if (!targetEl || id === activeSection) return;
    
    // Determine direction: forward (next) or backward (previous)
    const currentIndex = sidebarItems.findIndex(item => item.section === activeSection);
    const targetIndex = sidebarItems.findIndex(item => item.section === id);
    const isForward = targetIndex > currentIndex;
    
    setIsAnimating(true);
    
    // Set active section IMMEDIATELY on click to prevent icon jumping
    setActiveSection(id);
    
    // Prevent scroll jank during animation
    document.body.style.overflow = 'hidden';
    
    // Find the closest lp-section parent for both elements
    const getSection = (el) => {
      let parent = el;
      while (parent && !parent.classList.contains('lp-section')) {
        parent = parent.parentElement;
      }
      return parent || el;
    };
    
    const currentSection = getSection(currentEl);
    const targetSection = getSection(targetEl);
    
    // Scroll to target section first (instant)
    targetEl.scrollIntoView({ behavior: "instant", block: "start" });
    
    // Apply animations after a tiny delay to let scroll settle
    requestAnimationFrame(() => {
      if (currentSection) {
        currentSection.classList.add(isForward ? 'page-exit' : 'page-exit-reverse');
      }
      
      if (targetSection) {
        targetSection.classList.add(isForward ? 'page-enter' : 'page-enter-reverse');
      }
    });
    
    // Clean up after animation completes
    setTimeout(() => {
      if (currentSection) {
        currentSection.classList.remove('page-exit', 'page-exit-reverse');
      }
      if (targetSection) {
        targetSection.classList.remove('page-enter', 'page-enter-reverse');
      }
      document.body.style.overflow = '';
      setIsAnimating(false);
    }, 600);
  };

  // Force re-render when path is ready
  const [pathReady, setPathReady] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setPathReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <aside className={`landing-sidebar ${sidebarVisible ? "visible" : ""} ${isAnimating ? "animating" : ""}`}>
      
      {/* SVG Curve Line - Smooth arc from top-right to bottom-right */}
      <svg className="sidebar-line" viewBox="0 0 120 800" preserveAspectRatio="none">
        {/* Define radiant glow gradient */}
        <defs>
          <linearGradient id="glowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4D7FFF" stopOpacity="0" />
            <stop offset="40%" stopColor="#4D7FFF" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#1246FF" stopOpacity="1" />
            <stop offset="60%" stopColor="#4D7FFF" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#4D7FFF" stopOpacity="0" />
          </linearGradient>
          <filter id="softGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="6" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Base curve line - invisible but needed for path calculations */}
        <path
          ref={pathRef}
          id="curvePath"
          d="M 95 0 Q 20 400, 95 850"
          stroke="transparent"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="butt"
        />
        
        {/* Radiant glow traveling effect */}
        <path
          d="M 95 0 Q 20 400, 95 850"
          stroke="url(#glowGradient)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="butt"
          className="radiant-glow-line"
          filter="url(#softGlow)"
        />
      </svg>

      {/* Navigation Icons */}
      <nav className="sidebar-nav">
        {sidebarItems.map((item, index) => {
          const position = getIconPosition(index);
          const isActive = activeSection === item.section;
          
          // Calculate visibility - hide icons that are too far from active
          const distanceFromActive = Math.abs(index - activeIndex);
          const isVisible = distanceFromActive <= 4;
          const opacity = isVisible ? Math.max(0.5, 1 - distanceFromActive * 0.12) : 0;

          // Icon size (matches CSS)
          const iconSize = 36;
          // Center all icons on the curve - use half icon size for both x and y
          const xOffset = iconSize / 2;
          const yOffset = iconSize / 2;

          return (
            <motion.button
              key={item.id}
              className={`sidebar-nav-item ${isActive ? "active" : ""}`}
              onClick={() => scrollTo(item.section)}
              style={{
                transformOrigin: `${iconSize / 2}px ${iconSize / 2}px`
              }}
              animate={{
                x: position.x - xOffset,
                y: position.y - yOffset,
                opacity: opacity,
                scale: isActive ? 1 : 1,
              }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 25,
                mass: 0.8,
              }}
            >
              <div className="icon-wrapper">
                <img src={item.icon} alt={item.label} />
              </div>
              <span className="nav-label">{item.label}</span>
            </motion.button>
          );
        })}
      </nav>
    </aside>
  );
};

export default LandingSidebar;
