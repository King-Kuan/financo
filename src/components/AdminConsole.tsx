/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Users, 
  Clock, 
  CheckCircle2, 
  XSquare, 
  ArrowRight,
  CreditCard
} from 'lucide-react';

const MOCK_QUEUE = [
  { id: 'b_1', name: 'Nyanza Bakery', owner: 'John Doe', plan: 'STARTER', requestedAt: '2h ago' },
  { id: 'b_2', name: 'Valley Logistics', owner: 'Sarah M.', plan: 'GROWTH', requestedAt: '5h ago' },
  { id: 'b_3', name: 'Kigali Supermarket', owner: 'Eric U.', plan: 'ENTERPRISE', requestedAt: 'Yesterday' },
];

export default function AdminConsole() {
  const [queue, setQueue] = useState(MOCK_QUEUE);

  const handleApprove = (id: string) => {
    setQueue(prev => prev.filter(q => q.id !== id));
    // Simulate WhatsApp call or database update
    alert("Business Approved! Owner will receive a WhatsApp message.");
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex items-center gap-4 mb-10">
        <div className="w-16 h-16 rounded-3xl bg-ent/20 flex items-center justify-center text-ent shadow-xl shadow-ent/10 border border-ent/20">
          <ShieldCheck size={32} />
        </div>
        <div>
          <h2 className="text-3xl font-head font-bold tracking-tight">The Palace SuperAdmin</h2>
          <p className="text-text3">Managing business approvals & platform health</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard label="Pending Approval" value={queue.length.toString()} icon={Clock} color="warn" />
        <StatsCard label="Active Businesses" value="142" icon={CheckCircle2} color="growth" />
        <StatsCard label="Total Revenue" value="4.2M RWF" icon={CreditCard} color="ent" />
      </div>

      <div className="glass rounded-[40px] border-white/5 overflow-hidden shadow-2xl">
        <div className="px-8 py-6 border-b border-white/5 bg-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <Users size={20} className="text-growth" />
             <h3 className="font-head font-bold">Approval Queue</h3>
          </div>
          <span className="text-[10px] font-bold text-text4 uppercase tracking-widest italic opacity-50">Blueprint v2.0 Platform Management</span>
        </div>

        <div className="divide-y divide-white/5">
          {queue.length === 0 ? (
            <div className="p-20 text-center text-text4">
               <CheckCircle2 size={48} className="mx-auto mb-4 opacity-20" />
               <p className="font-bold uppercase tracking-widest text-[10px]">Queue is empty</p>
            </div>
          ) : (
            queue.map((item) => (
              <div key={item.id} className="p-8 hover:bg-white/5 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 group">
                <div className="flex items-center gap-6">
                   <div className="w-14 h-14 rounded-2xl bg-bg-soft flex items-center justify-center font-head font-bold text-white shadow-inner group-hover:scale-105 transition-transform">
                     {item.name.charAt(0)}
                   </div>
                   <div>
                     <h4 className="text-lg font-head font-bold text-white tracking-tight">{item.name}</h4>
                     <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] font-bold text-text3 uppercase uppercase tracking-widest">{item.owner}</span>
                        <div className="h-1 w-1 rounded-full bg-white/10"></div>
                        <span className={`text-[9px] font-black px-2 py-0.5 rounded-md ${
                          item.plan === 'STARTER' ? 'bg-starter/20 text-starter' : 
                          item.plan === 'GROWTH' ? 'bg-growth/20 text-growth' : 'bg-ent/20 text-ent'
                        }`}>{item.plan}</span>
                     </div>
                   </div>
                </div>

                <div className="flex items-center gap-8">
                   <div className="text-right">
                     <p className="text-[10px] font-bold text-text4 uppercase tracking-widest">Requested</p>
                     <p className="text-sm font-bold text-text2 mt-1">{item.requestedAt}</p>
                   </div>
                   <div className="flex gap-2">
                      <button className="w-10 h-10 rounded-xl bg-danger/10 text-danger flex items-center justify-center hover:bg-danger/20 transition-all active:scale-95 border border-danger/10">
                        <XSquare size={20} />
                      </button>
                      <button 
                        onClick={() => handleApprove(item.id)}
                        className="px-6 py-2.5 bg-growth text-white font-bold rounded-xl flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-growth/20"
                      >
                        Approve <ArrowRight size={16} />
                      </button>
                   </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function StatsCard({ label, value, icon: Icon, color }: any) {
  const colors: any = {
    warn: 'text-warn bg-warn/10',
    growth: 'text-growth bg-growth/10',
    ent: 'text-ent bg-ent/10',
  };

  return (
    <div className="glass rounded-[32px] p-6 border-white/5 bg-gradient-to-br from-white/5 to-transparent">
        <div className={`w-10 h-10 ${colors[color]} rounded-xl flex items-center justify-center mb-4`}>
          <Icon size={20} />
        </div>
        <p className="text-text3 text-[10px] font-bold uppercase tracking-widest">{label}</p>
        <p className="text-2xl font-head font-extrabold text-white mt-1 tracking-tight">{value}</p>
    </div>
  );
}
