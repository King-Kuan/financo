/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Mail, 
  Lock, 
  User, 
  ArrowLeft, 
  Store, 
  Briefcase, 
  ShieldCheck,
  Smartphone,
  ChevronRight,
  ArrowRight,
  Loader2
} from 'lucide-react';
import { PLANS } from '../constants';
import { UserRole, PlanType } from '../types';
import { authService } from '../services/authService';

interface AuthProps {
  onAuthComplete: (role: UserRole, businessData?: any) => void;
  onBack: () => void;
}

export default function Auth({ onAuthComplete, onBack }: AuthProps) {
  const [view, setView] = useState<'LOGIN' | 'REGISTER' | 'ROLE_SELECT'>('ROLE_SELECT');
  const [role, setRole] = useState<UserRole>('OWNER');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Registration specific state
  const [regStep, setRegStep] = useState(1);
  const [plan, setPlan] = useState<PlanType>('STARTER');
  const [bizName, setBizName] = useState('');

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const user = await authService.signInWithGoogle();
      const profile = await authService.getUserProfile(user.uid);
      
      if (profile) {
        onAuthComplete(profile.role);
      } else {
        // New user has no profile, must register
        setError("Account not found. Please register your business first.");
        setView('REGISTER');
      }
    } catch (err: any) {
      console.error("Auth Error:", err);
      if (err.code === 'auth/popup-blocked') {
        setError("Popup was blocked by your browser. Please allow popups for this site.");
      } else if (err.code === 'auth/internal-error') {
        setError("A connection error occurred. Please check your internet or try another browser.");
      } else if (err.code === 'auth/popup-closed-by-user') {
        setError("Sign-in window was closed. Please try again.");
      } else {
        setError(err.message || "Authentication failed");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const user = await authService.signInWithGoogle();
      await authService.registerOwner(user, { name: bizName, planId: plan });
      onAuthComplete('OWNER');
    } catch (err: any) {
      console.error("Reg Error:", err);
      if (err.code === 'auth/popup-blocked') {
        setError("Popup was blocked. Please allow popups to register.");
      } else {
        setError(err.message || "Registration failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-growth/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-ent/10 rounded-full blur-[100px] -translate-x-1/4 translate-y-1/2"></div>
      
      <button 
        disabled={loading}
        onClick={onBack}
        className="absolute top-8 left-8 flex items-center gap-2 text-text3 hover:text-white transition-colors font-bold text-xs uppercase tracking-widest disabled:opacity-50"
      >
        <ArrowLeft size={16} /> Back to Home
      </button>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-[24px] bg-gradient-to-br from-growth to-ent flex items-center justify-center font-head font-bold text-white text-2xl mx-auto mb-6 shadow-2xl shadow-growth/20">F</div>
          <h1 className="font-head text-3xl font-black text-white tracking-tight">
            {view === 'ROLE_SELECT' && "Welcome to Financo"}
            {view === 'LOGIN' && `Sign in to Financo`}
            {view === 'REGISTER' && "Launch your Business"}
          </h1>
          <p className="text-text3 text-sm mt-2">Connecting Rwandan commerce to the future.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-danger/10 border border-danger/20 text-danger text-xs font-bold text-center">
            {error}
          </div>
        )}

        <div className="glass rounded-[40px] border-white/5 p-8 shadow-2xl backdrop-blur-2xl">
          {view === 'ROLE_SELECT' && (
            <div className="space-y-4">
              <RoleCard 
                icon={Store} 
                title="Business Owner" 
                desc="Manage your shop, set plans & staff." 
                onClick={() => { setRole('OWNER'); setView('LOGIN'); }}
              />
              <RoleCard 
                icon={Briefcase} 
                title="Staff / Worker" 
                desc="Access POS, Inventory and more." 
                onClick={() => { setRole('WORKER'); setView('LOGIN'); }}
              />
              <RoleCard 
                icon={ShieldCheck} 
                title="Super Admin" 
                desc="Platform health & management." 
                onClick={() => { setRole('SUPERADMIN'); setView('LOGIN'); }}
              />
              
              <div className="pt-6 border-t border-white/5 mt-6">
                <button 
                  onClick={() => setView('REGISTER')}
                  className="w-full py-4 bg-growth text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  Register New Business <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}

          {view === 'LOGIN' && (
            <div className="space-y-6 text-center">
              <p className="text-sm text-text3 mb-4">Click below to sign in securely using your Google account.</p>
              <button 
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full py-4 bg-white text-black rounded-2xl font-bold flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : <img src="https://www.google.com/favicon.ico" className="w-5 h-5" alt="google" />}
                Sign in with Google
              </button>
              
              <div className="pt-4 border-t border-white/5">
                <button 
                  type="button"
                  onClick={() => setView('ROLE_SELECT')}
                  className="text-[10px] font-bold text-text4 uppercase tracking-widest hover:text-text3 transition-colors"
                >
                  Change Account Type
                </button>
              </div>
            </div>
          )}

          {view === 'REGISTER' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-6">
              {regStep === 1 ? (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                  <InputGroup 
                    icon={Store} 
                    label="Business Name" 
                    placeholder="Uwimana General Store" 
                    value={bizName}
                    onChange={(e: any) => setBizName(e.target.value)}
                  />
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-[10px] text-text3 italic">
                    Authentication will be completed via Google in the next step.
                  </div>
                  <button 
                    type="button"
                    disabled={!bizName}
                    onClick={() => setRegStep(2)}
                    className="w-full py-4 bg-growth text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                  >
                    Select Plan <ArrowRight size={18} />
                  </button>
                </div>
              ) : (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="space-y-3">
                    {PLANS.map(p => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setPlan(p.id)}
                        className={`
                          w-full p-4 rounded-2xl border text-left transition-all
                          ${plan === p.id ? 'bg-growth/10 border-growth text-white' : 'bg-white/5 border-white/5 text-text3 hover:bg-white/10'}
                        `}
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-bold text-sm">{p.name}</span>
                          <span className="font-mono text-xs font-bold text-growth">{p.priceRwf.toLocaleString()} RWF</span>
                        </div>
                        <p className="text-[10px] opacity-60">Ideal for {p.id === 'STARTER' ? 'Solo items' : p.id === 'GROWTH' ? 'SME Teams' : 'Enterprises'}</p>
                      </button>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <button 
                      type="button"
                      disabled={loading}
                      onClick={() => setRegStep(1)}
                      className="flex-1 py-4 bg-white/5 text-text3 rounded-2xl font-bold border border-white/5 hover:bg-white/10 transition-all font-head disabled:opacity-50"
                    >
                      Back
                    </button>
                    <button 
                      type="submit"
                      disabled={loading}
                      className="flex-[2] py-4 bg-growth text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-growth/20 font-head disabled:opacity-50"
                    >
                      {loading && <Loader2 className="animate-spin" size={18} />}
                      Complete & Pay
                    </button>
                  </div>
                </div>
              )}
              
              <div className="text-center pt-4 border-t border-white/5">
                <button 
                  type="button"
                  disabled={loading}
                  onClick={() => setView('LOGIN')}
                  className="text-xs font-bold text-text3 hover:text-white disabled:opacity-50"
                >
                  Already have an account? Login
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

function RoleCard({ icon: Icon, title, desc, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className="w-full flex items-center gap-5 p-5 bg-white/5 border border-white/5 rounded-3xl text-left hover:bg-white/10 active:scale-[0.98] group transition-all"
    >
      <div className="w-12 h-12 rounded-2xl bg-bg-soft flex items-center justify-center text-growth group-hover:bg-growth group-hover:text-white transition-all shadow-inner">
        <Icon size={24} />
      </div>
      <div>
        <h3 className="font-bold text-white text-sm tracking-tight">{title}</h3>
        <p className="text-[10px] text-text3 mt-1 leading-tight">{desc}</p>
      </div>
    </button>
  );
}

function InputGroup({ icon: Icon, label, placeholder, type = "text", value, onChange }: any) {
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-bold text-text4 uppercase tracking-widest pl-1">{label}</label>
      <div className="relative group">
        <Icon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text4 group-focus-within:text-growth transition-colors" />
        <input 
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-growth/50 focus:bg-white/10 transition-all text-sm font-medium"
        />
      </div>
    </div>
  );
}
