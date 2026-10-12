import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../../components/ui/Logo';
import { Button } from '../../components/ui/Button';
import { 
  User, Image as ImageIcon, Sliders, CheckCircle2, 
  ArrowLeft, ArrowRight, Upload, X, AlertCircle, Heart 
} from 'lucide-react';
import { useApp } from '../../store/appContext';
import { Gender, RelationshipStatus, GenderPreference } from '../../types/user';

export const CompleteProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, completeOnboarding } = useApp();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Step 1: Personal Info
  const [firstName, setFirstName] = useState(currentUser.firstName || '');
  const [lastName, setLastName] = useState(currentUser.lastName || '');
  const [dateOfBirth, setDateOfBirth] = useState(currentUser.dateOfBirth || '1998-05-14');
  const [gender, setGender] = useState<Gender>(currentUser.gender || 'man');
  const [relationshipStatus, setRelationshipStatus] = useState<RelationshipStatus>(
    currentUser.relationshipStatus || 'single'
  );
  const [occupation, setOccupation] = useState(currentUser.occupation || 'Software Engineer');
  const [bio, setBio] = useState(currentUser.bio || '');

  // Step 2: Photos (Required at least 2!)
  // Store either object URLs or predefined editorial sample photos
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>(
    currentUser.photos && currentUser.photos.length >= 2 
      ? currentUser.photos 
      : [
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80'
        ]
  );
  const [photoError, setPhotoError] = useState('');

  // Step 3: Partner Preferences
  const [genderPrefs, setGenderPrefs] = useState<GenderPreference[]>(['women']);
  const [ageRange, setAgeRange] = useState<[number, number]>([21, 32]);
  const [relationshipGoals, setRelationshipGoals] = useState<string[]>([
    'Long-term marriage', 'Deep companionship', 'Shared life vision'
  ]);

  // General error
  const [stepError, setStepError] = useState('');

  // Clean up any generated blob URLs when component unmounts
  useEffect(() => {
    return () => {
      uploadedPhotos.forEach(url => {
        if (url.startsWith('blob:')) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setPhotoError('');
    const newUrls: string[] = [];

    Array.from(files).forEach((file) => {
      // Validate file size (< 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setPhotoError('Image must be under 5MB.');
        return;
      }
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setPhotoError('Only image files (JPG, PNG, WEBP) are supported.');
        return;
      }
      const url = URL.createObjectURL(file);
      newUrls.push(url);
    });

    setUploadedPhotos((prev) => [...prev, ...newUrls]);
  };

  const handleRemovePhoto = (index: number) => {
    const photoToRemove = uploadedPhotos[index];
    if (photoToRemove.startsWith('blob:')) {
      URL.revokeObjectURL(photoToRemove);
    }
    setUploadedPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const validateStep1 = () => {
    if (!firstName.trim()) {
      setStepError('First name is required.');
      return false;
    }
    if (!dateOfBirth) {
      setStepError('Date of birth is required.');
      return false;
    }
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    if (birthDate >= today) {
      setStepError('Date of birth cannot be in the future.');
      return false;
    }
    setStepError('');
    return true;
  };

  const validateStep2 = () => {
    if (uploadedPhotos.length < 2) {
      setPhotoError('At least TWO photos are required to proceed.');
      return false;
    }
    setPhotoError('');
    return true;
  };

  const validateStep3 = () => {
    if (genderPrefs.length === 0) {
      setStepError('Please select at least one partner preference.');
      return false;
    }
    setStepError('');
    return true;
  };

  const handleNext = () => {
    if (step === 1) {
      if (validateStep1()) setStep(2);
    } else if (step === 2) {
      if (validateStep2()) setStep(3);
    } else if (step === 3) {
      if (validateStep3()) setStep(4);
    }
  };

  const handlePrev = () => {
    setStepError('');
    if (step > 1) {
      setStep((step - 1) as 1 | 2 | 3 | 4);
    }
  };

  const handleCompleteProfile = () => {
    completeOnboarding({
      firstName,
      lastName,
      dateOfBirth,
      gender,
      relationshipStatus,
      occupation,
      bio,
      photos: uploadedPhotos,
      partnerPreferences: {
        genderPreferences: genderPrefs,
        ageRange,
        distanceKm: 30,
        relationshipGoals
      }
    });
    navigate('/discovery');
  };

  const toggleGenderPref = (pref: GenderPreference) => {
    if (genderPrefs.includes(pref)) {
      if (genderPrefs.length > 1) {
        setGenderPrefs(genderPrefs.filter(p => p !== pref));
      }
    } else {
      setGenderPrefs([...genderPrefs, pref]);
    }
  };

  const stepsList = [
    { num: 1, label: 'Personal Info', icon: User },
    { num: 2, label: 'Photos (Min 2)', icon: ImageIcon },
    { num: 3, label: 'Preferences', icon: Sliders },
    { num: 4, label: 'Review', icon: CheckCircle2 },
  ];

  return (
    <div className="min-h-screen bg-[#080809] text-white flex flex-col items-center justify-center p-4 py-12 relative overflow-x-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-[#FF3B5C]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-40 w-96 h-96 bg-[#8F102B]/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="mb-8">
        <Logo size="lg" linkTo="/" />
      </div>

      <div className="w-full max-w-2xl bg-[#141418] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl relative z-10 backdrop-blur-xl">
        
        {/* Progress Stepper */}
        <div className="mb-8 pb-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            {stepsList.map((s) => {
              const Icon = s.icon;
              const isCurrent = step === s.num;
              const isCompleted = step > s.num;

              return (
                <div key={s.num} className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      isCurrent
                        ? 'bg-[#FF3B5C] text-white ring-4 ring-[#FF3B5C]/25 shadow-[0_0_15px_rgba(255,59,92,0.5)]'
                        : isCompleted
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        : 'bg-white/5 text-zinc-500 border border-white/10'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span
                    className={`text-[11px] font-medium mt-2 hidden sm:block ${
                      isCurrent ? 'text-white' : isCompleted ? 'text-emerald-400' : 'text-zinc-500'
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* STEP 1: PERSONAL INFORMATION */}
        {step === 1 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div>
              <h3 className="font-serif text-2xl font-bold text-white mb-1">Personal Information</h3>
              <p className="text-xs text-zinc-400">Tell us about yourself to establish your behavioral baseline.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">First Name *</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="e.g. Alex"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 focus:border-[#FF3B5C] focus:outline-none text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="e.g. Morgan"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 focus:border-[#FF3B5C] focus:outline-none text-sm text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">Date of Birth *</label>
                <input
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  max={new Date().toISOString().split('T')[0]}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 focus:border-[#FF3B5C] focus:outline-none text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">Occupation</label>
                <input
                  type="text"
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                  placeholder="e.g. Product Designer"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 focus:border-[#FF3B5C] focus:outline-none text-sm text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-2">Gender Identity</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(['man', 'woman', 'non-binary', 'prefer-not-to-say'] as Gender[]).map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGender(g)}
                    className={`py-2 px-3 rounded-xl text-xs font-medium border capitalize transition-all ${
                      gender === g
                        ? 'bg-[#FF3B5C]/20 border-[#FF3B5C] text-white shadow-sm'
                        : 'bg-white/[0.02] border-white/10 text-zinc-400 hover:text-white'
                    }`}
                  >
                    {g.replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-2">Relationship Status</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(['single', 'married', 'divorced', 'widowed'] as RelationshipStatus[]).map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setRelationshipStatus(status)}
                    className={`py-2 px-3 rounded-xl text-xs font-medium border capitalize transition-all ${
                      relationshipStatus === status
                        ? 'bg-[#FF3B5C]/20 border-[#FF3B5C] text-white shadow-sm'
                        : 'bg-white/[0.02] border-white/10 text-zinc-400 hover:text-white'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">Bio / Personal Intro</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                placeholder="Share your values, passions, and what a meaningful life looks like to you..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 focus:border-[#FF3B5C] focus:outline-none text-sm text-white resize-none"
              />
            </div>
          </div>
        )}

        {/* STEP 2: PHOTOS (Min 2 required!) */}
        {step === 2 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-2xl font-bold text-white mb-1">Upload Photos</h3>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
                  uploadedPhotos.length >= 2
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                    : 'bg-[#FF3B5C]/20 text-[#FF3B5C] border-[#FF3B5C]/40 animate-pulse'
                }`}>
                  {uploadedPhotos.length}/2 Minimum Required
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                Editorial, clear portraits establish high match trust. Please upload at least two authentic photos.
              </p>
            </div>

            {/* Photos Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {uploadedPhotos.map((url, idx) => (
                <div key={idx} className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-black/40 border border-white/15 group">
                  <img src={url} alt={`Upload ${idx + 1}`} className="w-full h-full object-cover" />
                  
                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => handleRemovePhoto(idx)}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 hover:bg-[#FF3B5C] text-white flex items-center justify-center transition-colors shadow-md backdrop-blur-sm"
                    title="Remove photo"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  {idx === 0 && (
                    <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/60 text-[10px] text-white font-medium border border-white/20 backdrop-blur-md">
                      Primary
                    </span>
                  )}
                </div>
              ))}

              {/* Upload Dropzone */}
              <label className="relative aspect-[3/4] rounded-2xl border-2 border-dashed border-white/20 hover:border-[#FF3B5C]/60 bg-white/[0.02] hover:bg-white/[0.05] transition-all flex flex-col items-center justify-center cursor-pointer p-4 text-center group">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 group-hover:text-[#FF3B5C] mb-2 group-hover:scale-110 transition-transform">
                  <Upload className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium text-zinc-300 group-hover:text-white">Add Photo</span>
                <span className="text-[10px] text-zinc-500 mt-1">JPG, PNG up to 5MB</span>
                <input
                  type="file"
                  multiple
                  accept="image/png, image/jpeg, image/webp"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            {photoError && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-400">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{photoError}</span>
              </div>
            )}
          </div>
        )}

        {/* STEP 3: PARTNER PREFERENCES */}
        {step === 3 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div>
              <h3 className="font-serif text-2xl font-bold text-white mb-1">Partner Preferences</h3>
              <p className="text-xs text-zinc-400">Help the behavioral recommendation model align candidates with your intent.</p>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-2">I am interested in discovering:</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'women', label: 'Women' },
                  { id: 'men', label: 'Men' },
                  { id: 'everyone', label: 'Everyone' }
                ].map((item) => {
                  const isSelected = genderPrefs.includes(item.id as GenderPreference);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleGenderPref(item.id as GenderPreference)}
                      className={`p-3.5 rounded-xl border text-center transition-all ${
                        isSelected
                          ? 'bg-[#FF3B5C]/20 border-[#FF3B5C] text-white shadow-sm'
                          : 'bg-white/[0.02] border-white/10 text-zinc-400 hover:text-white'
                      }`}
                    >
                      <span className="text-sm font-semibold">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-medium text-zinc-300">Preferred Age Range</label>
                <span className="text-xs font-semibold text-[#FF3B5C]">{ageRange[0]} - {ageRange[1]} years</span>
              </div>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="18"
                  max="60"
                  value={ageRange[0]}
                  onChange={(e) => setAgeRange([parseInt(e.target.value), Math.max(parseInt(e.target.value) + 2, ageRange[1])])}
                  className="flex-1 accent-[#FF3B5C]"
                />
                <input
                  type="range"
                  min="20"
                  max="70"
                  value={ageRange[1]}
                  onChange={(e) => setAgeRange([ageRange[0], Math.max(parseInt(e.target.value), ageRange[0] + 2)])}
                  className="flex-1 accent-[#FF3B5C]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-2">Relationship Goals</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  'Long-term marriage', 'Deep companionship', 'Shared life vision', 
                  'Mutual personal growth', 'Family orientation'
                ].map((goal) => {
                  const isSelected = relationshipGoals.includes(goal);
                  return (
                    <button
                      key={goal}
                      type="button"
                      onClick={() => {
                        if (isSelected) {
                          setRelationshipGoals(relationshipGoals.filter(g => g !== goal));
                        } else {
                          setRelationshipGoals([...relationshipGoals, goal]);
                        }
                      }}
                      className={`py-2 px-3 rounded-xl text-xs font-medium text-left border transition-all ${
                        isSelected
                          ? 'bg-[#FF3B5C]/20 border-[#FF3B5C] text-white'
                          : 'bg-white/[0.02] border-white/10 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {goal}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: REVIEW & FINISH */}
        {step === 4 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h3 className="font-serif text-2xl font-bold text-white mb-1">Review Your Profile</h3>
              <p className="text-xs text-zinc-400">Confirm your details before entering the VÉLORA intelligent discovery deck.</p>
            </div>

            {/* Profile summary card */}
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
              <div className="flex items-center gap-4">
                <img
                  src={uploadedPhotos[0]}
                  alt="Primary profile"
                  className="w-16 h-16 rounded-2xl object-cover border border-white/20 shadow-md"
                />
                <div>
                  <h4 className="text-lg font-bold text-white">{firstName} {lastName}</h4>
                  <p className="text-xs text-zinc-300">{occupation || 'Not specified'} • {gender} • {relationshipStatus}</p>
                  <p className="text-xs text-zinc-500 mt-0.5">DOB: {dateOfBirth}</p>
                </div>
              </div>

              {bio && (
                <div className="text-xs text-zinc-300 border-t border-white/10 pt-3 italic">
                  "{bio}"
                </div>
              )}

              <div className="border-t border-white/10 pt-3">
                <p className="text-xs font-semibold text-zinc-400 mb-2">Photos Uploaded ({uploadedPhotos.length}):</p>
                <div className="flex gap-2">
                  {uploadedPhotos.map((url, i) => (
                    <img key={i} src={url} alt={`Preview ${i}`} className="w-12 h-14 rounded-lg object-cover border border-white/10" />
                  ))}
                </div>
              </div>

              <div className="border-t border-white/10 pt-3">
                <p className="text-xs font-semibold text-zinc-400 mb-1">Partner Preferences:</p>
                <p className="text-xs text-zinc-300">
                  Seeking <span className="text-[#FF3B5C] capitalize">{genderPrefs.join(', ')}</span> between {ageRange[0]} - {ageRange[1]} years old.
                </p>
              </div>
            </div>
          </div>
        )}

        {stepError && (
          <div className="flex items-center gap-2 p-3 mt-4 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-400">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{stepError}</span>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-6 mt-6 border-t border-white/10">
          {step > 1 ? (
            <Button
              type="button"
              variant="secondary"
              size="md"
              icon={<ArrowLeft className="w-4 h-4" />}
              onClick={handlePrev}
            >
              Previous
            </Button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <Button
              type="button"
              variant="primary"
              size="md"
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
              onClick={handleNext}
            >
              Next Step
            </Button>
          ) : (
            <Button
              type="button"
              variant="glow"
              size="lg"
              icon={<Heart className="w-4 h-4 fill-white" />}
              onClick={handleCompleteProfile}
            >
              Create Account & Enter VÉLORA
            </Button>
          )}
        </div>

      </div>
    </div>
  );
};

