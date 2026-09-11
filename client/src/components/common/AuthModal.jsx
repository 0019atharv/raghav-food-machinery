import React, { useState } from 'react';
import { X, Lock, Mail, Phone, User, CheckCircle2, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function AuthModal() {
  const { authModalOpen, setAuthModalOpen, login, register, verifyOTP } = useAuth();
  
  // Tabs: 'otp' | 'password' | 'register'
  const [activeTab, setActiveTab] = useState('otp');
  
  // OTP state
  const [contact, setContact] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  
  // Email/Password state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Register state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regCompany, setRegCompany] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!authModalOpen) return null;

  const handleRequestOTP = async (e) => {
    e.preventDefault();
    setError('');
    if (!contact) {
      setError('Please enter your phone number or email.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/auth/otp/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contact })
      }).then(r => r.json());

      if (res.success) {
        setOtpSent(true);
        setOtp('123456'); // Pre-fill test OTP for instantaneous user testing!
      } else {
        setError(res.message || 'Failed to send OTP.');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await verifyOTP({ contact, otp });
      setAuthModalOpen(false);
    } catch (err) {
      setError(err.message || 'Invalid OTP. Enter 123456');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      setAuthModalOpen(false);
    } catch (err) {
      setError(err.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register({
        name: regName,
        email: regEmail,
        password: regPassword,
        phone: regPhone,
        businessName: regCompany
      });
      setAuthModalOpen(false);
    } catch (err) {
      setError(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickAdminLogin = async () => {
    setError('');
    setLoading(true);
    try {
      await login('admin@raghavfoodprocessingmachines.com', 'admin123');
      setAuthModalOpen(false);
    } catch (err) {
      setError(err.message || 'Admin login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-industrial-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-industrial-900 border border-industrial-800 rounded-3xl p-6 md:p-8 shadow-2xl overflow-hidden">
        
        {/* Glow Accent */}
        <div className="absolute -top-20 -right-20 w-44 h-44 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={() => setAuthModalOpen(false)}
          className="absolute top-5 right-5 text-industrial-400 hover:text-white p-1 rounded-lg hover:bg-industrial-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-brand mb-3 border border-amber-500/20">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="font-display font-bold text-2xl text-white">Client & Admin Portal</h3>
          <p className="text-xs text-industrial-400 mt-1">
            Access your quote requests, equipment specs & engineering order history
          </p>
        </div>

        {/* Tabs */}
        <div className="flex rounded-xl bg-industrial-950 p-1 mb-6 text-xs font-semibold">
          <button
            type="button"
            onClick={() => { setActiveTab('otp'); setError(''); }}
            className={`flex-1 py-2 rounded-lg transition-all ${
              activeTab === 'otp'
                ? 'bg-amber-brand text-industrial-950 shadow-sm'
                : 'text-industrial-400 hover:text-white'
            }`}
          >
            OTP Login
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('password'); setError(''); }}
            className={`flex-1 py-2 rounded-lg transition-all ${
              activeTab === 'password'
                ? 'bg-amber-brand text-industrial-950 shadow-sm'
                : 'text-industrial-400 hover:text-white'
            }`}
          >
            Email Login
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('register'); setError(''); }}
            className={`flex-1 py-2 rounded-lg transition-all ${
              activeTab === 'register'
                ? 'bg-amber-brand text-industrial-950 shadow-sm'
                : 'text-industrial-400 hover:text-white'
            }`}
          >
            Register
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-950/50 border border-red-800/80 text-red-300 text-xs text-center">
            {error}
          </div>
        )}

        {/* TAB 1: PHONE/EMAIL OTP LOGIN */}
        {activeTab === 'otp' && (
          <div>
            {!otpSent ? (
              <form onSubmit={handleRequestOTP} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-industrial-300 mb-1.5">
                    Mobile Number or Email ID
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-industrial-500 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      placeholder="+91 98765 43210 or name@company.com"
                      className="w-full bg-industrial-950 border border-industrial-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:border-amber-brand focus:outline-none transition-colors"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-industrial-950 font-bold py-2.5 rounded-xl text-sm transition-all shadow-glow-amber flex items-center justify-center gap-2"
                >
                  {loading ? 'Sending OTP...' : 'Send Verification OTP'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOTP} className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs text-industrial-300 mb-1.5">
                    <span>Enter 6-digit OTP sent to:</span>
                    <strong className="text-amber-brand">{contact}</strong>
                  </div>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={6}
                    placeholder="123456"
                    className="w-full text-center tracking-widest text-xl font-mono bg-industrial-950 border border-industrial-800 rounded-xl py-2.5 text-white focus:border-amber-brand focus:outline-none"
                    required
                  />
                  <p className="text-[11px] text-industrial-500 mt-1.5 text-center">
                    (Test verification code: <span className="text-amber-brand font-bold">123456</span>)
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-amber-brand hover:bg-amber-400 text-industrial-950 font-bold py-2.5 rounded-xl text-sm transition-all shadow-glow-amber"
                >
                  {loading ? 'Verifying...' : 'Verify & Access Dashboard'}
                </button>

                <button
                  type="button"
                  onClick={() => setOtpSent(false)}
                  className="w-full text-center text-xs text-industrial-400 hover:text-industrial-200"
                >
                  Use a different phone number
                </button>
              </form>
            )}
          </div>
        )}

        {/* TAB 2: EMAIL & PASSWORD LOGIN */}
        {activeTab === 'password' && (
          <form onSubmit={handlePasswordLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-industrial-300 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-industrial-500 absolute left-3.5 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@raghavfoodprocessingmachines.com"
                  className="w-full bg-industrial-950 border border-industrial-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:border-amber-brand focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-industrial-300 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-industrial-500 absolute left-3.5 top-3" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-industrial-950 border border-industrial-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:border-amber-brand focus:outline-none"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-brand hover:bg-amber-400 text-industrial-950 font-bold py-2.5 rounded-xl text-sm transition-all shadow-glow-amber"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
        )}

        {/* TAB 3: REGISTER NEW CLIENT */}
        {activeTab === 'register' && (
          <form onSubmit={handleRegister} className="space-y-3">
            <div>
              <label className="block text-[11px] font-medium text-industrial-300 mb-1">Full Name</label>
              <input
                type="text"
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                placeholder="Ramesh Kumar"
                className="w-full bg-industrial-950 border border-industrial-800 rounded-lg px-3 py-2 text-xs text-white focus:border-amber-brand focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-industrial-300 mb-1">Company / Factory Name</label>
              <input
                type="text"
                value={regCompany}
                onChange={(e) => setRegCompany(e.target.value)}
                placeholder="Shree Krishna Agro Foods"
                className="w-full bg-industrial-950 border border-industrial-800 rounded-lg px-3 py-2 text-xs text-white focus:border-amber-brand focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-medium text-industrial-300 mb-1">Phone</label>
                <input
                  type="text"
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full bg-industrial-950 border border-industrial-800 rounded-lg px-3 py-2 text-xs text-white focus:border-amber-brand focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-industrial-300 mb-1">Email</label>
                <input
                  type="email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="ramesh@agro.com"
                  className="w-full bg-industrial-950 border border-industrial-800 rounded-lg px-3 py-2 text-xs text-white focus:border-amber-brand focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-industrial-300 mb-1">Password</label>
              <input
                type="password"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-industrial-950 border border-industrial-800 rounded-lg px-3 py-2 text-xs text-white focus:border-amber-brand focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-brand hover:bg-amber-400 text-industrial-950 font-bold py-2.5 rounded-xl text-xs transition-all shadow-glow-amber mt-2"
            >
              {loading ? 'Creating Account...' : 'Create Account & Continue'}
            </button>
          </form>
        )}

        {/* Quick Demo Access Bar */}
        <div className="mt-6 pt-4 border-t border-industrial-800/80">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-industrial-400">Need Admin CMS access?</span>
            <button
              type="button"
              onClick={handleQuickAdminLogin}
              className="flex items-center gap-1.5 text-xs text-amber-brand hover:text-amber-glow font-bold bg-amber-500/10 hover:bg-amber-500/20 px-2.5 py-1 rounded-lg border border-amber-500/30 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>1-Click Admin Demo</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
