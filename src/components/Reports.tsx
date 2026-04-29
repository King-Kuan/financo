/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  FileText, 
  Download, 
  PieChart, 
  BarChart4, 
  ArrowRight,
  TrendingUp,
  History
} from 'lucide-react';
import { Business } from '../types';

export default function Reports({ business }: { business: Business }) {
  const reports = [
    { id: 'is', name: 'Income Statement', desc: 'Revenue vs Expenses (P&L)', icon: TrendingUp },
    { id: 'bs', name: 'Balance Sheet', desc: 'Assets, Liabilities, and Equity', icon: PieChart },
    { id: 'cf', name: 'Cash Flow', desc: 'Operating and Financing cash', icon: BarChart4 },
    { id: 'al', name: 'Audit Log', desc: 'Full transaction history', icon: History },
  ];

  const recentExports = [
    { name: 'Monthly_Sales_March_2024.pdf', date: '2 days ago', size: '1.2 MB' },
    { name: 'Stock_Valuation_Q1.pdf', date: '5 days ago', size: '0.8 MB' },
    { name: 'Payroll_Summary_March.pdf', date: '1 week ago', size: '2.1 MB' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-head font-bold tracking-tight">Financial Reports</h2>
          <p className="text-text3 mt-1">Deep analysis and export tools for {business.name}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reports.map((report) => (
          <button key={report.id} className="glass rounded-[32px] p-6 border-white/5 hover:border-growth/30 transition-all text-left flex flex-col group">
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-growth mb-6 group-hover:scale-110 transition-transform">
              <report.icon size={24} />
            </div>
            <h3 className="font-bold text-white mb-1">{report.name}</h3>
            <p className="text-text3 text-xs leading-relaxed mb-6">{report.desc}</p>
            <div className="mt-auto flex items-center gap-2 text-growth font-bold text-[10px] uppercase tracking-widest group-hover:translate-x-1 transition-transform">
              Generate Report <ArrowRight size={14} />
            </div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass rounded-[40px] border-white/5 p-8">
          <div className="flex items-center justify-between mb-8">
             <h3 className="font-head font-bold text-xl">Recent Exports</h3>
             <button className="text-xs font-bold text-growth hover:underline">View All Files</button>
          </div>
          <div className="space-y-4">
            {recentExports.map((file, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-bg-soft flex items-center justify-center text-text3">
                    <FileText size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold">{file.name}</p>
                    <p className="text-[10px] text-text3 font-medium uppercase tracking-wider">{file.date} • {file.size}</p>
                  </div>
                </div>
                <button className="p-3 bg-white/5 hover:bg-growth hover:text-white rounded-xl transition-all">
                  <Download size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-[40px] border-white/5 p-8 bg-gradient-to-br from-ent/10 to-transparent">
           <h3 className="font-head font-bold text-xl mb-4">Advisory Insight</h3>
           <div className="p-6 bg-white/5 rounded-3xl border border-white/5 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-3 opacity-20">
               <TrendingUp size={48} className="text-ent" />
             </div>
             <p className="text-sm italic text-text2 leading-relaxed relative z-10">
               "Your high cash reserves suggests you could increase inventory of 'UHT Milk' by 20% to avoid stock-outs seen last Saturday."
             </p>
             <div className="mt-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-ent/20 flex items-center justify-center text-ent p-1">
                   <div className="w-full h-full rounded-full bg-ent"></div>
                </div>
                <div>
                   <p className="text-[10px] font-bold text-white leading-none">The Palace AI</p>
                   <p className="text-[9px] text-text3 uppercase mt-0.5 tracking-widest">Enterprise Feature</p>
                </div>
             </div>
           </div>
           
           <div className="mt-8 space-y-4">
              <div className="text-[10px] font-bold text-text4 uppercase tracking-widest px-1">Health Score Breakdown</div>
              <ScoreRow label="Profitability" score={85} />
              <ScoreRow label="Liquidity" score={92} />
              <ScoreRow label="Stock Turn" score={45} />
           </div>
        </div>
      </div>
    </div>
  );
}

function ScoreRow({ label, score }: any) {
  let color = 'bg-growth';
  if (score < 50) color = 'bg-danger';
  else if (score < 80) color = 'bg-warn';

  return (
    <div className="space-y-1.5">
       <div className="flex justify-between text-[10px] font-bold text-text3">
          <span>{label}</span>
          <span>{score}%</span>
       </div>
       <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
          <div className={`h-full ${color} transition-all duration-1000`} style={{ width: `${score}%` }}></div>
       </div>
    </div>
  );
}
