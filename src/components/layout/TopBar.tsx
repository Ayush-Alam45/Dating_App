import React, { useState } from 'react';
import { Search, Bell, SlidersHorizontal, LogOut, Settings as SettingsIcon, Heart } from 'lucide-react';
import { useApp } from '../../store/appContext';
import { Link, useNavigate } from 'react-router-dom';

interface TopBarProps {
  onSearch?: (query: string) => void;
  onFilterClick?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onSearch, onFilterClick }) => {
  const { currentUser, signOut } = useApp();
  const [query, setQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const navigate = useNavigate();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between gap-4 py-3 px-4 lg:px-6 bg-[#080809]/75 backdrop-blur-xl border-b border-white/[0.08]">
      {/* Search Bar */}
      <div className="relative flex-1 max-w-xl">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
        <input
          type="text"
          value={query}
          onChange={handleSearchChange}
          placeholder="Search people, interests, or places..."
          className="w-full pl-10 pr-10 py-2 rounded-full bg-[#141216]/90 border border-white/10 focus:border-[#C41527] focus:outline-none focus:ring-1 focus:ring-[#C41527]/50 text-xs sm:text-sm text-white placeholder-zinc-500 transition-all shadow-inner"
        />
        {onFilterClick && (
          <button
            type="button"
            onClick={onFilterClick}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors"
            title="Eligibility & Compatibility Filters"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Right Action Icons: Notification Bell & User Avatar */}
      <div className="flex items-center gap-3">
        {/* Notification Bell */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 hover:text-white border border-white/10 transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#C41527] animate-pulse" />
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-72 p-3 rounded-2xl bg-[#141216] border border-white/15 shadow-2xl z-50 text-xs animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-2">
                <span className="font-semibold text-white">Notifications</span>
                <span className="text-[10px] text-[#C41527] font-medium">Mark all read</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-start gap-2.5 p-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] transition-colors cursor-pointer">
                  <div className="w-7 h-7 rounded-full bg-[#8B0000]/30 text-[#C41527] flex items-center justify-center flex-shrink-0">
                    <Heart className="w-3.5 h-3.5 fill-current" />
                  </div>
                  <div>
                    <p className="text-zinc-200 font-medium">Aanya liked your profile!</p>
                    <p className="text-[10px] text-zinc-400">Predicted compatibility: 94%</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 p-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] transition-colors cursor-pointer">
                  <div className="w-7 h-7 rounded-full bg-[#8B0000]/30 text-[#C41527] flex items-center justify-center flex-shrink-0">
                    <Bell className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="text-zinc-200 font-medium">3 candidates ranked by behavioral AI</p>
                    <p className="text-[10px] text-zinc-400">Fresh predictions available</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Avatar with dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowUserDropdown(!showUserDropdown)}
            className="flex items-center gap-2 p-0.5 rounded-full ring-2 ring-white/10 hover:ring-[#C41527] transition-all"
            aria-label="User Menu"
          >
            <img
              src={currentUser.photos[0] || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'}
              alt={currentUser.firstName}
              className="w-8 h-8 rounded-full object-cover"
            />
          </button>

          {/* User Menu Dropdown */}
          {showUserDropdown && (
            <div className="absolute right-0 mt-2 w-52 p-2 rounded-2xl bg-[#141216] border border-white/15 shadow-2xl z-50 text-xs animate-in fade-in duration-200">
              <div className="p-2 border-b border-white/10 mb-1">
                <p className="font-semibold text-white">{currentUser.firstName} {currentUser.lastName}</p>
                <p className="text-[11px] text-zinc-400 truncate">{currentUser.email || currentUser.phone}</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowUserDropdown(false);
                  signOut();
                  navigate('/');
                }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-[#C41527] hover:bg-[#8B0000]/20 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
