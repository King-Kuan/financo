/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Search, 
  ShoppingCart, 
  Plus, 
  Minus, 
  X, 
  CheckCircle2, 
  Smartphone,
  Banknote,
  Navigation
} from 'lucide-react';
import { Business, Product, SaleItem } from '../types';

const MOCK_PRODUCTS: Product[] = [
  { id: 'p1', name: 'UHT Milk 1L', sku: 'MLK-001', category: 'Dairy', price: 1200, costPrice: 900, quantity: 45, minStockAlert: 10, unit: 'pcs' },
  { id: 'p2', name: 'Bakers Flour 25kg', sku: 'FLR-025', category: 'General', price: 28000, costPrice: 22000, quantity: 12, minStockAlert: 5, unit: 'bag' },
  { id: 'p3', name: 'Cooking Oil 5L', sku: 'OIL-005', category: 'Kitchen', price: 8500, costPrice: 7000, quantity: 20, minStockAlert: 5, unit: 'bottle' },
  { id: 'p4', name: 'Sugar 1kg', sku: 'SGR-001', category: 'General', price: 1500, costPrice: 1200, quantity: 80, minStockAlert: 15, unit: 'pcs' },
  { id: 'p5', name: 'Basmati Rice 5kg', sku: 'RCE-005', category: 'Kitchen', price: 12500, costPrice: 10000, quantity: 30, minStockAlert: 10, unit: 'bag' },
];

export default function SalesPOS({ business }: { business: Business }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState<SaleItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<'CASH' | 'MOMO' | 'CARD' | 'CREDIT'>('CASH');
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);

  const filteredProducts = MOCK_PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.productId === product.id);
      if (existing) {
        return prev.map(item => 
          item.productId === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { productId: product.id, name: product.name, qty: 1, price: product.price }];
    });
  };

  const updateQty = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.productId === id) {
        const newQty = Math.max(0, item.qty + delta);
        return { ...item, qty: newQty };
      }
      return item;
    }).filter(item => item.qty > 0));
  };

  const total = cart.reduce((acc, item) => acc + (item.qty * item.price), 0);

  const completeSale = () => {
    if (cart.length === 0) return;
    // In production, this would hit the API / Firestore
    setSuccessModalOpen(true);
    setTimeout(() => {
      setSuccessModalOpen(false);
      setCart([]);
    }, 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-[calc(100vh-160px)]">
      {/* Product Selection */}
      <div className="lg:col-span-8 flex flex-col gap-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text3" size={20} />
          <input 
            type="text" 
            placeholder="Search products by name or SKU..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 glass rounded-2xl border-white/5 outline-none focus:border-growth/50 transition-all text-sm"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 flex-1">
          {filteredProducts.map((product) => (
            <button
              key={product.id}
              onClick={() => addToCart(product)}
              className="glass rounded-2xl p-4 border-white/5 hover:border-growth/30 hover:bg-white/10 transition-all text-left flex flex-col group active:scale-95"
            >
              <div className="w-10 h-10 rounded-xl bg-bg-soft flex items-center justify-center mb-4 text-growth group-hover:scale-110 transition-transform">
                <Box size={20} />
              </div>
              <p className="font-bold text-sm mb-1 line-clamp-1">{product.name}</p>
              <p className="text-[10px] text-text3 font-mono font-bold mb-4 uppercase">{product.sku}</p>
              <p className="mt-auto font-head font-bold text-white">{product.price.toLocaleString()} <span className="text-[10px] font-normal text-text3">RWF</span></p>
            </button>
          ))}
        </div>
      </div>

      {/* Cart & Checkout */}
      <div className="lg:col-span-4 flex flex-col glass rounded-[40px] border-white/5 overflow-hidden shadow-2xl relative">
        <div className="p-6 border-b border-white/5 bg-white/5">
          <h3 className="font-head font-bold flex items-center gap-2">
            <ShoppingCart size={18} className="text-growth" />
            Current Order
          </h3>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-30">
              <ShoppingCart size={48} strokeWidth={1} className="mb-4" />
              <p className="text-sm font-medium">Cart is empty</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.productId} className="flex items-center justify-between gap-4 p-3 rounded-2xl bg-white/5 border border-white/5">
                <div className="flex-1">
                  <p className="text-xs font-bold leading-tight">{item.name}</p>
                  <p className="text-[10px] text-text3 mt-1 font-mono">{item.price.toLocaleString()} RWF</p>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => updateQty(item.productId, -1)} className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 active:scale-90 transition-all"><Minus size={12} /></button>
                  <span className="text-xs font-mono font-bold w-4 text-center">{item.qty}</span>
                  <button onClick={() => updateQty(item.productId, 1)} className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 active:scale-90 transition-all"><Plus size={12} /></button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-6 bg-white/5 border-t border-white/5 space-y-6">
          {/* Payment selector */}
          <div className="grid grid-cols-4 gap-2">
            <PaymentTab active={paymentMethod === 'CASH'} onClick={() => setPaymentMethod('CASH')} icon={Banknote} label="Cash" />
            <PaymentTab active={paymentMethod === 'MOMO'} onClick={() => setPaymentMethod('MOMO')} icon={Smartphone} label="MoMo" />
            <PaymentTab active={paymentMethod === 'CARD'} onClick={() => setPaymentMethod('CARD')} icon={Plus} label="Card" />
            <PaymentTab active={paymentMethod === 'CREDIT'} onClick={() => setPaymentMethod('CREDIT')} icon={Navigation} label="Kaka" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-text3 text-xs">
              <span>Subtotal</span>
              <span className="font-mono">{total.toLocaleString()} RWF</span>
            </div>
            <div className="flex justify-between text-white font-head font-bold text-lg pt-1">
              <span>Total Due</span>
              <span className="text-growth">{total.toLocaleString()} RWF</span>
            </div>
          </div>

          <button 
            onClick={completeSale}
            disabled={cart.length === 0}
            className={`
              w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-xl
              ${cart.length > 0 ? 'bg-growth text-white shadow-growth/20 hover:scale-[1.02] active:scale-[0.98]' : 'bg-white/5 text-text3 grayscale cursor-not-allowed'}
            `}
          >
            Confirm Sale
          </button>
        </div>

        {isSuccessModalOpen && (
          <div className="absolute inset-0 z-10 glass backdrop-blur-3xl flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in duration-300">
             <div className="w-20 h-20 bg-growth/20 text-growth rounded-[32px] flex items-center justify-center mb-6 ring-8 ring-growth/5">
                <CheckCircle2 size={40} />
             </div>
             <h4 className="text-2xl font-head font-bold text-white mb-2 tracking-tight">Sale Confirmed</h4>
             <p className="text-text3 text-sm mb-6">Stock level updated and receipt generated in PDF.</p>
             <div className="font-mono text-growth font-bold text-lg">{total.toLocaleString()} RWF</div>
          </div>
        )}
      </div>
    </div>
  );
}

function PaymentTab({ active, onClick, icon: Icon, label }: any) {
  return (
    <button 
      onClick={onClick}
      className={`
        flex flex-col items-center gap-2 p-2.5 rounded-xl border transition-all active:scale-95
        ${active ? 'bg-growth/20 border-growth text-growth' : 'bg-white/5 border-white/5 text-text3 hover:bg-white/10'}
      `}
    >
      <Icon size={16} />
      <span className="text-[8px] font-bold uppercase tracking-widest leading-none">{label}</span>
    </button>
  );
}

function Box({ size, className }: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  );
}
