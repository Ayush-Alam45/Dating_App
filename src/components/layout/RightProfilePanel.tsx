import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../store/appContext';
import { InterestTag } from '../ui/InterestTag';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { 
  CheckCircle2, Settings as SettingsIcon, MessageSquare, Edit3, 
  Save, LogOut, Shield, Heart, ArrowRight, User
} from 'lucide-react';
import { GenderPreference } from '../../types/user';

const allAvailableInterests = [
  'Music', 'Travel', 'Tech', 'Photography', 'Gaming', 'Movies', 
  'Books', 'Food', 'Art', 'Nature', 'Fitness', 'Coffee', 
  'Design', 'Yoga', 'Cooking', 'Astronomy', 'Psychology', 'Writing'
];

export const RightProfilePanel: React.FC = () => {
  const { 
    currentUser, 
    updateUserProfile, 
    updateUserInterests,
    conversations,
    setActiveConversationId,
    signOut
  } = useApp();

  const navigate = useNavigate();

  // Active tab in right panel: 'settings' or 'messages'
  const [activeTab, setActiveTab] = useState<'settings' | 'messages'>('settings');

  // Form states for Profile Settings Preset
  const [firstName, setFirstName] = useState(currentUser.firstName);
  const [lastName, setLastName] = useState(currentUser.lastName);
  const [occupation, setOccupation] = useState(currentUser.occupation || '');
  const [bio, setBio] = useState(currentUser.bio || '');
  const [genderPrefs, setGenderPrefs] = useState<GenderPreference[]>(
    currentUser.partnerPreferences?.genderPreferences || ['women']
  );
  const [ageRange, setAgeRange] = useState<[number, number]>(
    currentUser.partnerPreferences?.ageRange || [21, 32]
  );
  const [isIncognito, setIsIncognito] = useState(false);
  const [showCompatibilityScore, setShowCompatibilityScore] = useState(true);

  const [savedMessage, setSavedMessage] = useState(false);
  const [isEditInterestsOpen, setIsEditInterestsOpen] = useState(false);
  const [tempInterests, setTempInterests] = useState<string[]>(currentUser.interests);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      firstName,
      lastName,
      occupation,
      bio,
      partnerPreferences: {
        ...currentUser.partnerPreferences,
        genderPreferences: genderPrefs,
        ageRange
      }
    });
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 2500);
  };

  const handleToggleGenderPref = (pref: GenderPreference) => {
    if (genderPrefs.includes(pref)) {
      if (genderPrefs.length > 1) {
        setGenderPrefs(genderPrefs.filter(p => p !== pref));
      }
    } else {
      setGenderPrefs([...genderPrefs, pref]);
    }
  };

  const handleSaveInterests = () => {
    updateUserInterests(tempInterests);
    setIsEditInterestsOpen(false);
  };

  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

  return (
    <aside className="w-80 lg:w-[360px] h-screen sticky top-0 overflow-y-auto bg-[#0a080c]/85 backdrop-blur-2xl border-l border-white/[0.08] p-4 lg:p-5 space-y-5 select-none z-20 hidden xl:block">
      
      {/* Tab Switcher: Profile Settings Preset vs Messages */}
      <div className="flex p-1 rounded-2xl bg-white/[0.04] border border-white/10">
        <button
          type="button"
          onClick={() => setActiveTab('settings')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-xl transition-all ${
            activeTab === 'settings'
              ? 'bg-[#8B0000] text-white shadow-[0_0_15px_rgba(139,0,0,0.6)]'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <SettingsIcon className="w-3.5 h-3.5" />
          <span>Profile Settings</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('messages')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-xl transition-all ${
            activeTab === 'messages'
              ? 'bg-[#8B0000] text-white shadow-[0_0_15px_rgba(139,0,0,0.6)]'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Messages ({conversations.length})</span>
        </button>
      </div>

      {/* TAB 1: PROFILE SETTINGS PRESET */}
      {activeTab === 'settings' && (
        <div className="space-y-5 animate-in fade-in duration-200">
          
          {/* User Profile Header Card */}
          <div className="p-4 rounded-2xl bg-[#141216]/90 border border-white/10 shadow-xl space-y-3 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#8B0000]/25 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex items-center gap-3.5">
              <div className="relative">
                <img
                  src={currentUser.photos[0] || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'}
                  alt={currentUser.firstName}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-[#8B0000] shadow-[0_0_15px_rgba(139,0,0,0.5)]"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#141216]" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-base font-bold text-white truncate">
                    {currentUser.firstName} {currentUser.lastName}
                  </h3>
                  <CheckCircle2 className="w-4 h-4 text-[#C41527] fill-[#C41527]/20 flex-shrink-0" />
                </div>
                <p className="text-xs text-zinc-300 truncate">
                  {currentUser.occupation || 'Creative Technologist'}
                </p>
                <p className="text-[11px] text-zinc-400 capitalize">
                  {currentUser.gender} • {currentUser.relationshipStatus}
                </p>
              </div>
            </div>
          </div>

          {/* Profile Settings Form */}
          <form onSubmit={handleSaveProfile} className="p-4 rounded-2xl bg-[#141216]/90 border border-white/10 shadow-xl space-y-3.5">
            <div className="flex items-center justify-between pb-1 border-b border-white/[0.08]">
              <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-300">
                <User className="w-3.5 h-3.5 text-[#C41527]" />
                <span>Account Preset</span>
              </div>
              {savedMessage && (
                <span className="text-[11px] text-emerald-400 font-semibold animate-pulse">
                  ✓ Saved
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-medium text-zinc-400 mb-1">First Name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-xs text-white focus:outline-none focus:border-[#C41527]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-zinc-400 mb-1">Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-xs text-white focus:outline-none focus:border-[#C41527]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-zinc-400 mb-1">Occupation</label>
              <input
                type="text"
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-xs text-white focus:outline-none focus:border-[#C41527]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-zinc-400 mb-1">Bio</label>
              <textarea
                rows={2}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-xs text-white focus:outline-none focus:border-[#C41527] resize-none"
              />
            </div>

            {/* Partner Preferences Section */}
            <div className="pt-2 border-t border-white/[0.08] space-y-2">
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-300">
                Seeking (Match Preset)
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {(['women', 'men', 'everyone'] as GenderPreference[]).map((pref) => {
                  const isSelected = genderPrefs.includes(pref);
                  return (
                    <button
                      key={pref}
                      type="button"
                      onClick={() => handleToggleGenderPref(pref)}
                      className={`py-1.5 px-2 rounded-lg text-[11px] font-semibold capitalize border transition-all ${
                        isSelected
                          ? 'bg-[#8B0000] border-[#C41527] text-white shadow-sm'
                          : 'bg-white/[0.03] border-white/10 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {pref}
                    </button>
                  );
                })}
              </div>

              <div className="pt-1 flex items-center justify-between text-[11px]">
                <span className="text-zinc-400">Age Bracket:</span>
                <span className="font-semibold text-[#C41527]">{ageRange[0]} - {ageRange[1]} yrs</span>
              </div>
            </div>

            <Button
              type="submit"
              variant="glow"
              size="sm"
              className="w-full text-xs font-semibold py-2 bg-gradient-to-r from-[#B3001B] to-[#660000] shadow-[0_0_15px_rgba(179,0,27,0.5)]"
              icon={<Save className="w-3.5 h-3.5" />}
            >
              Save Profile Preset
            </Button>
          </form>

          {/* Interests Preset Widget */}
          <div className="p-4 rounded-2xl bg-[#141216]/90 border border-white/10 shadow-xl space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                Your Interests
              </span>
              <button
                type="button"
                onClick={() => {
                  setTempInterests([...currentUser.interests]);
                  setIsEditInterestsOpen(true);
                }}
                className="text-[11px] text-[#C41527] hover:underline flex items-center gap-1 font-semibold"
              >
                <Edit3 className="w-3 h-3" />
                <span>Edit</span>
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {currentUser.interests.map((tag) => (
                <InterestTag key={tag} label={tag} size="sm" />
              ))}
            </div>
          </div>

          {/* Privacy Preset Controls */}
          <div className="p-4 rounded-2xl bg-[#141216]/90 border border-white/10 shadow-xl space-y-2.5">
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-300">
              <Shield className="w-3.5 h-3.5 text-[#C41527]" />
              <span>Privacy Controls</span>
            </div>

            <div className="flex items-center justify-between text-xs py-1">
              <span className="text-zinc-300">Incognito Mode</span>
              <input
                type="checkbox"
                checked={isIncognito}
                onChange={(e) => setIsIncognito(e.target.checked)}
                className="accent-[#8B0000] w-4 h-4 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between text-xs py-1 border-t border-white/[0.06]">
              <span className="text-zinc-300">Show Compatibility Score</span>
              <input
                type="checkbox"
                checked={showCompatibilityScore}
                onChange={(e) => setShowCompatibilityScore(e.target.checked)}
                className="accent-[#8B0000] w-4 h-4 cursor-pointer"
              />
            </div>
          </div>

          {/* Sign Out Button */}
          <div className="pt-1">
            <button
              type="button"
              onClick={handleSignOut}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-[#8B0000]/40 text-xs font-semibold text-[#C41527] hover:bg-[#8B0000]/20 transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out of Session</span>
            </button>
          </div>

        </div>
      )}

      {/* TAB 2: LIVE MESSAGES PREVIEW */}
      {activeTab === 'messages' && (
        <div className="p-4 rounded-2xl bg-[#141216]/90 border border-white/10 shadow-xl space-y-3 animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-1 border-b border-white/[0.08]">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-300">Recent Chats</h4>
            <span className="text-[11px] font-mono text-zinc-500">{conversations.length} active</span>
          </div>

          <div className="space-y-1.5 max-h-96 overflow-y-auto pr-0.5">
            {conversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => {
                  setActiveConversationId(conv.id);
                  navigate('/messages');
                }}
                className="flex items-center justify-between p-2 rounded-xl hover:bg-white/[0.05] cursor-pointer transition-all group"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="relative flex-shrink-0">
                    <img
                      src={conv.participantAvatar}
                      alt={conv.participantName}
                      className="w-8 h-8 rounded-full object-cover border border-white/10"
                    />
                    {conv.online && (
                      <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 border border-[#141216]" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-zinc-200 group-hover:text-white truncate">
                      {conv.participantName}
                    </p>
                    <p className="text-[11px] text-zinc-400 truncate">
                      {conv.lastMessage}
                    </p>
                  </div>
                </div>
                <span className="text-[10px] text-zinc-500 flex-shrink-0 ml-2">
                  {conv.lastMessageTime}
                </span>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => navigate('/messages')}
            className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-xs font-semibold text-zinc-300 hover:text-white transition-colors"
          >
            <span>Open Messaging App</span>
            <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />
          </button>
        </div>
      )}

      {/* Edit Interests Modal */}
      <Modal
        isOpen={isEditInterestsOpen}
        onClose={() => setIsEditInterestsOpen(false)}
        title="Customize Your Interests"
        maxWidth="md"
      >
        <div className="space-y-4">
          <p className="text-xs text-zinc-400">
            Select interests that reflect your lifestyle. Our behavioral recommendation engine uses these to calculate semantic resonance.
          </p>

          <div className="flex flex-wrap gap-2 max-h-60 overflow-y-auto p-1">
            {allAvailableInterests.map((interest) => {
              const isSelected = tempInterests.includes(interest);
              return (
                <InterestTag
                  key={interest}
                  label={interest}
                  selected={isSelected}
                  onToggle={() => {
                    if (tempInterests.includes(interest)) {
                      setTempInterests(tempInterests.filter(i => i !== interest));
                    } else {
                      setTempInterests([...tempInterests, interest]);
                    }
                  }}
                />
              );
            })}
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
            <Button variant="secondary" size="sm" onClick={() => setIsEditInterestsOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleSaveInterests}>
              Save Changes
            </Button>
          </div>
        </div>
      </Modal>

    </aside>
  );
};
