/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  Zap, 
  Box, 
  AlertTriangle,
  ChevronRight
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { Business } from '../types';

const mockChartData = [
  { name: 'Mon', revenue: 45000, expenses: 12000 },
  { name: 'Tue', revenue: 52000, expenses: 15000 },
  { name: 'Wed', revenue: 48000, expenses: 11000 },
  { name: 'Thu', revenue: 61000, expenses: 18000 },
  { name: 'Fri', revenue: 55000, expenses: 14000 },
  { name: 'Sat', revenue: 87000, expenses: 22000 },
  { name: 'Sun', revenue: 72000, expenses: 19000 },
];

export default function Dashboard({ business }: { business: Business }) {
  return (
    <div className="space-y-8 pb-10">
      {/* Top Welcome Section */}
      <div className="row items-center justify-between">
        <div className="col">
          <h2 className="text-3xl font-head font-bold tracking-tight">Business Intelligence</h2>
          <p className="text-text3 mt-1">Real-time performance metrics for <span className="text-text2">{business.name}</span></p>
        </div>
        <div className="flex gap-2">
           <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold transition-colors">Export PDF</button>
           <button className="px-4 py-2 bg-growth text-white rounded-xl text-xs font-bold transition-colors shadow-lg shadow-growth/20">New Transaction</button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard 
          label="Total Revenue" 
          value="456,200 RWF" 
          trend={12.5} 
          icon={TrendingUp} 
          color="growth" 
        />
        <KpiCard 
          label="Total Expenses" 
          value="112,400 RWF" 
          trend={-2.4} 
          icon={Zap} 
          color="danger" 
        />
        <KpiCard 
          label="Stock Value" 
          value="3,410,000 RWF" 
          trend={5.1} 
          icon={Box} 
          color="info" 
        />
        <KpiCard 
          label="Net Profit" 
          value="343,800 RWF" 
          trend={18.2} 
          icon={TrendingUp} 
          color="ent" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 glass rounded-[32px] p-8 border-white/5">
           <div className="flex items-center justify-between mb-8">
             <div>
               <h3 className="font-head font-bold text-lg">Sales Performance</h3>
               <p className="text-text3 text-xs">Revenue vs Expenses (Last 7 Days)</p>
             </div>
             <div className="flex gap-3 text-[10px] font-bold uppercase tracking-widest cursor-default">
               <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-growth"></div>Revenue</div>
               <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-white/20"></div>Expenses</div>
             </div>
           </div>
           
           <div className="h-[300px] w-full">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={mockChartData}>
                 <defs>
                   <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.3}/>
                     <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0}/>
                   </linearGradient>
                 </defs>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                 <XAxis 
                   dataKey="name" 
                   axisLine={false} 
                   tickLine={false} 
                   tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10, fontWeight: 600 }}
                   dy={10}
                 />
                 <YAxis 
                   hide 
                 />
                 <Tooltip 
                   contentStyle={{ 
                     backgroundColor: '#0D1017', 
                     borderRadius: '16px', 
                     border: '1px solid rgba(255,255,255,0.1)',
                     boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.5)'
                   }}
                   itemStyle={{ fontSize: '12px', fontWeight: 600 }}
                 />
                 <Area 
                   type="monotone" 
                   dataKey="revenue" 
                   stroke="#0EA5E9" 
                   strokeWidth={4}
                   fillOpacity={1} 
                   fill="url(#colorRevenue)" 
                   animationDuration={2000}
                 />
                 <Area 
                   type="monotone" 
                   dataKey="expenses" 
                   stroke="rgba(255,255,255,0.2)" 
                   strokeWidth={2}
                   fill="transparent"
                 />
               </AreaChart>
             </ResponsiveContainer>
           </div>
        </div>

        {/* Alerts & Health */}
        <div className="space-y-6">
           {/* Health Score */}
           <div className="glass rounded-[32px] p-8 border-white/5 bg-gradient-to-br from-white/5 to-transparent">
              <h3 className="font-head font-bold text-lg mb-6">Health Score</h3>
              <div className="relative w-32 h-32 mx-auto">
                 <svg className="w-full h-full transform -rotate-90">
                    <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />
                    <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={364.4} strokeDashoffset={364.4 * (1 - 0.78)} className="text-growth transition-all duration-1000" />
                 </svg>
                 <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-head font-black tracking-tighter">78</span>
                    <span className="text-[10px] font-bold text-text3 uppercase uppercase tracking-wider">Growth</span>
                 </div>
              </div>
              <p className="text-center text-xs text-text3 mt-6 leading-relaxed">
                Your revenue is <span className="text-growth font-bold">15% higher</span> than last month. Consider restocking inventory.
              </p>
           </div>

           {/* Stock Alerts */}
           <div className="glass rounded-[32px] p-6 border-white/5">
              <div className="flex items-center justify-between mb-4">
                 <h3 className="font-bold text-sm">Stock Alerts</h3>
                 <span className="text-[10px] bg-danger/20 text-danger px-2 py-0.5 rounded-full font-bold">2 CRITICAL</span>
              </div>
              <div className="space-y-3">
                 <AlertItem label="UHT Milk 1L" stock={4} min={10} />
                 <AlertItem label="Bakers Flour 25kg" stock={2} min={5} />
              </div>
              <button className="w-full mt-4 flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 rounded-2xl text-[10px] font-bold uppercase tracking-wider transition-all">
                Restock Now <ChevronRight size={14} />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}

function KpiCard({ label, value, trend, icon: Icon, color }: any) {
  const isPositive = trend > 0;
  return (
    <div className="glass rounded-[32px] p-6 border-white/5 hover:border-white/10 transition-all group">
      <div className="flex items-start justify-between mb-4">
         <div className={`p-3 rounded-2xl bg-${color}/10 text-${color} group-hover:scale-110 transition-transform`}>
            <Icon size={24} />
         </div>
         <div className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-lg ${isPositive ? 'bg-growth/20 text-growth' : 'bg-danger/20 text-danger'}`}>
            {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
            {Math.abs(trend)}%
         </div>
      </div>
      <div>
        <p className="text-text3 text-xs font-medium uppercase tracking-wider">{label}</p>
        <p className="text-2xl font-head font-extrabold tracking-tight mt-1">{value}</p>
      </div>
    </div>
  );
}

function AlertItem({ label, stock, min }: any) {
  return (
    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-2xl border border-white/5">
      <div className="w-8 h-8 rounded-lg bg-danger/10 flex items-center justify-center text-danger">
        <AlertTriangle size={16} />
      </div>
      <div className="flex-1">
        <p className="text-xs font-bold">{label}</p>
        <p className="text-[10px] text-text3 font-medium">Only {stock} left (Min: {min})</p>
      </div>
    </div>
  );
}
