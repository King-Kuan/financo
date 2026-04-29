/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Plus, 
  Send, 
  FileText, 
  MoreVertical, 
  User, 
  Calendar,
  Search
} from 'lucide-react';
import { Business } from '../types';

const MOCK_INVOICES = [
  { id: 'INV-1001', client: 'Serena Hotel Kigali', amount: '1,200,000 RWF', date: '2024-03-22', status: 'PAID' },
  { id: 'INV-1002', client: 'Bank of Kigali', amount: '450,000 RWF', date: '2024-03-25', status: 'SENT' },
  { id: 'INV-1003', client: 'Zebra Transport Ltd', amount: '890,000 RWF', date: '2024-03-27', status: 'OVERDUE' },
  { id: 'INV-1004', client: 'Individual: Kalisa', amount: '45,000 RWF', date: '2024-03-28', status: 'DRAFT' },
];

export default function Invoices({ business }: { business: Business }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h2 className="text-3xl font-head font-bold tracking-tight">Invoices & Client Billing</h2>
           <p className="text-text3 mt-1">Manage citations, professional invoices, and B2B receivables.</p>
        </div>
        <button className="px-6 py-3 bg-growth text-white rounded-2xl flex items-center gap-2 font-bold shadow-lg shadow-growth/20 hover:scale-105 active:scale-95 transition-all">
          <Plus size={18} />
          Create New Invoice
        </button>
      </div>

      <div className="row items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text3" size={20} />
          <input 
            type="text" 
            placeholder="Search by invoice # or client name..." 
            className="w-full pl-12 pr-4 py-3 glass rounded-2xl border-white/5 outline-none focus:border-growth/50 transition-all text-sm"
          />
        </div>
        <div className="flex gap-2">
           <FilterBtn label="All" active />
           <FilterBtn label="Unpaid" />
           <FilterBtn label="Overdue" />
        </div>
      </div>

      <div className="glass rounded-[40px] border-white/5 overflow-hidden shadow-2xl">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-white/5 border-b border-white/5">
              <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-text3">Client / Invoice</th>
              <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-text3">Date</th>
              <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-text3 text-right">Amount Due</th>
              <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-text3 text-center">Status</th>
              <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-text3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {MOCK_INVOICES.map((inv) => (
              <tr key={inv.id} className="hover:bg-white/5 transition-colors group">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-growth group-hover:bg-growth group-hover:text-white transition-all">
                       <FileText size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white leading-none">{inv.client}</p>
                      <p className="text-[10px] font-mono font-bold text-text4 mt-1.5 uppercase tracking-widest">#{inv.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-2 text-text3 text-xs">
                    <Calendar size={14} />
                    {inv.date}
                  </div>
                </td>
                <td className="px-8 py-6 text-right">
                  <span className="font-head font-bold text-white tracking-tighter text-lg">{inv.amount}</span>
                </td>
                <td className="px-8 py-6">
                  <div className="flex justify-center">
                    <StatusBadge status={inv.status} />
                  </div>
                </td>
                <td className="px-8 py-6 text-right">
                   <div className="flex items-center justify-end gap-2 outline-none">
                      <button className="p-2 text-text3 hover:text-growth transition-colors"><Send size={18} /></button>
                      <button className="p-2 text-text3 hover:text-white transition-colors"><MoreVertical size={18} /></button>
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {business.planId === 'STARTER' && (
        <div className="p-8 glass rounded-[32px] border-growth/20 bg-growth/5 text-center">
           <h4 className="font-head font-bold text-lg text-white mb-2">Professionalize your Billing</h4>
           <p className="text-text3 text-sm mb-6 max-w-lg mx-auto">Starter plans include basic receipts. Upgrade to Growth to unlock branded invoices, PDF exports, and client credit tracking.</p>
           <button className="px-8 py-3 bg-gradient-to-r from-growth to-ent rounded-2xl font-bold text-sm shadow-xl shadow-growth/20">Upgrade Now</button>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const configs: any = {
    PAID: { label: 'Settled', color: 'bg-growth text-growth' },
    SENT: { label: 'Awaiting', color: 'bg-info text-info' },
    OVERDUE: { label: 'Overdue', color: 'bg-danger text-danger' },
    DRAFT: { label: 'Draft', color: 'bg-white/20 text-text3' },
  };

  const c = configs[status];
  return (
    <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${c.color.replace(' text-', ' bg-opacity-10 text-')}`}>
      {c.label}
    </span>
  );
}

function FilterBtn({ label, active }: { label: string, active?: boolean }) {
  return (
    <button className={`
      px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all
      ${active ? 'bg-growth text-white shadow-lg shadow-growth/20' : 'bg-white/5 text-text3 hover:bg-white/10'}
    `}>
      {label}
    </button>
  );
}
