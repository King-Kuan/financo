/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Sparkles, Brain, Bot, Send, RefreshCw, Zap } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Business } from '../types';
import { motion } from 'motion/react';

export default function AIAdvisor({ business }: { business: Business }) {
  const [advice, setAdvice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [userQuery, setUserQuery] = useState('');

  if (business.planId !== 'ENTERPRISE') {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center">
        <div className="w-20 h-20 rounded-[32px] bg-ent/10 flex items-center justify-center text-ent mx-auto mb-8">
          <Sparkles size={40} />
        </div>
        <h2 className="text-3xl font-head font-bold mb-4">Enterprise Intelligence</h2>
        <p className="text-text3 mb-10 max-w-lg mx-auto">AI Advisory is reserved for Enterprise partners. Get custom financial strategies and automated tax optimization today.</p>
        <button className="px-10 py-4 bg-gradient-to-r from-growth to-ent rounded-2xl font-bold text-white shadow-2xl shadow-growth/20 hover:scale-105 active:scale-95 transition-all">
          Upgrade to Enterprise
        </button>
      </div>
    );
  }

  const fetchAdvice = async (query?: string) => {
    setLoading(true);
    try {
      const response = await fetch('/api/advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          businessData: {
            name: business.name,
            plan: business.planId,
            revenue: '456,200 RWF',
            stockValue: '3,410,000 RWF',
            healthScore: 78
          },
          question: query
        })
      });
      const data = await response.json();
      setAdvice(data.advice);
    } catch (err) {
      setAdvice("Error: AI Intelligence is temporarily disconnected. Check API configuration.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdvice();
  }, []);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Hero Header */}
      <div className="relative glass rounded-[48px] p-8 lg:p-14 overflow-hidden border-white/5 bg-gradient-to-br from-growth/10 to-ent/10">
         <div className="absolute top-0 right-0 w-80 h-80 bg-growth/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
         <div className="absolute bottom-0 left-0 w-64 h-64 bg-ent/20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2"></div>
         
         <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10">
            <div className="flex-1 text-center lg:text-left">
               <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10 mb-6 transition-all">
                  <Sparkles size={14} className="text-growth" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-text2">Financo Intelligence Engine</span>
               </div>
               <h2 className="font-head font-extrabold text-4xl lg:text-5xl tracking-tight mb-6 leading-none">
                 Optimize your <span className="text-gradient">Cash Flow</span> with AI.
               </h2>
               <p className="text-text2 text-lg font-medium leading-relaxed max-w-xl">
                 Our system analyzes your sales patterns to provide actionable insights for stock optimization and tax compliance.
               </p>
            </div>
            
            <div className="w-full lg:w-[400px]">
               <form 
                 onSubmit={(e) => { e.preventDefault(); fetchAdvice(userQuery); }}
                 className="relative group focus-within:scale-[1.02] transition-all"
               >
                  <input 
                    type="text" 
                    value={userQuery}
                    onChange={(e) => setUserQuery(e.target.value)}
                    placeholder="Ask about your taxes, ROI, or stock..."
                    className="w-full bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[30px] py-6 pl-8 pr-16 outline-none focus:bg-white/10 focus:border-growth/50 transition-all text-white placeholder:text-text4 font-medium"
                  />
                  <button 
                    disabled={loading}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 bg-growth text-white rounded-2xl flex items-center justify-center shadow-lg shadow-growth/30 hover:scale-105 active:scale-95 disabled:opacity-50 transition-all"
                  >
                    <Send size={20} />
                  </button>
               </form>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
         <div className="lg:col-span-1 space-y-4">
            <div className="glass rounded-[32px] p-6 border-white/5">
                <h4 className="font-head font-bold text-sm mb-4 flex items-center gap-2">
                   <Zap size={16} className="text-growth" />
                   Analytical Layers
                </h4>
                <div className="space-y-3">
                   <div className="flex items-center gap-3 p-3 bg-white/5 rounded-2xl border border-white/5">
                      <div className="w-8 h-8 rounded-lg bg-growth/10 flex items-center justify-center text-growth leading-none"><RefreshCw size={14} /></div>
                      <span className="text-[10px] font-bold text-text2 tracking-wide uppercase">Real-time Sync</span>
                   </div>
                   <div className="flex items-center gap-3 p-3 bg-white/5 rounded-2xl border border-white/5">
                      <div className="w-8 h-8 rounded-lg bg-ent/10 flex items-center justify-center text-ent leading-none"><Brain size={14} /></div>
                      <span className="text-[10px] font-bold text-text2 tracking-wide uppercase">Pattern Logic</span>
                   </div>
                </div>
            </div>
            
            <button 
              onClick={() => fetchAdvice()}
              disabled={loading}
              className="w-full py-4 bg-white/5 border border-white/5 rounded-[24px] text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white/10 transition-all active:scale-95"
            >
              <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
              Refresh Insights
            </button>
         </div>

         <div className="lg:col-span-3">
            <div className="glass rounded-[40px] border-white/5 p-10 min-h-[500px] relative overflow-hidden">
               {loading ? (
                 <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                    <div className="w-16 h-16 border-k border-growth border-t-transparent rounded-full animate-spin mb-6"></div>
                    <p className="text-growth font-head font-bold text-lg animate-pulse">Analyzing Financial Matrix...</p>
                 </div>
               ) : advice ? (
                 <motion.div 
                   initial={{ opacity: 0 }} 
                   animate={{ opacity: 1 }}
                   className="prose prose-invert max-w-none transition-all"
                 >
                    <ReactMarkdown components={{
                      h1: ({node, ...props}) => <h1 className="text-3xl font-head font-bold mb-6 text-white" {...props}/>,
                      h2: ({node, ...props}) => <h2 className="text-xl font-head font-bold mt-8 mb-4 text-growth" {...props}/>,
                      p: ({node, ...props}) => <p className="text-text2 leading-relaxed mb-4" {...props}/>,
                      li: ({node, ...props}) => <li className="text-text2 mb-1" {...props}/>,
                      strong: ({node, ...props}) => <strong className="text-white font-bold" {...props}/>,
                    }}>
                      {advice}
                    </ReactMarkdown>
                 </motion.div>
               ) : (
                 <div className="h-full flex flex-col items-center justify-center text-center opacity-20">
                    <Bot size={80} strokeWidth={1} className="mb-6" />
                    <p className="text-lg font-head font-bold">Ask a question to start the analysis.</p>
                 </div>
               )}
            </div>
         </div>
      </div>
    </div>
  );
}

const colors: any = {
  k: "border-4",
};
