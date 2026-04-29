/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  FileText, 
  Users, 
  Settings, 
  LogOut,
  Menu,
  X,
  Bell,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Sparkles,
  TrendingUp,
  Box
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Business, UserRole } from './types';
import Dashboard from './components/Dashboard';
import SalesPOS from './components/SalesPOS';
import Inventory from './components/Inventory';
import AdminConsole from './components/AdminConsole';
import AIAdvisor from './components/AIAdvisor';
import Reports from './components/Reports';
import Invoices from './components/Invoices';
import Landing from './components/Landing';
import Auth from './components/Auth';
import { auth } from './lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { authService } from './services/authService';

type View = 'dashboard' | 'sales' | 'inventory' | 'invoices' | 'team' | 'settings' | 'admin' | 'advisor' | 'reports';

type AppState = 'LANDING' | 'AUTH' | 'MAIN_APP' | 'LOADING';

export default function App() {
  const [appState, setAppState] = useState<AppState>('LOADING');
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  
  // Simulated business state
  const [business, setBusiness] = useState<Business | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const profile = await authService.getUserProfile(user.uid);
          if (profile) {
            setRole(profile.role);
            if (profile.businessId) {
              const biz = await authService.getBusiness(profile.businessId);
              setBusiness(biz);
            }
            setAppState('MAIN_APP');
          } else {
            setAppState('AUTH');
          }
        } catch (error) {
          console.error("Auth sync error:", error);
          setAppState('AUTH');
        }
      } else {
        setAppState('LANDING');
      }
    });

    return () => unsubscribe();
  }, []);

  const navItems = [
    { id: 'dashboard' as View, label: 'Overview', icon: LayoutDashboard },
    { id: 'sales' as View, label: 'Sales & POS', icon: ShoppingCart },
    { id: 'inventory' as View, label: 'Inventory', icon: Box, growth: true },
    { id: 'invoices' as View, label: 'Invoices', icon: FileText, growth: true },
    { id: 'reports' as View, label: 'Reports', icon: TrendingUp, growth: true },
    { id: 'advisor' as View, label: 'AI Advisor', icon: Sparkles, entOnly: true },
    { id: 'admin' as View, label: 'Palace Admin', icon: CheckCircle2, adminOnly: true },
  ];

  const handleAuthComplete = (userRole: UserRole) => {
    // Session state is handled by onAuthStateChanged
  };

  if (appState === 'LOADING') {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-growth/20 border-t-growth rounded-full animate-spin"></div>
      </div>
    );
  }

  if (appState === 'LANDING') {
    return <Landing onGetStarted={() => setAppState('AUTH')} />;
  }

  if (appState === 'AUTH') {
    return <Auth onAuthComplete={handleAuthComplete} onBack={() => setAppState('LANDING')} />;
  }

  if (business?.status === 'PENDING') {
    return <PendingScreen business={business} />;
  }

  return (
    <div className="min-h-screen bg-bg text-text font-sans">
      {/* Mobile Topbar */}
      <div className="lg:hidden h-14 border-b border-white/5 flex items-center justify-between px-4 glass sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-growth to-ent flex items-center justify-center font-head font-bold text-white text-xs">F</div>
          <span className="font-head font-bold tracking-tight text-sm">Financo</span>
        </div>
        <button onClick={() => setSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`
          fixed lg:relative inset-y-0 left-0 z-40 w-64 border-r border-white/5 bg-bg transform transition-transform duration-300 lg:translate-x-0
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="h-full flex flex-col p-6">
            <div className="hidden lg:flex items-center gap-3 mb-10">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-growth to-ent flex items-center justify-center font-head font-bold text-white text-lg lg:shadow-xl lg:shadow-growth/20">F</div>
              <span className="font-head font-extrabold text-2xl tracking-tighter">Financo</span>
            </div>

            <nav className="flex-1 space-y-1">
              {navItems.map((item) => {
                const isActive = currentView === item.id;
                const isLocked = (item.growth && business?.planId === 'STARTER') || 
                                 (item.entOnly && business?.planId !== 'ENTERPRISE');
                if (item.adminOnly && role !== 'SUPERADMIN' && role !== 'OWNER') return null; // Simplified admin check
                
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (!isLocked) {
                        setCurrentView(item.id);
                        if (window.innerWidth < 1024) setSidebarOpen(false);
                      }
                    }}
                    className={`
                      w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group
                      ${isActive ? 'bg-white/10 text-white' : 'text-text2 hover:bg-white/5 hover:text-white'}
                      ${isLocked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon size={20} className={isActive ? 'text-growth' : 'text-text3 group-hover:text-text2'} />
                      <span className="font-medium text-sm">{item.label}</span>
                    </div>
                    {isLocked && <div className="text-[10px] bg-ent/20 text-ent px-1.5 py-0.5 rounded-md font-bold">PRO</div>}
                  </button>
                );
              })}
            </nav>

            <div className="mt-auto pt-6 border-t border-white/5 space-y-1">
              <button 
                onClick={() => setCurrentView('settings')}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-text3 hover:bg-white/5 hover:text-white transition-colors"
              >
                <Settings size={20} />
                <span className="font-medium text-sm">Settings</span>
              </button>
              <button 
                onClick={async () => {
                  try {
                    await authService.signOut();
                    setBusiness(null);
                    setRole(null);
                  } catch (error) {
                    console.error("Sign out failed:", error);
                  }
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-danger/70 hover:bg-danger/10 hover:text-danger transition-colors"
              >
                <LogOut size={20} />
                <span className="font-medium text-sm">Sign Out</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 min-w-0">
          <header className="hidden lg:flex h-20 border-b border-white/5 items-center justify-between px-8 bg-bg/50 backdrop-blur-md sticky top-0 z-30">
            <div>
              <h1 className="font-head font-bold text-xl tracking-tight capitalize">
                {currentView.replace('-', ' ')}
              </h1>
              <p className="text-text3 text-xs">Logged in as <span className="text-text2">{business?.ownerName}</span></p>
            </div>
            
            <div className="flex items-center gap-6">
              <button className="p-2 text-text3 hover:text-white transition-colors relative">
                <MessageSquare size={20} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-growth rounded-full border-2 border-bg"></span>
              </button>
              <button className="p-2 text-text3 hover:text-white transition-colors">
                <Bell size={20} />
              </button>
              <div className="h-8 w-[1px] bg-white/5"></div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-bold leading-none">{business?.name}</p>
                  <p className="text-[10px] text-growth font-bold uppercase tracking-wider mt-1">{business?.planId} Plan</p>
                </div>
                <div className="w-10 h-10 rounded-full glass flex items-center justify-center p-1 overflow-hidden ring-2 ring-white/5">
                   <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${business?.name}`} alt="logo" className="w-full h-full rounded-full" />
                </div>
              </div>
            </div>
          </header>

          <div className="p-4 lg:p-8">
             <AnimatePresence mode="wait">
                <motion.div
                  key={currentView}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {currentView === 'dashboard' && business && <Dashboard business={business} />}
                  {currentView === 'sales' && business && <SalesPOS business={business} />}
                  {currentView === 'inventory' && business && <Inventory business={business} />}
                  {currentView === 'reports' && business && <Reports business={business} />}
                  {currentView === 'invoices' && business && <Invoices business={business} />}
                  {currentView === 'advisor' && business && <AIAdvisor business={business} />}
                  {currentView === 'admin' && <AdminConsole />}
                  
                  {(currentView === 'team' || currentView === 'settings') && (
                    <div className="glass rounded-3xl p-20 text-center">
                       <AlertCircle size={48} className="mx-auto text-text4 mb-4" />
                       <h2 className="text-2xl font-head font-bold mb-2">Module Under Construction</h2>
                       <p className="text-text3">The {currentView} module is part of the next development phase in the Financo Roadmap.</p>
                    </div>
                  )}
                </motion.div>
             </AnimatePresence>
          </div>
        </main>
      </div>
      
      {/* Mobile Sidebar Backdrop */}
      {isSidebarOpen && window.innerWidth < 1024 && (
        <div className="fixed inset-0 bg-black/60 z-30" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  );
}

function PendingScreen({ business }: { business: Business }) {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-6">
      <div className="max-w-md w-full glass rounded-[40px] p-10 text-center border-white/5 shadow-2xl">
        <div className="w-20 h-20 bg-gradient-to-br from-warn to-orange-600 rounded-[32px] flex items-center justify-center mx-auto mb-8 shadow-xl shadow-warn/20">
          <AlertCircle size={40} className="text-white" />
        </div>
        <h1 className="font-head text-3xl font-bold mb-4 tracking-tight">Activation Pending</h1>
        <p className="text-text2 mb-10 leading-relaxed">
          Your registration for <span className="text-white font-bold">{business.name}</span> is received. To activate your account:
        </p>
        
        <div className="space-y-4 mb-10 text-left">
          <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
            <p className="text-[10px] text-text3 font-bold uppercase tracking-widest mb-1">MOMO NUMBER</p>
            <p className="text-xl font-mono font-bold text-growth">+250 792 612 139</p>
          </div>
          <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
            <p className="text-[10px] text-text3 font-bold uppercase tracking-widest mb-1">AMOUNT DUE</p>
            <p className="text-xl font-mono font-bold text-white">30,000 RWF</p>
          </div>
        </div>

        <button className="w-full py-4 bg-[#25D366] text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-green-500/20">
          <MessageSquare size={20} />
          Confirm on WhatsApp
        </button>
        
        <p className="text-text4 text-[10px] mt-8 uppercase tracking-widest font-bold">The Palace Tech House</p>
      </div>
    </div>
  );
}
