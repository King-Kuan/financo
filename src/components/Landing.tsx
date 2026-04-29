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
  Globe
} from 'lucide-react';
import { PLANS } from '../constants';
import { motion } from 'motion/react';

export default function Landing({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <div className="bg-bg text-text min-h-screen font-sans selection:bg-growth selection:text-white">
      {/* Navbar */}
      <nav className="h-20 flex items-center justify-between px-6 lg:px-12 glass border-white/5 sticky top-0 z-[100]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-growth to-ent flex items-center justify-center font-head font-bold text-white text-lg">F</div>
          <span className="font-head font-extrabold text-2xl tracking-tighter text-white">Financo</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-bold text-text3 uppercase tracking-widest">
          <a href="#features" className="hover:text-growth transition-colors">Features</a>
          <a href="#plans" className="hover:text-growth transition-colors">Pricing</a>
          <a href="#benefits" className="hover:text-growth transition-colors">Benefits</a>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={onGetStarted}
            className="px-6 py-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold transition-all border border-white/10"
          >
            Login
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
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-text3">Built for Rwandan SMEs</span>
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
            className="text-text2 text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed mb-12"
          >
            Comprehensive financial management with offline POS, inventory tracking, and MoMo integration. Simplify your numbers, grow your legacy.
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
            <button className="w-full sm:w-auto px-10 py-5 bg-white/5 text-text hover:bg-white/10 rounded-[24px] font-head font-bold text-lg border border-white/10 transition-all">
              Watch Demo
            </button>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 px-6 lg:px-12 bg-bg-soft/50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 className="font-head font-bold text-3xl lg:text-4xl text-white mb-4">Powerful Features</h2>
            <p className="text-text3 text-lg">Everything you need to run a modern shop or warehouse.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={Smartphone} 
              title="Modern POS" 
              desc="Sell anywhere, even offline. Syncs automatically when you reconnect to the network." 
            />
            <FeatureCard 
              icon={Package} 
              title="Smart Inventory" 
              desc="Real-time stock levels, low-stock alerts on WhatsApp, and automated reorder tracking." 
            />
            <FeatureCard 
              icon={TrendingUp} 
              title="AI Intelligence" 
              desc="Business health scores and automated financial advice to improve your margins." 
            />
            <FeatureCard 
              icon={BarChart3} 
              title="Local Compliance" 
              desc="RSSB and PAYE ready payroll, tax-ready invoicing, and localized financial reporting." 
            />
            <FeatureCard 
              icon={ShieldCheck} 
              title="Secure Hierarchy" 
              desc="Separate Owner and Worker roles with granular permissions to protect your data." 
            />
            <FeatureCard 
              icon={Globe} 
              title="Cloud Native" 
              desc="Access your reports from anywhere in the world on Web, iOS, or Android." 
            />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="aspect-square glass rounded-[60px] border-white/5 relative overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-tr from-growth/20 to-transparent"></div>
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3/4 h-3/4 glass rounded-[40px] border-white/10 shadow-2xl p-8 transform rotate-6 scale-90 group-hover:rotate-0 group-hover:scale-100 transition-all duration-700">
                     <div className="w-12 h-2 rounded-full bg-growth/30 mb-8"></div>
                     <div className="space-y-4">
                        {[1,2,3,4].map(i => <div key={i} className="h-6 w-full rounded-lg bg-white/5"></div>)}
                     </div>
                  </div>
               </div>
            </div>
          </div>
          <div>
            <h2 className="font-head font-bold text-4xl lg:text-5xl text-white mb-8 leading-tight">
              Why Business Owners <br/> <span className="text-gradient">Choose Financo.</span>
            </h2>
            <div className="space-y-8">
              <BenefitItem 
                title="Zero Data Loss" 
                desc="Work offline at your shop and never worry about losing a single transaction record." 
              />
              <BenefitItem 
                title="Manual Approval Security" 
                desc="Every account is manually verified by The Palace team to ensure a high-trust ecosystem." 
              />
              <BenefitItem 
                title="Better Cash Stewardship" 
                desc="Track your MoMo, bank, and cash registers in one single, high-fidelity dashboard." 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="plans" className="py-24 px-6 lg:px-12 bg-bg-soft/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-head font-black text-4xl lg:text-5xl text-white mb-4">Simple, Local Pricing.</h2>
            <p className="text-text3 text-lg">Scalable plans built for everyday Rwandan business needs.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PLANS.map((plan) => (
              <div key={plan.id} className="glass rounded-[40px] p-10 border-white/5 flex flex-col hover:border-growth/20 transition-all group">
                <div className="mb-8">
                  <h3 className="font-head font-bold text-2xl text-white mb-1">{plan.name}</h3>
                  <div className="text-3xl font-head font-black text-growth">{plan.priceRwf.toLocaleString()} <span className="text-xs font-bold text-text3 uppercase tracking-widest">RWF / Month</span></div>
                </div>
                
                <div className="space-y-4 flex-1 mb-10">
                  {plan.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-text2">
                      <CheckCircle2 size={16} className="text-growth" />
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
        <p className="text-text4 text-[10px] font-bold uppercase tracking-[0.4em]">The Palace Tech House • Kigali, Rwanda</p>
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

function BenefitItem({ title, desc }: any) {
  return (
    <div className="flex gap-5">
      <div className="w-12 h-12 rounded-2xl bg-growth/10 flex items-center justify-center text-growth shrink-0">
        <CheckCircle2 size={24} />
      </div>
      <div>
        <h4 className="text-lg font-bold text-white mb-1">{title}</h4>
        <p className="text-text3 text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
