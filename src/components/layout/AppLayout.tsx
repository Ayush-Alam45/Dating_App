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
    <div className="min-h-screen bg-transparent text-white flex flex-col md:flex-row relative selection:bg-[#C41527] selection:text-white">
      {/* 1. Left Sidebar (Translucent dark surface over global background) */}
      <Sidebar />

      {/* 2. Central Area (Fits swipe interface on desktop, scrolls when needed for longer pages) */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen pb-16 md:pb-0 z-10">
        <TopBar />
        
        <main className="flex-1 px-3 sm:px-4 lg:px-6 py-2 overflow-y-auto flex flex-col">
          <Outlet />
        </main>
      </div>

      {/* 3. Right Profile & Settings Panel (Translucent surface) */}
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
