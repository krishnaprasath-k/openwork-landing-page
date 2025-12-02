import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import "./LandingSidebar.css";

const LandingSidebar = () => {
  const [activeSection, setActiveSection] = useState("lp-1-section");
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false); // Circle expanded state (after first click)
  const circleRef = useRef(null);
  const sidebarRef = useRef(null); // Ref for direct DOM manipulation to avoid jiggle

  const sidebarItems = [
    { id: 1, icon: "/assets/sidebar-icon-1.svg", label: "Home", section: "lp-1-section", angle: 270 },           // Top (12 o'clock)
    { id: 2, icon: "/assets/sidebar-icon-2.svg", label: "Post Job", section: "lp-4-section", angle: 219 },       // Anti-clockwise
    { id: 3, icon: "/assets/sidebar-icon-3.svg", label: "Direct Contract", section: "lp-5-section", angle: 168 }, 
    { id: 4, icon: "/assets/search-icon.svg", label: "Browse Jobs", section: "lp-6-section", angle: 117 },    
    { id: 5, icon: "/assets/sidebar-icon-7.svg", label: "DAO", section: "lp-7-section", isDao: true, angle: 66 }, 
    { id: 6, icon: "/assets/sidebar-icon-4.svg", label: "Job Progress", section: "lp-8-section", angle: 15 }, 
    { id: 7, icon: "/assets/sidebar-icon-5.svg", label: "Disputes", section: "lp-9-section", angle: 324 },       // Just before top
  ];

  // Get the index of the currently active section
  const activeIndex = sidebarItems.findIndex(item => item.section === activeSection);

  /** ---------------------------------------------------------
   *  GET POINT ON CIRCLE - For hero section display
   * ---------------------------------------------------------*/
  const getPointOnCircle = (angle, radius = 270) => {
    const radians = (angle * Math.PI) / 180;
    return {
      x: Math.cos(radians) * radius,
      y: Math.sin(radians) * radius
    };
  };

  /** ---------------------------------------------------------
   *  GET ICON POSITION - Always on circle, expand with circle
   * ---------------------------------------------------------*/
  const getIconPosition = (itemIndex) => {
    if (isExpanded) {
      // When expanded, icons cluster around the active section
      // Active icon is at center (180°), others spread around it
      // On left arc of circle: 
      //   - angle 90° = top of left side
      //   - angle 180° = middle left
      //   - angle 270° = bottom of left side
      // So: to go UP, we need SMALLER angles (towards 90°)
      //     to go DOWN, we need LARGER angles (towards 270°)
      // Icons BEFORE active (smaller index like Home) should be UP (smaller angle)
      // Icons AFTER active (larger index like Disputes) should be DOWN (larger angle)
      const centerAngle = 180; // Directly left (center of left arc)
      const spacing = 13; // Degrees between icons
      const activeGap = 5; // Extra gap around active icon
      
      // Calculate offset from active icon
      const offsetFromActive = itemIndex - activeIndex;
      // offsetFromActive < 0 means icon is BEFORE active (Home, etc) → go UP → SUBTRACT angle
      // offsetFromActive > 0 means icon is AFTER active (Disputes, etc) → go DOWN → ADD angle
      
      let angle = centerAngle;
      if (offsetFromActive !== 0) {
        // NEGATE the offset to flip direction:
        // - Before active (negative offset) → positive angle change → goes DOWN? No wait...
        // Actually: angle 90 is TOP, 270 is BOTTOM on left side
        // So smaller angle = UP, larger angle = DOWN
        // offsetFromActive = -1 (Home before Post Job) should make angle SMALLER (go up)
        // offsetFromActive = +1 (Direct Contract after Post Job) should make angle LARGER (go down)
        // Current: angle = 180 + offset*spacing = 180 + (-1)*13 = 167 (smaller = UP) ✓
        // But it's showing reversed, so the circle coordinate system must be flipped
        // Let's NEGATE to flip:
        const flippedOffset = -offsetFromActive;
        const gapDirection = flippedOffset > 0 ? 1 : -1;
        angle = centerAngle + (gapDirection * activeGap) + (flippedOffset * spacing);
      }
      
      // Use same radius - CSS scale handles the size change
      return getPointOnCircle(angle, 270);
    }
    // In normal circle mode, use predefined angles
    return getPointOnCircle(sidebarItems[itemIndex].angle, 270);
  };

  /** ---------------------------------------------------------
   *  SCROLL SECTION TRACKING
   * ---------------------------------------------------------*/
  useEffect(() => {
    let lastScrollY = -1;
    let rafId = null;
    
    const handleScroll = () => {
      // Use requestAnimationFrame for smooth updates
      if (rafId) return;
      
      rafId = requestAnimationFrame(() => {
        rafId = null;
        if (isAnimating) return;
        
        const scrollY = window.scrollY;
        
        // Skip if scroll position hasn't changed enough
        if (Math.abs(scrollY - lastScrollY) < 1) return;
        lastScrollY = scrollY;
        
        const scrollMid = scrollY + window.innerHeight / 2;
        const heroSection = document.getElementById("lp-1-section");
        const disputeSection = document.getElementById("lp-9-section");

        // When at hero - show circle (not expanded)
        // When past hero - show expanded sidebar
        if (heroSection) {
          const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
          const shouldBeExpanded = scrollY >= heroBottom - 200;
          
          // Track scroll offset for circle positioning (scrolls with hero)
          // Use transform for GPU-accelerated smooth scrolling
          if (!shouldBeExpanded && sidebarRef.current) {
            sidebarRef.current.style.transform = `translate(-50%, calc(-50% - ${scrollY}px)) scale(1)`;
          } else if (shouldBeExpanded && sidebarRef.current) {
            sidebarRef.current.style.transform = '';
          }
          
          // Update expanded state - CSS handles the smooth transition
          if (shouldBeExpanded !== isExpanded) {
            setIsExpanded(shouldBeExpanded);
          }
          
          // Update visibility - only when expanded
          if (shouldBeExpanded) {
            // Sidebar mode - hide after disputes
            if (disputeSection) {
              const hideAfter = disputeSection.offsetTop + disputeSection.offsetHeight;
              const newVisible = scrollMid < hideAfter;
              if (newVisible !== sidebarVisible) {
                setSidebarVisible(newVisible);
              }
            }
          }
        }

        // Only update active section when expanded (not on hero)
        if (isExpanded) {
          for (let i = sidebarItems.length - 1; i >= 0; i--) {
            const sec = document.getElementById(sidebarItems[i].section);
            if (sec && scrollMid >= sec.offsetTop) {
              if (activeSection !== sidebarItems[i].section) {
                setActiveSection(sidebarItems[i].section);
              }
              break;
            }
          }
        }
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [sidebarItems, isAnimating, isExpanded, sidebarVisible, activeSection]);

  const scrollTo = (id) => {
    if (isAnimating) return;
    
    const currentEl = document.getElementById(activeSection);
    const targetEl = document.getElementById(id);
    
    if (!targetEl) return;
    if (isExpanded && id === activeSection) return;
    
    const currentIndex = sidebarItems.findIndex(item => item.section === activeSection);
    const targetIndex = sidebarItems.findIndex(item => item.section === id);
    const isForward = targetIndex > currentIndex;
    const isGoingHome = id === "lp-1-section";
    
    setIsAnimating(true);
    setActiveSection(id);
    
    // If not expanded, trigger expansion animation first
    if (!isExpanded) {
      setIsExpanded(true);
      
      // After expansion animation, scroll to target with page transition
      setTimeout(() => {
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'instant', block: 'start' });
        }
        setIsAnimating(false);
      }, 100);
      
      return;
    }
    
    // If going to Home, contract the circle smoothly
    if (isGoingHome) {
      // Hide sidebar first, then scroll
      setSidebarVisible(false);
      
      // Scroll to home instantly
      targetEl.scrollIntoView({ behavior: "instant", block: "start" });
      
      // After scroll, contract the circle and show it
      setTimeout(() => {
        setIsExpanded(false);
        setSidebarVisible(true);
        setIsAnimating(false);
      }, 100);
      
      return;
    }
    
    // Already expanded - apply page transition animations
    document.body.style.overflow = 'hidden';
    
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



  return (
    <aside 
      ref={sidebarRef}
      className={`landing-sidebar ${sidebarVisible ? "visible" : ""} ${isAnimating ? "animating" : ""} ${isExpanded ? "expanded" : ""}`}
    >
      {/* Circle SVG - always visible */}
      <svg 
        ref={circleRef}
        className="sidebar-circle visible" 
        viewBox="0 0 600 600" 
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Base circle gradient - very subtle light gray/blue like in Figma */}
          <linearGradient id="circleBaseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a8c0ff" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#c0d0ff" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#a8c0ff" stopOpacity="0.4" />
          </linearGradient>
          
          {/* Glow gradient for traveling arc - matches sidebar curve */}
          <linearGradient id="circleGlowGradient" gradientUnits="userSpaceOnUse" x1="300" y1="30" x2="300" y2="570">
            <stop offset="0%" stopColor="#4D7FFF" stopOpacity="0" />
            <stop offset="40%" stopColor="#4D7FFF" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#1246FF" stopOpacity="1" />
            <stop offset="60%" stopColor="#4D7FFF" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#4D7FFF" stopOpacity="0" />
          </linearGradient>
          
          {/* Glow filter for the arc */}
          <filter id="glowFilter" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Base circle - subtle static stroke */}
        <circle 
          cx="300" 
          cy="300" 
          r="270" 
          stroke="url(#circleBaseGradient)" 
          strokeWidth="1.5" 
          fill="none"
          className="circle-base"
        />
        
        {/* Traveling glow arc - matches sidebar curve glow style */}
        <circle 
          cx="300" 
          cy="300" 
          r="270" 
          stroke="url(#circleGlowGradient)" 
          strokeWidth="3" 
          fill="none"
          strokeLinecap="round"
          className="circle-glow-arc"
          filter="url(#glowFilter)"
        />
      </svg>



      {/* Navigation Icons */}
      <nav className="sidebar-nav">
        {sidebarItems.map((item, index) => {
          const position = getIconPosition(index);
          const isActive = activeSection === item.section;
          
          const iconSize = 36;
          const xOffset = iconSize / 2;
          const yOffset = iconSize / 2;

          // Circle center is always 300,300 (CSS scale handles size change)
          const circleCenter = { x: 300, y: 300 };
          
          // Counter-scale icons when expanded (container scales 2.5x, so icons need 1/2.5 = 0.4)
          const iconScale = isExpanded ? 0.4 : 1;
          
          // Calculate final position
          const finalX = circleCenter.x + position.x - xOffset;
          const finalY = circleCenter.y + position.y - yOffset;

          return (
            <motion.button
              key={item.id}
              className={`sidebar-nav-item ${isActive ? "active" : ""}`}
              onClick={() => scrollTo(item.section)}
              style={{
                transformOrigin: `${iconSize / 2}px ${iconSize / 2}px`
              }}
              initial={{
                x: finalX,
                y: finalY,
                opacity: 1,
                scale: iconScale,
              }}
              animate={{
                x: finalX,
                y: finalY,
                opacity: 1,
                scale: iconScale,
              }}
              transition={{
                type: "tween",
                duration: 0.005,
                ease: [0.22, 1, 0.36, 1],
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
