import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { RightProfilePanel } from './RightProfilePanel';
import { MatchModal } from './MatchModal';
import { CompatibilityAnalysisModal } from './CompatibilityAnalysisModal';
import { useApp } from '../../store/appContext';

export const AppLayout: React.FC = () => {
  const { 
    currentUser, 
    mutualMatchModalCandidate, 
    closeMatchModal, 
    selectedCandidateForAnalysis,
    setSelectedCandidateForAnalysis,
    handleLike
  } = useApp();

  return (
    <div className="min-h-screen bg-[#080809] text-white flex flex-col md:flex-row relative overflow-x-hidden selection:bg-[#C41527] selection:text-white">
      {/* 1. Cinematic Background Image with Dark Blood Vignette (User provided image) */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat pointer-events-none transition-all duration-700"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 25%, rgba(139, 0, 0, 0.35) 0%, rgba(8, 8, 9, 0.82) 70%),
            linear-gradient(180deg, rgba(8, 8, 9, 0.65) 0%, rgba(8, 8, 9, 0.92) 100%),
            url('/bg.jpg')
          `
        }}
      />

      {/* Deep Blood Ambient Lighting */}
      <div className="fixed top-1/4 -left-32 w-[500px] h-[500px] bg-[#8B0000]/25 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="fixed bottom-1/4 -right-32 w-[500px] h-[500px] bg-[#660000]/30 rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#4A0007]/20 rounded-full blur-[160px] pointer-events-none z-0" />

      {/* 2. Left Sidebar (Settings removed, exactly as requested) */}
      <Sidebar />

      {/* 3. Central Area (Dedicated to the Swipe/Swap Interface) */}
      <div className="flex-1 flex flex-col min-w-0 pb-20 md:pb-0 z-10">
        <TopBar />
        
        <main className="flex-1 p-3 sm:p-5 lg:p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* 4. Right Profile & Settings Panel (Where profile setting preset is located) */}
      <RightProfilePanel />

      {/* Global Mutual Match Modal */}
      <MatchModal
        isOpen={!!mutualMatchModalCandidate}
        onClose={closeMatchModal}
        candidate={mutualMatchModalCandidate}
        currentUser={currentUser}
      />

      {/* Global Detailed Compatibility Analysis Modal */}
      <CompatibilityAnalysisModal
        isOpen={!!selectedCandidateForAnalysis}
        onClose={() => setSelectedCandidateForAnalysis(null)}
        candidate={selectedCandidateForAnalysis}
        onLike={() => {
          if (selectedCandidateForAnalysis) {
            handleLike(selectedCandidateForAnalysis.id);
          }
        }}
      />
    </div>
  );
};
