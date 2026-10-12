import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '../../components/ui/Logo';
import { Button } from '../../components/ui/Button';
import { 
  Sparkles, ShieldCheck, HeartHandshake, Eye, ArrowRight, 
  BrainCircuit, Sliders, Users, CheckCircle2, ChevronDown 
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
    <div className="min-h-screen bg-[#080809] text-white selection:bg-[#FF3B5C] selection:text-white relative overflow-x-hidden">
      
      {/* Background Ambient Glowing Orbs */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#FF3B5C]/12 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#8F102B]/15 rounded-full blur-[150px] pointer-events-none -z-10" />

      {/* A. NAVBAR */}
      <header className="sticky top-0 z-50 bg-[#080809]/80 backdrop-blur-xl border-b border-white/[0.08]">
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
              className="text-xs sm:text-sm font-medium text-zinc-300 hover:text-white px-3 py-2 rounded-full hover:bg-white/5 transition-all"
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

      {/* B. HERO SECTION (Inspiring the reference design) */}
      <section className="relative pt-8 pb-20 lg:pt-16 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#121015] via-[#0b0b0e] to-[#080809] border border-white/10 p-6 sm:p-10 lg:p-16 shadow-[0_0_80px_rgba(0,0,0,0.8)]">
            
            {/* Cinematic Background Image with Red Lighting Vortex */}
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=1920&q=80"
                alt="Cinematic couple silhouette with dramatic lighting"
                className="w-full h-full object-cover object-right md:object-center opacity-30 mix-blend-luminosity scale-105"
              />
              {/* Radial red energy wash */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#080809] via-[#080809]/85 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080809] via-transparent to-transparent" />
              <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#FF3B5C]/25 rounded-full blur-[90px] pointer-events-none" />
            </div>

            {/* Hero Left Content */}
            <div className="relative z-10 max-w-2xl space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold tracking-widest text-zinc-300 uppercase">
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

              {/* Avatar Cluster from reference */}
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

            {/* Floating Glassmorphism Feature Badges (Matching reference right side) */}
            <div className="hidden lg:flex flex-col gap-4 absolute top-12 right-12 z-10 w-72 pointer-events-none">
              
              <div className="glass-card p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-white/10 animate-pulse-subtle">
                <div className="w-10 h-10 rounded-xl bg-[#FF3B5C]/20 border border-[#FF3B5C]/30 flex items-center justify-center text-[#FF3B5C] flex-shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Real Profiles</p>
                  <p className="text-xs text-zinc-400">100% Verified Community</p>
                </div>
              </div>

              <div className="glass-card p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-white/10">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 flex-shrink-0">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Meaningful Matches</p>
                  <p className="text-xs text-zinc-400">Not just superficial swipes</p>
                </div>
              </div>

              <div className="glass-card p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-white/10">
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

      {/* C. HOW IT WORKS */}
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
            {/* Step 1 */}
            <div className="p-8 rounded-3xl bg-[#141418] border border-white/10 hover:border-[#FF3B5C]/30 transition-all duration-300 relative group">
              <div className="w-12 h-12 rounded-2xl bg-[#FF3B5C]/15 border border-[#FF3B5C]/30 flex items-center justify-center text-[#FF3B5C] font-mono font-bold text-lg mb-6 group-hover:scale-105 transition-transform">
                01
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Create Your Profile</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Share authentic photos, your genuine interests, relationship status, and personal aspirations. No superficial questionnaires.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-8 rounded-3xl bg-[#141418] border border-white/10 hover:border-[#FF3B5C]/30 transition-all duration-300 relative group">
              <div className="w-12 h-12 rounded-2xl bg-[#FF3B5C]/15 border border-[#FF3B5C]/30 flex items-center justify-center text-[#FF3B5C] font-mono font-bold text-lg mb-6 group-hover:scale-105 transition-transform">
                02
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Discover Compatible People</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Review candidates ranked by deep behavioral compatibility models. View transparent compatibility factor breakdowns before swiping.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-8 rounded-3xl bg-[#141418] border border-white/10 hover:border-[#FF3B5C]/30 transition-all duration-300 relative group">
              <div className="w-12 h-12 rounded-2xl bg-[#FF3B5C]/15 border border-[#FF3B5C]/30 flex items-center justify-center text-[#FF3B5C] font-mono font-bold text-lg mb-6 group-hover:scale-105 transition-transform">
                03
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Connect Through Mutual Interest</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                When two people express mutual interest, a private match is formed. Initiate intentional conversations in a secure, respectful environment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* D. ABOUT VÉLORA & RESEARCH FRAMEWORK */}
      <section id="about-app" className="py-20 border-t border-white/[0.06] bg-[#0c0c0e]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#FF3B5C]/20 text-[#FF3B5C] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Personalized Recommendations</h4>
                    <p className="text-xs text-zinc-400">Dynamically adapts recommendation sequences to individual value orientations.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#FF3B5C]/20 text-[#FF3B5C] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Behavioral Compatibility Analysis</h4>
                    <p className="text-xs text-zinc-400">Examines communication rhythm, lifestyle pacing, and long-term aspirational goals.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#FF3B5C]/20 text-[#FF3B5C] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Explainable AI Insights</h4>
                    <p className="text-xs text-zinc-400">Transparent factor breakdowns provide clear rationale behind candidate suitability.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#FF3B5C]/20 text-[#FF3B5C] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">User-Controlled Privacy</h4>
                    <p className="text-xs text-zinc-400">Complete sovereignty over your data, photo visibility, and conversation boundaries.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Graphic card */}
            <div className="p-8 rounded-3xl bg-[#141418] border border-white/10 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF3B5C]/15 rounded-full blur-3xl pointer-events-none" />
              
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
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="flex justify-between text-xs font-medium mb-1.5">
                    <span className="text-zinc-300">Emotional & Communication Harmony</span>
                    <span className="text-[#FF3B5C]">94%</span>
                  </div>
                  <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-[#FF3B5C] w-[94%]" />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="flex justify-between text-xs font-medium mb-1.5">
                    <span className="text-zinc-300">Life Goals & Family Orientation</span>
                    <span className="text-[#FF3B5C]">91%</span>
                  </div>
                  <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-[#FF3B5C] w-[91%]" />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="flex justify-between text-xs font-medium mb-1.5">
                    <span className="text-zinc-300">Intellectual & Creative Rhythm</span>
                    <span className="text-[#FF3B5C]">89%</span>
                  </div>
                  <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-[#FF3B5C] w-[89%]" />
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-zinc-500 mt-6 italic">
                * Note: Model scores reflect simulated prototype data during this frontend evaluation phase.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* E. FOOTER */}
      <footer className="border-t border-white/[0.08] bg-[#060607] py-12">
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

