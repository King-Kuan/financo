/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  ShieldCheck, 
  TrendingUp, 
  Package, 
  Smartphone, 
  BarChart3,
  Globe,
  Users,
  CreditCard,
  History
} from 'lucide-react';
import { PLANS } from '../constants';
import { motion } from 'motion/react';

export default function Landing({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <div className="bg-bg text-text min-h-screen font-sans selection:bg-growth selection:text-white">
      {/* Navbar */}
      <nav className="h-20 flex items-center justify-between px-6 lg:px-12 glass border-white/5 sticky top-0 z-[100] bg-bg/80 backdrop-blur-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-growth to-ent flex items-center justify-center font-head font-bold text-white text-lg shadow-lg shadow-growth/20">F</div>
          <span className="font-head font-extrabold text-2xl tracking-tighter text-white">Financo</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-[11px] font-bold text-text3 uppercase tracking-[0.15em]">
          <a href="#features" className="hover:text-growth transition-colors">Features</a>
          <a href="#demo-info" className="hover:text-growth transition-colors">How it works</a>
          <a href="#plans" className="hover:text-growth transition-colors">Pricing</a>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={onGetStarted}
            className="px-6 py-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold transition-all border border-white/10"
          >
            Terminal Login
          </button>
          <button 
            onClick={onGetStarted}
            className="px-6 py-2.5 bg-growth text-white rounded-xl text-xs font-bold shadow-xl shadow-growth/20 hover:scale-105 active:scale-95 transition-all"
          >
            Start Free Trial
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-32 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-growth/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4"></div>
          <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-ent/20 rounded-full blur-[100px] -translate-x-1/4 -translate-y-1/2"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8"
          >
            <Zap size={14} className="text-growth fill-growth/20" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-text3">The Standard for Rwandan SME Operations</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-head font-black text-5xl lg:text-7xl leading-[0.95] tracking-tight text-white mb-8"
          >
            Scale your business <br/> with <span className="text-gradient">Intelligence.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-text2 text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed mb-12 font-medium"
          >
            Comprehensive financial management with offline POS, multi-location inventory, and integrated payroll. Simplify your numbers, grow your legacy.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button 
              onClick={onGetStarted}
              className="w-full sm:w-auto px-10 py-5 bg-growth text-white rounded-[24px] font-head font-bold text-lg shadow-2xl shadow-growth/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3"
            >
              Get Started Now <ArrowRight size={20} />
            </button>
            <a href="#demo-info" className="w-full sm:w-auto px-10 py-5 bg-white/5 text-text hover:bg-white/10 rounded-[24px] font-head font-bold text-lg border border-white/10 transition-all text-center">
              Explore Features
            </a>
          </motion.div>
        </div>
      </section>

      {/* Feature Walkthrough (The "Demo More Information") */}
      <section id="demo-info" className="py-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-growth/10 flex items-center justify-center text-growth mb-6">
                <Smartphone size={24} />
              </div>
              <h2 className="text-3xl lg:text-5xl font-head font-bold text-white mb-6 leading-tight">Hybrid-Cloud POS <br/> <span className="text-growth">Works Offline.</span></h2>
              <p className="text-text3 text-lg leading-relaxed mb-8">
                Never lose a sale due to poor network. Our proprietary sync engine handles transactions locally and updates the cloud the moment you're back online. 
              </p>
              <ul className="space-y-4">
                {['Instant Receipt Generation', 'Mobile Money (MoMo) Native Integration', 'Split-Payment Support (Cash/Card/MoMo)'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-text2 font-medium">
                    <CheckCircle2 size={18} className="text-growth shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass rounded-[40px] p-8 border-white/5 relative overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-tr from-growth/10 to-transparent"></div>
               <img 
                 src="https://images.unsplash.com/photo-1556742044-3c52d6e88c62?q=80&w=800&auto=format&fit=crop" 
                 alt="POS Preview" 
                 className="rounded-2xl shadow-2xl grayscale group-hover:grayscale-0 transition-all duration-700 hover:scale-[1.02]"
               />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1 glass rounded-[40px] p-8 border-white/5 relative overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-tr from-ent/10 to-transparent"></div>
               <img 
                 src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop" 
                 alt="Inventory Preview" 
                 className="rounded-2xl shadow-2xl grayscale group-hover:grayscale-0 transition-all duration-700 hover:scale-[1.02]"
               />
            </div>
            <div className="order-1 lg:order-2">
              <div className="w-12 h-12 rounded-2xl bg-ent/10 flex items-center justify-center text-ent mb-6">
                <Package size={24} />
              </div>
              <h2 className="text-3xl lg:text-5xl font-head font-bold text-white mb-6 leading-tight">Advanced Inventory <br/> <span className="text-ent">Visibility.</span></h2>
              <p className="text-text3 text-lg leading-relaxed mb-8">
                Keep track of every item in your warehouse or store. Set automated low-stock triggers and get notified on WhatsApp before you run out.
              </p>
              <ul className="space-y-4">
                {['Multi-Warehouse Reconciliation', 'Automated Bulk SKU Import', 'Real-time Stock Valuation Reports'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-text2 font-medium">
                    <CheckCircle2 size={18} className="text-ent shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 px-6 lg:px-12 bg-bg-soft/30 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl lg:text-5xl font-head font-bold text-white mb-4">Why Financo?</h2>
            <p className="text-text3 text-lg">The infrastructure built specifically for the local market.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass rounded-3xl p-8 border-white/5 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-growth/10 flex items-center justify-center text-growth mb-6">
                <Users size={28} />
              </div>
              <h4 className="text-xl font-bold text-white mb-4 tracking-tight">Staff Empowerment</h4>
              <p className="text-text3 text-sm leading-relaxed">
                Onboard workers with restricted POS-only access. Track individual performance and prevent manual inventory leakages.
              </p>
            </div>
            <div className="glass rounded-3xl p-8 border-white/5 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-info/10 flex items-center justify-center text-info mb-6">
                <CreditCard size={28} />
              </div>
              <h4 className="text-xl font-bold text-white mb-4 tracking-tight">Cashflow Harmony</h4>
              <p className="text-text3 text-sm leading-relaxed">
                Connect your BK, I&M, or MoMo accounts. See a unified view of your liquidity across all digital and cash platforms.
              </p>
            </div>
            <div className="glass rounded-3xl p-8 border-white/5 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-ent/10 flex items-center justify-center text-ent mb-6">
                <History size={28} />
              </div>
              <h4 className="text-xl font-bold text-white mb-4 tracking-tight">Financial Legacy</h4>
              <p className="text-text3 text-sm leading-relaxed">
                Build a clean financial history. High-quality reporting makes it easier to qualify for SME loans and investments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Admin Setup Guide Section */}
      <section className="py-24 px-6 lg:px-12 bg-white/5 border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <ShieldCheck size={32} className="text-ent" />
            <h2 className="text-3xl font-head font-bold text-white uppercase italic tracking-tighter">Admin Authorization Protocol</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <h4 className="text-white font-bold flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-ent/20 flex items-center justify-center text-[10px]">1</div>
                Whitelist Domains
              </h4>
              <p className="text-text3 text-sm leading-relaxed">
                Add your deployment URL to <strong>Firebase Auth &gt; Settings &gt; Authorized Domains</strong> to enable Google Login.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-white font-bold flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-ent/20 flex items-center justify-center text-[10px]">2</div>
                Provision Admin
              </h4>
              <p className="text-text3 text-sm leading-relaxed">
                Manually create a document in the <code>admins/</code> collection using your <strong>UID</strong> as the document ID in the Firebase Console.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="plans" className="py-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-head font-black text-4xl lg:text-5xl text-white mb-4">Simple, Local Pricing.</h2>
            <p className="text-text3 text-lg">Scalable plans built for everyday operations.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PLANS.map((plan) => (
              <div key={plan.id} className="glass rounded-[40px] p-10 border-white/5 flex flex-col hover:border-growth/20 transition-all group hover:-translate-y-2 duration-500">
                <div className="mb-8">
                  <h3 className="font-head font-bold text-2xl text-white mb-1">{plan.name}</h3>
                  <div className="text-3xl font-head font-black text-growth">{plan.priceRwf.toLocaleString()} <span className="text-xs font-bold text-text3 uppercase tracking-widest">RWF / Month</span></div>
                </div>
                
                <div className="space-y-4 flex-1 mb-10">
                  {plan.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-text2">
                      <CheckCircle2 size={16} className="text-growth shrink-0" />
                      {feat}
                    </div>
                  ))}
                </div>

                <button 
                  onClick={onGetStarted}
                  className="w-full py-4 bg-white/5 hover:bg-growth text-white rounded-2xl font-bold transition-all border border-white/10 group-hover:shadow-xl group-hover:shadow-growth/20"
                >
                  Choose {plan.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-20 border-t border-white/5 text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-growth to-ent flex items-center justify-center font-head font-bold text-white text-xs">F</div>
          <span className="font-head font-bold tracking-tight text-white">Financo</span>
        </div>
        <p className="text-text4 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">The Palace, Inc. - The Palace Tech House</p>
        <p className="text-text4 text-[9px] font-medium uppercase tracking-[0.1em] opacity-50">&copy; 2026 All Rights Reserved • Kigali, Rwanda</p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, desc }: any) {
  return (
    <div className="glass rounded-[32px] p-8 border-white/5 hover:bg-white/5 transition-all group">
      <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-growth mb-6 group-hover:scale-110 transition-transform">
        <Icon size={24} />
      </div>
      <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{title}</h3>
      <p className="text-text3 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}
