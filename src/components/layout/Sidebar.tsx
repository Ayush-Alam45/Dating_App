import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Logo } from '../ui/Logo';
import { 
  Home, Compass, MessageSquare, Heart, Sparkles, ArrowRight
} from 'lucide-react';
import { useApp } from '../../store/appContext';

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const { matches, conversations } = useApp();

  const unreadMessagesCount = conversations.reduce((acc, c) => acc + (c.unreadCount || 0), 0) || 3;

  // Settings removed from left side as requested by user
  const navItems = [
    { label: 'Home', path: '/discovery', icon: Home },
    { label: 'Discover', path: '/discovery', icon: Compass, exact: true },
    { label: 'Messages', path: '/messages', icon: MessageSquare, badge: unreadMessagesCount },
    { label: 'Matches', path: '/matches', icon: Heart, badge: matches.length > 0 ? matches.length : undefined },
    { label: 'Explore', path: '/explore', icon: Sparkles },
  ];

  return (
    <>
      {/* Desktop Sidebar (Persistent left panel 220-250px) */}
      <aside className="hidden md:flex flex-col w-56 lg:w-64 h-screen sticky top-0 bg-[#080809]/80 backdrop-blur-xl border-r border-white/[0.08] p-5 justify-between select-none z-30">
        <div className="space-y-8">
          {/* Logo */}
          <div className="pt-2 pl-2">
            <Logo size="md" linkTo="/discovery" />
          </div>

          {/* Navigation Items (Settings removed from left side) */}
          <nav className="space-y-1.5" aria-label="Main Navigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.exact 
                ? location.pathname === item.path
                : location.pathname.startsWith(item.path);

              return (
                <NavLink
                  key={item.label}
                  to={item.path}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                    isActive
                      ? 'bg-gradient-to-r from-[#660000]/60 to-[#141418] text-white border-l-2 border-[#C41527] shadow-[0_0_15px_rgba(196,21,39,0.3)]'
                      : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-[#C41527]' : 'text-zinc-400 group-hover:text-zinc-200'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="w-5 h-5 rounded-full bg-[#C41527] text-white text-[11px] font-bold flex items-center justify-center shadow-[0_0_8px_rgba(196,21,39,0.8)]">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="space-y-4">
          {/* "Better Together" Card from reference */}
          <div className="relative overflow-hidden rounded-2xl p-3.5 bg-gradient-to-br from-[#1c1214] to-[#101014] border border-white/10 group cursor-pointer hover:border-[#C41527]/50 transition-all shadow-lg">
            <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-[#8B0000]/30 rounded-full blur-xl pointer-events-none" />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-white">Better Together</p>
                <p className="text-[11px] text-zinc-400">Real people. Real stories.</p>
              </div>
              <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 group-hover:text-white group-hover:bg-[#C41527] transition-all">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Version footer */}
          <div className="px-2 pt-1">
            <p className="text-[11px] text-zinc-600 uppercase tracking-widest font-mono">
              VÉLORA <span className="text-zinc-500">v1.0.0</span>
            </p>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 h-16 bg-[#080809]/95 backdrop-blur-xl border-t border-white/10 px-4 flex items-center justify-around z-40">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname.startsWith(item.path);

          return (
            <NavLink
              key={item.label}
              to={item.path}
              className={`flex flex-col items-center justify-center py-1 px-3 text-[11px] transition-colors relative ${
                isActive ? 'text-[#C41527]' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span>{item.label}</span>
              {item.badge !== undefined && item.badge > 0 && (
                <span className="absolute top-1 right-2 w-4 h-4 rounded-full bg-[#C41527] text-white text-[9px] font-bold flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>
    </>
  );
};
