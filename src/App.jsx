import React, { Suspense, useState, useEffect, useCallback, lazy } from 'react';
import { AnimatePresence } from 'framer-motion';

import { PROJECTS_DATA, SKILL_CATEGORIES_DATA, PREWARM_LIVE_URLS } from './data/portfolioData';
import { useFaviconAnimation } from './hooks/useFaviconAnimation';

import { ErrorBoundary } from './components/common/ErrorBoundary';
import { CanvasFallback } from './components/common/LoadingFallback';

import Navbar from './components/layout/Navbar';
import HeroSection from './components/sections/HeroSection';
import ProjectsSection from './components/sections/ProjectsSection';
import SkillsSection from './components/sections/SkillsSection';
import ResumeSection from './components/sections/ResumeSection';
import ContactSection from './components/sections/ContactSection';

import ProjectModal from './components/projects/ProjectModal';
import LiveConfirmationModal from './components/projects/LiveConfirmationModal';

// Code splitting / Lazy loading heavy 3D canvas background
const InteractiveBackground = lazy(() => import('./components/3d/InteractiveBackground'));

function App() {
  useFaviconAnimation();
  const [selectedProject, setSelectedProject] = useState(null);
  const [pendingLiveProject, setPendingLiveProject] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Pre-warm / ping live project backend links when someone enters the portfolio page
  useEffect(() => {
    PREWARM_LIVE_URLS.forEach((url) => {
      fetch(url, { mode: 'no-cors' }).catch(() => {
        // Silent catch for pre-warming ping
      });
    });
  }, []);

  const handleConfirmLive = useCallback(() => {
    if (pendingLiveProject && pendingLiveProject.liveUrl) {
      window.open(pendingLiveProject.liveUrl, '_blank', 'noopener,noreferrer');
    }
    setPendingLiveProject(null);
  }, [pendingLiveProject]);

  return (
    <div className="root-container">
      <ErrorBoundary fallback={<CanvasFallback />}>
        <Suspense fallback={<CanvasFallback />}>
          <InteractiveBackground />
        </Suspense>
      </ErrorBoundary>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            onRequestLive={(proj) => setPendingLiveProject(proj)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {pendingLiveProject && (
          <LiveConfirmationModal
            project={pendingLiveProject}
            onClose={() => setPendingLiveProject(null)}
            onConfirm={handleConfirmLive}
          />
        )}
      </AnimatePresence>

      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      <main>
        <HeroSection />
        <ProjectsSection
          projects={PROJECTS_DATA}
          onSelectProject={setSelectedProject}
          onRequestLive={setPendingLiveProject}
        />
        <SkillsSection skillCategories={SKILL_CATEGORIES_DATA} />
        <ResumeSection />
        <ContactSection />
      </main>
    </div>
  );
}

export default App;
