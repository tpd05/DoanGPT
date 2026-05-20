'use client';

import HeroSection from './portfolio/HeroSection';
import MarqueeSection from './portfolio/MarqueeSection';
import AboutSection from './portfolio/AboutSection';
import ServicesSection from './portfolio/ServicesSection';
import ProjectsSection from './portfolio/ProjectsSection';
import ChatInterface from './portfolio/ChatInterface';

export default function Portfolio() {
  return (
    <div className="overflow-x-clip" style={{ fontFamily: "'Kanit', sans-serif" }}>
      <HeroSection />
      <AboutSection />
      <MarqueeSection />
      <ServicesSection />
      <ProjectsSection />
      <ChatInterface />
    </div>
  );
}
