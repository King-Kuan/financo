/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  MoreVertical, 
  AlertTriangle, 
  ChevronRight,
  PackagePlus,
  Box as BoxIcon,
  TrendingDown
} from 'lucide-react';
import { Business } from '../types';

const INITIAL_STOCK = [
  { id: 'p1', name: 'UHT Milk 1L', sku: 'MLK-001', category: 'Dairy', price: 1200, costPrice: 900, quantity: 4, minStockAlert: 10, unit: 'pcs' },
  { id: 'p2', name: 'Bakers Flour 25kg', sku: 'FLR-025', category: 'General', price: 28000, costPrice: 22000, quantity: 12, minStockAlert: 5, unit: 'bag' },
  { id: 'p3', name: 'Cooking Oil 5L', sku: 'OIL-005', category: 'Kitchen', price: 8500, costPrice: 7000, quantity: 2, minStockAlert: 5, unit: 'bottle' },
  { id: 'p4', name: 'Sugar 1kg', sku: 'SGR-001', category: 'General', price: 1500, costPrice: 1200, quantity: 80, minStockAlert: 15, unit: 'pcs' },
  { id: 'p5', name: 'Basmati Rice 5kg', sku: 'RCE-005', category: 'Kitchen', price: 12500, costPrice: 10000, quantity: 30, minStockAlert: 10, unit: 'bag' },
];

export default function Inventory({ business }: { business: Business }) {
  const [products] = useState(INITIAL_STOCK);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="row items-center gap-4 flex-1">
           <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text3" size={20} />
            <input 
              type="text" 
              placeholder="Filter inventory..." 
              className="w-full pl-12 pr-4 py-3 glass rounded-2xl border-white/5 outline-none focus:border-growth/50 transition-all text-sm"
            />
          </div>
          <button className="p-3 bg-white/5 border border-white/5 rounded-2xl text-text2 hover:text-white transition-colors">
            <Filter size={20} />
          </button>
        </div>

        <div className="flex gap-2">
           <button className="px-5 py-3 glass border-white/5 rounded-2xl flex items-center gap-2 text-sm font-bold hover:bg-white/10 transition-colors">
             <PackagePlus size={18} className="text-text3 text-growth" />
             Stock Load
           </button>
           <button className="px-5 py-3 bg-growth text-white rounded-2xl flex items-center gap-2 text-sm font-bold shadow-lg shadow-growth/20 hover:scale-105 active:scale-95 transition-all">
             <Plus size={18} />
             Add Product
           </button>
        </div>
      </div>

      <div className="glass rounded-[40px] border-white/5 overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-white/5 border-b border-white/5">
              <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-text3">Product Detail</th>
              <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-text3">Category</th>
              <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-text3 text-right">In Stock</th>
              <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-text3 text-right">Selling Price</th>
              <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-text3 text-center">Status</th>
              <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-text3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-white/5 transition-colors group">
                <td className="px-8 py-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-bg-soft flex items-center justify-center text-growth/50 group-hover:text-growth transition-colors">
                       <BoxIcon size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold">{p.name}</p>
                      <p className="text-[10px] font-mono font-bold text-text4 mt-1 uppercase tracking-tighter">{p.sku}</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-4">
                  <span className="text-xs font-medium text-text2">{p.category}</span>
                </td>
                <td className="px-8 py-4 text-right">
                  <span className={`font-mono text-sm font-bold ${p.quantity <= p.minStockAlert ? 'text-danger' : 'text-white'}`}>
                    {p.quantity} <span className="text-[10px] opacity-40 italic font-normal uppercase tracking-normal">{p.unit}</span>
                  </span>
                </td>
                <td className="px-8 py-4 text-right">
                  <span className="font-mono text-sm font-bold text-white tracking-tighter">
                    {p.price.toLocaleString()}
                  </span>
                </td>
                <td className="px-8 py-4">
                  <div className="flex justify-center">
                    {p.quantity <= p.minStockAlert ? (
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-danger/10 text-danger text-[9px] font-black uppercase tracking-widest border border-danger/10 shadow-sm animate-pulse">
                         <AlertTriangle size={10} /> Low Stock
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-growth/10 text-growth text-[9px] font-black uppercase tracking-widest border border-growth/10">
                         Normal
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-8 py-4 text-right">
                   <button className="p-2 text-text3 hover:text-white transition-colors">
                     <MoreVertical size={20} />
                   </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Feature Highlight for Growth/Enterprise */}
      {business.planId === 'STARTER' && (
        <div className="bg-gradient-to-r from-bg-soft to-bg border border-ent/30 rounded-3xl p-8 flex items-center justify-between shadow-2xl shadow-ent/10 overflow-hidden relative group">
           <div className="absolute right-0 top-0-translate-y-1/2 translate-x-1/2 w-40 h-40 bg-ent/20 rounded-full blur-3xl"></div>
           <div className="flex items-center gap-6 relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-ent/20 flex items-center justify-center text-ent group-hover:scale-110 transition-transform">
                <TrendingDown size={32} />
              </div>
              <div>
                <h4 className="font-head font-bold text-xl">Unlock Production Tracking</h4>
                <p className="text-text3 text-sm max-w-sm mt-1">Upgrade to Enterprise to track Bill of Materials (BOM) and raw material conversion.</p>
              </div>
           </div>
           <button className="relative z-10 px-6 py-3 bg-ent text-white font-bold rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-lg shadow-ent/20">
             Upgrade to Enterprise
           </button>
        </div>
      )}
    </div>
  );
}


function Box({ size, className }: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21 8l-9-5-9 5v8l9 5 9-5V8z" />
      <path d="M12 3v18" />
      <path d="M3 8l9 5 9-5" />
    </svg>
  );
}
