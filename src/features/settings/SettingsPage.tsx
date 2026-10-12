import React, { useState } from 'react';
import { useApp } from '../../store/appContext';
import { useNavigate } from 'react-router-dom';
import { 
  User, Bell, Shield, Sliders, LogOut, Save, CheckCircle2, Moon, Sparkles 
} from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const SettingsPage: React.FC = () => {
  const { currentUser, updateUserProfile, signOut } = useApp();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState(currentUser.firstName);
  const [lastName, setLastName] = useState(currentUser.lastName);
  const [occupation, setOccupation] = useState(currentUser.occupation || '');
  const [bio, setBio] = useState(currentUser.bio || '');

  // Notifications
  const [notifyNewMatches, setNotifyNewMatches] = useState(true);
  const [notifyMessages, setNotifyMessages] = useState(true);
  const [notifyDailyRecommendations, setNotifyDailyRecommendations] = useState(true);

  // Privacy
  const [profileIncognito, setProfileIncognito] = useState(false);
  const [showCompatibilityDetails, setShowCompatibilityDetails] = useState(true);
  const [readReceipts, setReadReceipts] = useState(true);

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      firstName,
      lastName,
      occupation,
      bio
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto pb-16">
      <div className="pb-4 border-b border-white/[0.08]">
        <h1 className="text-2xl font-bold text-white tracking-wide">Settings & Preferences</h1>
        <p className="text-xs text-zinc-400 mt-1">
          Manage your account profile, deep learning recommendation weights, and privacy controls.
        </p>
      </div>

      {/* 1. Account Information */}
      <section className="p-6 rounded-3xl bg-[#141418] border border-white/10 shadow-xl space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-white/10">
          <User className="w-4 h-4 text-[#FF3B5C]" />
          <h2 className="text-sm font-semibold text-white uppercase tracking-wider">Account Information</h2>
        </div>

        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-white focus:outline-none focus:border-[#FF3B5C]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-white focus:outline-none focus:border-[#FF3B5C]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">Occupation</label>
            <input
              type="text"
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-white focus:outline-none focus:border-[#FF3B5C]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">Bio</label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-white focus:outline-none focus:border-[#FF3B5C] resize-none"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            {savedSuccess ? (
              <span className="text-xs text-emerald-400 flex items-center gap-1 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" /> Changes saved locally
              </span>
            ) : <div />}

            <Button type="submit" variant="primary" size="sm" icon={<Save className="w-3.5 h-3.5" />}>
              Save Profile
            </Button>
          </div>
        </form>
      </section>

      {/* 2. Notification Preferences */}
      <section className="p-6 rounded-3xl bg-[#141418] border border-white/10 shadow-xl space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-white/10">
          <Bell className="w-4 h-4 text-[#FF3B5C]" />
          <h2 className="text-sm font-semibold text-white uppercase tracking-wider">Notifications</h2>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02]">
            <div>
              <p className="text-xs font-medium text-white">New Mutual Matches</p>
              <p className="text-[11px] text-zinc-400">Receive instant alerts when someone likes you back</p>
            </div>
            <input
              type="checkbox"
              checked={notifyNewMatches}
              onChange={(e) => setNotifyNewMatches(e.target.checked)}
              className="accent-[#FF3B5C] w-4 h-4 cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02]">
            <div>
              <p className="text-xs font-medium text-white">Direct Messages</p>
              <p className="text-[11px] text-zinc-400">Notifications when you receive a new chat message</p>
            </div>
            <input
              type="checkbox"
              checked={notifyMessages}
              onChange={(e) => setNotifyMessages(e.target.checked)}
              className="accent-[#FF3B5C] w-4 h-4 cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02]">
            <div>
              <p className="text-xs font-medium text-white">Daily AI Curated Recommendations</p>
              <p className="text-[11px] text-zinc-400">Daily summary of top predicted compatibility candidates</p>
            </div>
            <input
              type="checkbox"
              checked={notifyDailyRecommendations}
              onChange={(e) => setNotifyDailyRecommendations(e.target.checked)}
              className="accent-[#FF3B5C] w-4 h-4 cursor-pointer"
            />
          </div>
        </div>
      </section>

      {/* 3. Privacy & AI Transparency */}
      <section className="p-6 rounded-3xl bg-[#141418] border border-white/10 shadow-xl space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-white/10">
          <Shield className="w-4 h-4 text-[#FF3B5C]" />
          <h2 className="text-sm font-semibold text-white uppercase tracking-wider">Privacy & Model Insights</h2>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02]">
            <div>
              <p className="text-xs font-medium text-white">Incognito Mode</p>
              <p className="text-[11px] text-zinc-400">Only people you have explicitly liked will see your profile</p>
            </div>
            <input
              type="checkbox"
              checked={profileIncognito}
              onChange={(e) => setProfileIncognito(e.target.checked)}
              className="accent-[#FF3B5C] w-4 h-4 cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02]">
            <div>
              <p className="text-xs font-medium text-white">Show Compatibility Score to Matches</p>
              <p className="text-[11px] text-zinc-400">Allow matches to inspect the behavioral factor breakdown</p>
            </div>
            <input
              type="checkbox"
              checked={showCompatibilityDetails}
              onChange={(e) => setShowCompatibilityDetails(e.target.checked)}
              className="accent-[#FF3B5C] w-4 h-4 cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02]">
            <div>
              <p className="text-xs font-medium text-white">Read Receipts</p>
              <p className="text-[11px] text-zinc-400">Share message read status with matches</p>
            </div>
            <input
              type="checkbox"
              checked={readReceipts}
              onChange={(e) => setReadReceipts(e.target.checked)}
              className="accent-[#FF3B5C] w-4 h-4 cursor-pointer"
            />
          </div>
        </div>
      </section>

      {/* 4. Sign Out */}
      <section className="p-6 rounded-3xl bg-[#141418] border border-white/10 shadow-xl flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-white">Sign Out of Prototype Session</h3>
          <p className="text-xs text-zinc-400">Clears current frontend session and returns to landing page.</p>
        </div>

        <Button
          variant="outline"
          size="md"
          icon={<LogOut className="w-4 h-4 text-[#FF3B5C]" />}
          onClick={handleSignOut}
          className="text-[#FF3B5C] border-[#FF3B5C]/40 hover:bg-[#FF3B5C]/10"
        >
          Sign Out
        </Button>
      </section>

    </div>
  );
};

