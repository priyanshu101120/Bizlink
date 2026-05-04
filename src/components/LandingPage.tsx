'use client';
import { useState } from "react";
import { 
  Zap, ArrowRight, Store, Warehouse, X, 
  ShoppingBag, Gift, CreditCard, Gauge, 
  FileText, TrendingUp 
} from 'lucide-react';
import { useRouter } from "next/navigation";


const LandingPage = () => {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

   const handleRoleSelect = (role: "retailer" | "wholesaler") => {
    router.push(`/login?role=${role}`);
  };

  return (
    <div className="min-h-screen bg-[#eaebed] font-sans text-slate-800 selection:bg-[#006989] selection:text-white">
      
      {/* --- Main Hero Section --- */}
      <main className="relative px-6 pt-16 pb-24 md:px-16 max-w-7xl mx-auto flex flex-col items-center text-center">
        
        {/* Integrated Logo */}
        <div className="flex items-center gap-2 mb-12">
          <div className="bg-[#006989] p-2 rounded-xl text-white shadow-lg shadow-blue-900/20">
            <Zap size={32} fill="white" />
          </div>
          <span className="text-3xl font-black tracking-tighter text-[#006989]">BizLink</span>
        </div>

        <div className="max-w-4xl">
          {/* Live Status Badge */}
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm mb-8 border border-gray-100">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 italic">
              Live: Real-Time Sync in Action
            </span>
          </div>

          <h1 className="text-5xl md:text-8xl font-black text-gray-900 leading-[0.95] mb-8 tracking-tight">
            The Future of <span className="text-[#006989]">B2B</span> Real-Time Sync.
          </h1>
          
          <p className="text-lg md:text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            Eliminate communication gaps. BizLink synchronizes inventory between wholesalers and retailers in milliseconds. Pure speed, zero friction.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setShowModal(true)}
              className="bg-[#006989] text-white px-10 py-5 rounded-2xl font-bold flex items-center justify-center gap-3 group shadow-2xl shadow-blue-900/30 hover:-translate-y-1 transition-all"
            >
              Get Started <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="bg-white border-2 border-gray-200 text-gray-700 px-10 py-5 rounded-2xl font-bold hover:bg-gray-100 transition-all">
              Partner Login
            </button>
          </div>
        </div>
      </main>

      {/* --- Value Proposition Grid --- */}
      <section className="px-6 py-24 bg-white rounded-t-[4rem] shadow-[0_-20px_50px_rgba(0,0,0,0.03)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">One Platform, Endless Growth.</h2>
            <p className="text-gray-400 font-medium">Streamlined features for modern B2B commerce.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Real-time Sync */}
            <div className="p-8 rounded-4xl bg-[#eaebed]/40 border border-transparent hover:border-[#006989]/20 transition-all group">
              <div className="text-[#006989] mb-6 group-hover:scale-110 transition-transform"><Gauge size={44} /></div>
              <h3 className="text-xl font-bold mb-3">Ultra-Low Latency</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Experience zero-lag updates. When a wholesaler updates stock, the retailer sees it instantly across the network.</p>
            </div>

            {/* Direct Buy */}
            <div className="p-8 rounded-4xl bg-[#eaebed]/40 border border-transparent hover:border-[#006989]/20 transition-all group">
              <div className="text-[#006989] mb-6 group-hover:scale-110 transition-transform"><ShoppingBag size={44} /></div>
              <h3 className="text-xl font-bold mb-3">Direct Procurement</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Skip the back-and-forth. Retailers can purchase inventory directly through the live dashboard with one click.</p>
            </div>

            {/* Free Samples */}
            <div className="p-8 rounded-4xl bg-[#eaebed]/40 border border-transparent hover:border-[#006989]/20 transition-all group">
              <div className="text-[#006989] mb-6 group-hover:scale-110 transition-transform"><Gift size={44} /></div>
              <h3 className="text-xl font-bold mb-3">Sample Requests</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Build trust before bulk buying. Order free samples directly from wholesalers to verify product quality.</p>
            </div>

            {/* Subscriptions */}
            <div className="p-8 rounded-4xl bg-[#eaebed]/40 border border-transparent hover:border-[#006989]/20 transition-all group">
              <div className="text-[#006989] mb-6 group-hover:scale-110 transition-transform"><CreditCard size={44} /></div>
              <h3 className="text-xl font-bold mb-3">Tiered Subscriptions</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Flexible monthly plans for wholesalers including priority listing, advanced analytics, and unlimited SKU storage.</p>
            </div>

            {/* Smart Analytics */}
            <div className="p-8 rounded-4xl bg-[#eaebed]/40 border border-transparent hover:border-[#006989]/20 transition-all group">
              <div className="text-[#006989] mb-6 group-hover:scale-110 transition-transform"><TrendingUp size={44} /></div>
              <h3 className="text-xl font-bold mb-3">Demand Forecasting</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Data-driven insights for wholesalers to understand market trends and what retailers are searching for.</p>
            </div>

            {/* Auto-Invoicing */}
            <div className="p-8 rounded-4xl bg-[#eaebed]/40 border border-transparent hover:border-[#006989]/20 transition-all group">
              <div className="text-[#006989] mb-6 group-hover:scale-110 transition-transform"><FileText size={44} /></div>
              <h3 className="text-xl font-bold mb-3">Automated Logistics</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Instant GST-compliant invoicing and digital ledgers. BizLink handles the paperwork while you handle the sales.</p>
            </div>

          </div>
        </div>
      </section>

      {/* --- Footer CTA --- */}
      <footer className="bg-[#006989] py-24 px-6 text-center text-white">
        <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">Ready to scale?</h2>
        <p className="mb-12 opacity-80 max-w-lg mx-auto uppercase tracking-widest text-xs font-bold">
          Join 5,000+ businesses bridging the gap with BizLink.
        </p>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-[#eaebed] text-[#006989] px-12 py-5 rounded-2xl font-black text-lg hover:scale-105 transition-transform shadow-2xl shadow-black/20"
        >
          Get Started For Free
        </button>
      </footer>

      {/* --- ROLE SELECTION MODAL --- */}
      {showModal && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setShowModal(false)} />
          <div className="relative w-full max-w-lg bg-white rounded-[3rem] shadow-2xl p-8 md:p-14 animate-in fade-in zoom-in duration-300">
            <button onClick={() => setShowModal(false)} className="absolute top-10 right-10 text-gray-300 hover:text-gray-900 transition-colors">
              <X size={28} />
            </button>

            <div className="text-center mb-10">
              <h2 className="text-4xl font-black text-gray-900 mb-2 tracking-tighter italic">Identify Yourself</h2>
              <p className="text-gray-400 font-medium">Select your business type to proceed</p>
            </div>

            <div className="space-y-4">
              <button 
                onClick={() => handleRoleSelect("wholesaler")}
                className="group w-full flex items-center gap-6 p-6 rounded-4xl border-2 border-gray-100 hover:border-[#006989] hover:bg-[#006989]/5 transition-all text-left"
              >
                <div className="bg-[#eaebed] p-5 rounded-2xl group-hover:bg-[#006989] group-hover:text-white transition-colors">
                  <Warehouse size={32} />
                </div>
                <div>
                  <h3 className="font-black text-xl text-gray-800 uppercase tracking-tight">Wholesaler</h3>
                  <p className="text-xs text-gray-400 font-medium">Manage warehouse & sync inventory</p>
                </div>
              </button>

              <button 
                onClick={() => handleRoleSelect("retailer")}
                className="group w-full flex items-center gap-6 p-6 rounded-4xl border-2 border-gray-100 hover:border-[#006989] hover:bg-[#006989]/5 transition-all text-left"
              >
                <div className="bg-[#eaebed] p-5 rounded-2xl group-hover:bg-[#006989] group-hover:text-white transition-colors">
                  <Store size={32} />
                </div>
                <div>
                  <h3 className="font-black text-xl text-gray-800 uppercase tracking-tight">Retailer</h3>
                  <p className="text-xs text-gray-400 font-medium">Browse live stock & buy directly</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;