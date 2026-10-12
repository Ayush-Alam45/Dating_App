import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../../components/ui/Logo';
import { Button } from '../../components/ui/Button';
import { ShieldCheck, ArrowLeft, RefreshCw, KeyRound, AlertCircle } from 'lucide-react';
import { authApi } from '../../services/authApi';

export const OtpVerificationPage: React.FC = () => {
  const navigate = useNavigate();
  const [digits, setDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [contact, setContact] = useState<{ type: string; value: string }>({
    type: 'email',
    value: 'alex.morgan@velora.ai'
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const saved = sessionStorage.getItem('velora_pending_contact');
    if (saved) {
      try {
        setContact(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  useEffect(() => {
    let interval: any = null;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer(prev => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleDigitChange = (index: number, val: string) => {
    if (val.length > 1) {
      // Handle paste
      const pastedDigits = val.slice(0, 6).split('');
      const newDigits = [...digits];
      pastedDigits.forEach((d, i) => {
        if (i < 6) newDigits[i] = d;
      });
      setDigits(newDigits);
      const nextIdx = Math.min(pastedDigits.length, 5);
      inputRefs.current[nextIdx]?.focus();
      return;
    }

    const newDigits = [...digits];
    newDigits[index] = val;
    setDigits(newDigits);

    if (val && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const otpCode = digits.join('');
    if (otpCode.length < 6) {
      setError('Please enter all 6 digits of the verification code.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await authApi.verifyOtp(otpCode);
      navigate('/complete-profile');
    } catch (err: any) {
      setError(err.message || 'Verification failed. Try code 123456.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFillDemoCode = () => {
    setDigits(['1', '2', '3', '4', '5', '6']);
    setError('');
  };

  const handleResend = () => {
    if (!canResend) return;
    setResendTimer(30);
    setCanResend(false);
    setError('');
    // Clear inputs
    setDigits(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();
  };

  return (
    <div className="min-h-screen bg-[#080809] flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 -right-32 w-96 h-96 bg-[#FF3B5C]/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-[#8F102B]/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="mb-8">
        <Logo size="lg" linkTo="/" />
      </div>

      <div className="w-full max-w-md bg-[#141418] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative z-10 backdrop-blur-xl">
        
        {/* Back Link */}
        <button
          type="button"
          onClick={() => navigate('/register')}
          className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Change {contact.type}</span>
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#FF3B5C]/15 border border-[#FF3B5C]/30 flex items-center justify-center text-[#FF3B5C] mx-auto mb-3 shadow-[0_0_20px_rgba(255,59,92,0.3)]">
            <KeyRound className="w-6 h-6" />
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">
            Verify Your Account
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400">
            Enter the 6-digit verification code sent to
          </p>
          <p className="text-xs sm:text-sm font-semibold text-white mt-0.5">
            {contact.value}
          </p>
        </div>

        {/* 6-Digit OTP Inputs */}
        <form onSubmit={handleVerify} className="space-y-6">
          <div className="flex justify-between gap-2">
            {digits.map((digit, idx) => (
              <input
                key={idx}
                ref={(el) => {
                  inputRefs.current[idx] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={digit}
                onChange={(e) => handleDigitChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                autoFocus={idx === 0}
                className="w-11 h-14 sm:w-12 sm:h-14 text-center text-xl font-bold rounded-xl bg-white/[0.04] border border-white/15 focus:border-[#FF3B5C] focus:bg-white/[0.08] focus:outline-none focus:ring-1 focus:ring-[#FF3B5C] text-white transition-all shadow-inner"
              />
            ))}
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-400">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Prototype Guidance helper pill */}
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between text-xs">
            <span className="text-zinc-400 font-mono">Prototype Code: 123456</span>
            <button
              type="button"
              onClick={handleFillDemoCode}
              className="text-[#FF3B5C] hover:text-[#ff627e] font-medium transition-colors"
            >
              Auto Fill
            </button>
          </div>

          <Button
            type="submit"
            variant="glow"
            size="lg"
            className="w-full"
            isLoading={isLoading}
          >
            Verify & Continue
          </Button>
        </form>

        {/* Resend and Disclaimer */}
        <div className="mt-6 pt-4 border-t border-white/10 text-center space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs">
            {canResend ? (
              <button
                type="button"
                onClick={handleResend}
                className="inline-flex items-center gap-1.5 text-[#FF3B5C] hover:underline font-medium"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Resend Code</span>
              </button>
            ) : (
              <span className="text-zinc-500">
                Resend code in {resendTimer}s
              </span>
            )}
          </div>

          <p className="text-[11px] text-zinc-500 flex items-center justify-center gap-1">
            <ShieldCheck className="w-3 h-3" />
            <span>Simulated OTP flow ready for backend integration</span>
          </p>
        </div>

      </div>
    </div>
  );
};
