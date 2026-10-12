import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '../../components/ui/Logo';
import { Button } from '../../components/ui/Button';
import { 
  Sparkles, ShieldCheck, HeartHandshake, Eye, ArrowRight, 
  BrainCircuit, CheckCircle2
} from 'lucide-react';
import { useApp } from '../../store/appContext';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, signIn } = useApp();

  const handleStartExploring = () => {
    if (isAuthenticated) {
      navigate('/discovery');
    } else {
      navigate('/register');
    }
  };

  const handleQuickDemo = () => {
    signIn();
    navigate('/discovery');
  };

  return (
    <div className="min-h-screen bg-transparent text-white selection:bg-[#C41527] selection:text-white relative overflow-x-hidden">

      {/* A. NAVBAR — glassmorphism */}
      <header className="sticky top-0 z-50 bg-white/[0.04] backdrop-blur-2xl border-b border-white/[0.10] shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Logo size="lg" linkTo="/" />

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-300">
            <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
            <a href="#about-app" className="hover:text-white transition-colors">About the App</a>
            <a href="#research" className="hover:text-white transition-colors">AI Framework</a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={handleQuickDemo}
              className="text-xs sm:text-sm font-medium text-zinc-300 hover:text-white px-3 py-2 rounded-full hover:bg-white/[0.08] backdrop-blur-md transition-all border border-transparent hover:border-white/10"
            >
              Live Demo Mode
            </button>
            <Link to="/register">
              <Button variant="glow" size="md">
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* B. HERO SECTION */}
      <section className="relative pt-8 pb-20 lg:pt-16 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden bg-white/[0.04] backdrop-blur-2xl border border-white/[0.12] p-6 sm:p-10 lg:p-16 shadow-[0_8px_60px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.08)]">
            
            {/* Inner glow overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent pointer-events-none" />
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#8B0000]/20 rounded-full blur-[90px] pointer-events-none" />

            {/* Hero Left Content */}
            <div className="relative z-10 max-w-2xl space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.07] border border-white/[0.12] backdrop-blur-md text-xs font-semibold tracking-widest text-zinc-300 uppercase">
                <Sparkles className="w-3.5 h-3.5 text-[#FF3B5C]" />
                <span>More Than Just Matches</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08]">
                Real<br />
                Connections<br />
                Beyond<br />
                <span className="text-[#FF3B5C] drop-shadow-[0_0_35px_rgba(255,59,92,0.6)]">Screens.</span>
              </h1>

              <p className="text-base sm:text-lg text-zinc-300 font-normal leading-relaxed max-w-lg">
                Discover meaningful connections through intelligent compatibility and a more thoughtful way to meet.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Button
                  variant="glow"
                  size="lg"
                  icon={<ArrowRight className="w-5 h-5" />}
                  iconPosition="right"
                  onClick={handleStartExploring}
                  className="px-8 py-3.5 text-base"
                >
                  Start Exploring
                </Button>

                <a href="#how-it-works">
                  <Button variant="secondary" size="lg" className="px-6 py-3.5 text-base">
                    How It Works
                  </Button>
                </a>
              </div>

              {/* Avatar Cluster */}
              <div className="flex items-center gap-3 pt-6 border-t border-white/10">
                <div className="flex -space-x-2.5 overflow-hidden">
                  <img
                    className="inline-block h-9 w-9 rounded-full ring-2 ring-[#080809] object-cover"
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                    alt="User"
                  />
                  <img
                    className="inline-block h-9 w-9 rounded-full ring-2 ring-[#080809] object-cover"
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                    alt="User"
                  />
                  <img
                    className="inline-block h-9 w-9 rounded-full ring-2 ring-[#080809] object-cover"
                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80"
                    alt="User"
                  />
                </div>
                <div className="text-xs">
                  <span className="font-semibold text-white">Join 250K+</span>{' '}
                  <span className="text-zinc-400">real people seeking long-term synergy</span>
                </div>
              </div>
            </div>

            {/* Floating Glassmorphism Feature Badges — right side */}
            <div className="hidden lg:flex flex-col gap-4 absolute top-12 right-12 z-10 w-72 pointer-events-none">
              
              <div className="bg-white/[0.07] backdrop-blur-xl p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-white/[0.12]">
                <div className="w-10 h-10 rounded-xl bg-[#FF3B5C]/20 border border-[#FF3B5C]/30 flex items-center justify-center text-[#FF3B5C] flex-shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Real Profiles</p>
                  <p className="text-xs text-zinc-400">100% Verified Community</p>
                </div>
              </div>

              <div className="bg-white/[0.07] backdrop-blur-xl p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-white/[0.12]">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 flex-shrink-0">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Meaningful Matches</p>
                  <p className="text-xs text-zinc-400">Not just superficial swipes</p>
                </div>
              </div>

              <div className="bg-white/[0.07] backdrop-blur-xl p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-white/[0.12]">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0">
                  <Eye className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Your Privacy</p>
                  <p className="text-xs text-zinc-400">Always in your control</p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* C. HOW IT WORKS — glassmorphism cards */}
      <section id="how-it-works" className="py-20 border-t border-white/[0.06] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#FF3B5C]">
              The VÉLORA Journey
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              How VÉLORA Works
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Moving beyond traditional distance filters to cultivate relationships anchored in behavioral synergy and shared values.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { n: '01', title: 'Create Your Profile', desc: 'Share authentic photos, your genuine interests, relationship status, and personal aspirations. No superficial questionnaires.' },
              { n: '02', title: 'Discover Compatible People', desc: 'Review candidates ranked by deep behavioral compatibility models. View transparent compatibility factor breakdowns before swiping.' },
              { n: '03', title: 'Connect Through Mutual Interest', desc: 'When two people express mutual interest, a private match is formed. Initiate intentional conversations in a secure, respectful environment.' },
            ].map((step) => (
              <div
                key={step.n}
                className="p-8 rounded-3xl bg-white/[0.04] backdrop-blur-xl border border-white/[0.10] hover:border-[#FF3B5C]/40 hover:bg-white/[0.07] transition-all duration-300 group shadow-[0_4px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_8px_40px_rgba(196,21,39,0.15)]"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#FF3B5C]/15 border border-[#FF3B5C]/30 flex items-center justify-center text-[#FF3B5C] font-mono font-bold text-lg mb-6 group-hover:scale-105 transition-transform">
                  {step.n}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* D. ABOUT VÉLORA & RESEARCH FRAMEWORK */}
      <section id="about-app" className="py-20 border-t border-white/[0.06] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0c0e]/40 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#FF3B5C]">
                Research & Innovation
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
                A Deep Learning Approach to Matrimonial Synergy
              </h2>
              <p className="text-sm text-zinc-300 leading-relaxed">
                Traditional platforms constrain users to rigid filters like geographical radius or chronological age brackets. VÉLORA investigates how multi-dimensional neural embeddings can capture latent behavioral resonance.
              </p>

              <div className="space-y-4 pt-2">
                {[
                  { title: 'Personalized Recommendations', desc: 'Dynamically adapts recommendation sequences to individual value orientations.' },
                  { title: 'Behavioral Compatibility Analysis', desc: 'Examines communication rhythm, lifestyle pacing, and long-term aspirational goals.' },
                  { title: 'Explainable AI Insights', desc: 'Transparent factor breakdowns provide clear rationale behind candidate suitability.' },
                  { title: 'User-Controlled Privacy', desc: 'Complete sovereignty over your data, photo visibility, and conversation boundaries.' },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#FF3B5C]/20 text-[#FF3B5C] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                      <p className="text-xs text-zinc-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Glassmorphism metric card */}
            <div className="p-8 rounded-3xl bg-white/[0.05] backdrop-blur-2xl border border-white/[0.12] relative overflow-hidden shadow-[0_8px_50px_rgba(0,0,0,0.6)]">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF3B5C]/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
                <div className="flex items-center gap-3">
                  <BrainCircuit className="w-6 h-6 text-[#FF3B5C]" />
                  <div>
                    <h3 className="text-base font-semibold text-white">Compatibility Analysis Model</h3>
                    <p className="text-xs text-zinc-400">Deep Learning Latent Representation</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Ready for API Integration
                </span>
              </div>

              <div className="space-y-4">
                {[
                  { label: 'Emotional & Communication Harmony', value: 94 },
                  { label: 'Life Goals & Family Orientation', value: 91 },
                  { label: 'Intellectual & Creative Rhythm', value: 89 },
                ].map((item) => (
                  <div key={item.label} className="p-4 rounded-xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm">
                    <div className="flex justify-between text-xs font-medium mb-1.5">
                      <span className="text-zinc-300">{item.label}</span>
                      <span className="text-[#FF3B5C]">{item.value}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#FF3B5C] to-[#C41527]" style={{ width: `${item.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-[11px] text-zinc-500 mt-6 italic">
                * Note: Model scores reflect simulated prototype data during this frontend evaluation phase.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* E. FOOTER */}
      <footer className="border-t border-white/[0.08] bg-white/[0.02] backdrop-blur-xl py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/[0.08]">
            <Logo size="md" linkTo="/" />
            <div className="flex flex-wrap items-center gap-6 text-xs text-zinc-400">
              <a href="#about-app" className="hover:text-white transition-colors">About</a>
              <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
              <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#terms" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#contact" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
            <p>© 2026 VÉLORA. All rights reserved. A Deep Learning Matrimonial Match Recommendation Project.</p>
            <p className="font-mono text-[11px]">Designed with Cinematic Red Noir Aesthetics</p>
          </div>
        </div>
      </footer>

    </div>
  );
};
