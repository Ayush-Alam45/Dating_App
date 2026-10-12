import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Logo } from '../../components/ui/Logo';
import { Button } from '../../components/ui/Button';
import { Mail, Phone, ArrowRight, ShieldCheck } from 'lucide-react';
import { authApi } from '../../services/authApi';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [contactType, setContactType] = useState<'email' | 'phone'>('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (contactType === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.trim() || !emailRegex.test(email)) {
        setError('Please enter a valid email address.');
        return;
      }
    } else {
      const cleanPhone = phone.replace(/[^0-9+]/g, '');
      if (cleanPhone.length < 8) {
        setError('Please enter a valid phone number with country code.');
        return;
      }
    }

    setIsLoading(true);
    try {
      const contactValue = contactType === 'email' ? email : phone;
      await authApi.register(contactType, contactValue);
      // Pass contact info in navigation state for OTP step
      sessionStorage.setItem('velora_pending_contact', JSON.stringify({ type: contactType, value: contactValue }));
      navigate('/verify-otp');
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080809] flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#FF3B5C]/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#8F102B]/20 rounded-full blur-[140px] pointer-events-none" />

      {/* Header Logo */}
      <div className="mb-8">
        <Logo size="lg" linkTo="/" />
      </div>

      {/* Main card */}
      <div className="w-full max-w-md bg-[#141418] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative z-10 backdrop-blur-xl">
        <div className="text-center mb-6">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">
            Begin Your Journey
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400">
            Intelligent matrimonial matching grounded in deep behavioral alignment.
          </p>
        </div>

        {/* Toggle between Email and Phone */}
        <div className="flex p-1 rounded-xl bg-white/[0.04] border border-white/10 mb-6">
          <button
            type="button"
            onClick={() => {
              setContactType('email');
              setError('');
            }}
            className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-medium rounded-lg transition-all ${
              contactType === 'email'
                ? 'bg-[#FF3B5C] text-white shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Email Address</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setContactType('phone');
              setError('');
            }}
            className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-medium rounded-lg transition-all ${
              contactType === 'phone'
                ? 'bg-[#FF3B5C] text-white shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Phone Number</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {contactType === 'email' ? (
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 focus:border-[#FF3B5C] focus:outline-none focus:ring-1 focus:ring-[#FF3B5C] text-sm text-white placeholder-zinc-500"
                  autoFocus
                />
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 focus:border-[#FF3B5C] focus:outline-none focus:ring-1 focus:ring-[#FF3B5C] text-sm text-white placeholder-zinc-500"
                  autoFocus
                />
              </div>
            </div>
          )}

          {error && (
            <p className="text-xs text-[#FF3B5C] font-medium pt-1">
              {error}
            </p>
          )}

          <Button
            type="submit"
            variant="glow"
            size="lg"
            className="w-full mt-2"
            isLoading={isLoading}
            icon={<ArrowRight className="w-4 h-4" />}
            iconPosition="right"
          >
            Continue
          </Button>
        </form>

        {/* Prototype disclosure */}
        <div className="mt-6 pt-4 border-t border-white/10 text-center">
          <p className="text-[11px] text-zinc-400 leading-relaxed flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-zinc-500 flex-shrink-0" />
            <span>Prototype preview: A simulated OTP code will follow.</span>
          </p>
          <div className="mt-3">
            <Link to="/discovery" className="text-xs text-zinc-400 hover:text-white underline">
              Explore Demo App Directly
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

