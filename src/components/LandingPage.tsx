"use client";
import { useState, useEffect, useRef } from "react";
import {
  Zap,
  ArrowRight,
  Store,
  Warehouse,
  X,
  RefreshCw,
  BarChart3,
  CheckCircle,
  ChevronRight,
  Globe,
  Package,
  Bell,
  Users,
  Star,
  ArrowUpRight,
  Menu,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";


const useCounter = (end: number, duration = 2000, start = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, start]);
  return count;
};

const useInView = (threshold = 0.2) => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
};


const StatCard = ({
  value,
  suffix,
  label,
  started,
}: {
  value: number;
  suffix: string;
  label: string;
  started: boolean;
}) => {
  const count = useCounter(value, 1800, started);
  return (
    <div className="text-center">
      <div className="text-4xl md:text-5xl font-black text-white tabular-nums">
        {count.toLocaleString()}
        <span className="text-[#006989]">{suffix}</span>
      </div>
      <div className="text-sm text-slate-400 mt-2 font-medium">{label}</div>
    </div>
  );
};

const ReivewCard = [
              {
                icon: Users,
                title: "Connection Network",
                desc: "Wholesalers and retailers connect directly — no middlemen, no commission.",
              },
              {
                icon: BarChart3,
                title: "Demand Analytics",
                desc: "Track which products retailers browse most to forecast demand accurately.",
              },
              {
                icon: Package,
                title: "Inventory Dashboard",
                desc: "Full inventory control — add, edit, delete products in seconds.",
              },
              {
                icon: Globe,
                title: "Role-Based Access",
                desc: "Separate dashboards for wholesalers and retailers, built for each workflow.",
              },
            ]

            const Steps =[
                {
                  step: "01",
                  title: "Sign up & pick your role",
                  desc: "Create your account as a Wholesaler or Retailer. Your dashboard is instantly configured for your workflow — inventory management for wholesalers, product discovery for retailers.",
                  icon: Users,
                },
                {
                  step: "02",
                  title: "Connect with your partners",
                  desc: "Wholesalers list their business. Retailers browse and send connection requests. Once connected, the real-time inventory feed goes live — instantly.",
                  icon: Globe,
                },
                {
                  step: "03",
                  title: "Sync in real-time, forever",
                  desc: "Every product update, stock change, or price edit by the wholesaler reflects instantly on the retailer's dashboard. No delays, no emails, no phone calls.",
                  icon: RefreshCw,
                },
              ]

const LandingPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { ref: statsRef, inView: statsInView } = useInView();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleRoleSelect = (role: "retailer" | "wholesaler") => {
    router.push(`/login?role=${role}`);
  };

  return (
    <div className="min-h-screen bg-[#080c10] text-white selection:bg-[#006989] selection:text-white overflow-x-hidden">
      
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#080c10]/90 backdrop-blur-xl border-b border-white/5" : "bg-transparent"}`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-[#006989] p-1.5 rounded-lg">
              <Zap size={18} fill="white" className="text-white" />
            </div>
            <span className="text-lg font-black tracking-tighter">BizLink</span>
           
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm text-slate-400">
            <a href="#features" className="hover:text-white transition-colors">
              Features
            </a>
            <a
              href="#howitworks"
              className="hover:text-white transition-colors"
            >
              How it works
            </a>
            <a href="#for-you" className="hover:text-white transition-colors">
              For you
            </a>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="ghost"
              className="text-slate-400 hover:text-white text-sm"
              onClick={() => setShowModal(true)}
            >
              Sign in
            </Button>
            <Button
              onClick={() => setShowModal(true)}
              className="bg-white text-[#080c10] hover:bg-slate-200 font-bold text-sm px-5 rounded-xl"
            >
              Get Started
            </Button>
          </div>

          <button
            className="md:hidden text-slate-400"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            <Menu size={22} />
          </button>
        </div>

        {mobileMenu && (
          <div className="md:hidden bg-[#0d1117] border-t border-white/5 px-6 py-4 flex flex-col gap-4">
            <a
              href="#features"
              className="text-slate-400 text-sm"
              onClick={() => setMobileMenu(false)}
            >
              Features
            </a>
            <a
              href="#howitworks"
              className="text-slate-400 text-sm"
              onClick={() => setMobileMenu(false)}
            >
              How it works
            </a>
            <Button
              onClick={() => {
                setShowModal(true);
                setMobileMenu(false);
              }}
              className="bg-[#006989] text-white w-full"
            >
              Get Started
            </Button>
          </div>
        )}
      </nav>

   
      <section className="relative pt-36 pb-28 px-6 text-center overflow-hidden">
      
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-125 bg-[#006989]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-40 left-1/4 w-75 h-75 bg-[#006989]/5 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative max-w-5xl mx-auto">
          
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-8 text-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
            </span>
            <span className="text-slate-300 text-xs font-semibold tracking-widest uppercase">
              Real-Time Sync — Now Live
            </span>
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-[88px] font-black leading-[0.92] tracking-tight mb-8">
            B2B Commerce,{" "}
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#006989] via-[#00a8cc] to-[#006989]">
                Synchronized.
              </span>
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            BizLink is the real-time inventory platform that eliminates
            communication lag between wholesalers and retailers. When stock
            changes, everyone knows — instantly.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              onClick={() => setShowModal(true)}
              className="bg-[#006989] hover:bg-[#005a75] text-white px-8 py-6 text-base font-bold rounded-xl gap-2 group shadow-lg shadow-[#006989]/25"
            >
               Get Started
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Button>
            <Button
              variant="outline"
              className="border-white/10 bg-white/5 hover:bg-white/10 text-white px-8 py-6 text-base font-semibold rounded-xl gap-2"
              onClick={() =>
                document
                  .getElementById("howitworks")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              See how it works
              <ChevronRight size={18} />
            </Button>
          </div>

         
          <div className="relative mx-auto max-w-4xl">
            <div
              className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-[#080c10] z-10 pointer-events-none"
              style={{ top: "60%" }}
            />
            <div className="bg-[#0d1117] border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
              
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-[#0a0e14]">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
                <div className="flex-1 mx-4 bg-white/5 rounded-md h-6" />
                <div className="flex items-center gap-1.5 text-xs text-green-400 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  Live
                </div>
              </div>
             
              <div className="p-6 grid grid-cols-4 gap-3">
                {[
                  { label: "Total Products", val: "248", color: "text-white" },
                  { label: "Low Stock", val: "12", color: "text-yellow-400" },
                  { label: "Out of Stock", val: "3", color: "text-red-400" },
                  { label: "Retailers", val: "18", color: "text-[#4db8d4]" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="bg-white/5 rounded-xl p-4 border border-white/5"
                  >
                    <p className="text-slate-500 text-xs mb-1">{s.label}</p>
                    <p className={`text-2xl font-black ${s.color}`}>{s.val}</p>
                  </div>
                ))}
                
                <div className="col-span-4 mt-2 bg-white/5 rounded-xl border border-white/5 overflow-hidden">
                  <div className="grid grid-cols-4 px-4 py-2 border-b border-white/5 text-xs text-slate-500 uppercase tracking-wider">
                    <span>Product</span>
                    <span>Stock</span>
                    <span>Price</span>
                    <span>Status</span>
                  </div>
                  {[
                    {
                      name: "Colgate 100g",
                      stock: 1,
                      price: "₹100",
                      status: "Low Stock",
                      sc: "text-yellow-400 bg-yellow-400/10",
                    },
                    {
                      name: "Vatika Shampoo 1L",
                      stock: 1500,
                      price: "₹150",
                      status: "In Stock",
                      sc: "text-green-400 bg-green-400/10",
                    },
                    {
                      name: "Pears 10-Pack",
                      stock: 120,
                      price: "₹480",
                      status: "In Stock",
                      sc: "text-green-400 bg-green-400/10",
                    },
                  ].map((r) => (
                    <div
                      key={r.name}
                      className="grid grid-cols-4 px-4 py-3 border-b border-white/5 text-sm items-center"
                    >
                      <span className="text-slate-200 font-medium">
                        {r.name}
                      </span>
                      <span className="text-slate-400">{r.stock}</span>
                      <span className="text-[#4db8d4] font-bold">
                        {r.price}
                      </span>
                      <span
                        className={`text-xs font-bold px-2 py-1 rounded-md w-fit ${r.sc}`}
                      >
                        {r.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      
      <section ref={statsRef} className="py-20 px-6 border-y border-white/5">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatCard
            value={5000}
            suffix="+"
            label="Businesses on waitlist"
            started={statsInView}
          />
          <StatCard
            value={99}
            suffix="ms"
            label="Avg. sync latency"
            started={statsInView}
          />
          <StatCard
            value={100}
            suffix="%"
            label="Real-time accuracy"
            started={statsInView}
          />
          <StatCard
            value={24}
            suffix="/7"
            label="Uptime monitoring"
            started={statsInView}
          />
        </div>
      </section>

     
      <section id="features" className="py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-[#006989]/20 text-[#4db8d4] border-[#006989]/30 mb-4">
              Platform Features
            </Badge>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-5">
              Everything you need,
              <br />
              <span className="text-slate-500">nothing you don&apos;t.</span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Built from the ground up for Indian B2B commerce — fast, reliable,
              and simple to use.
            </p>
          </div>

          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            
            <div className="group bg-[#0d1117] border border-white/10 rounded-2xl p-8 hover:border-[#006989]/40 transition-all duration-300 relative overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-b from-[#006989]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-12 h-12 bg-[#006989]/20 rounded-xl flex items-center justify-center mb-6">
                  <RefreshCw size={22} className="text-[#4db8d4]" />
                </div>
                <h3 className="text-xl font-bold mb-3">
                  Sub-100ms Real-Time Sync
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  Powered by Supabase Realtime. When a wholesaler updates stock,
                  every connected retailer sees it in under 100 milliseconds —
                  no refresh needed.
                </p>
                <div className="mt-6 flex items-center gap-2 text-sm text-[#4db8d4] font-semibold">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  Always live
                </div>
              </div>
            </div>

            
            <div className="group bg-[#0d1117] border border-white/10 rounded-2xl p-8 hover:border-[#006989]/40 transition-all duration-300 relative overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-br from-[#006989]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-12 h-12 bg-[#006989]/20 rounded-xl flex items-center justify-center mb-6">
                  <Bell size={22} className="text-[#4db8d4]" />
                </div>
                <h3 className="text-xl font-bold mb-3">Smart Notifications</h3>
                <p className="text-slate-400 leading-relaxed">
                  Browser push notifications when connected wholesalers add
                  products, update prices, or change stock levels. Never miss a
                  deal.
                </p>
                <div className="mt-6 flex gap-2 flex-wrap">
                  {["New Product", "Price Drop", "Low Stock"].map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-white/5 border border-white/10 px-3 py-1 rounded-full text-slate-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {ReivewCard.map((f) => (
              <div
                key={f.title}
                className="group bg-[#0d1117] border border-white/10 rounded-2xl p-6 hover:border-[#006989]/40 transition-all duration-300"
              >
                <f.icon size={22} className="text-[#4db8d4] mb-4" />
                <h4 className="font-bold mb-2">{f.title}</h4>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <section id="howitworks" className="py-28 px-6 bg-[#0d1117]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-[#006989]/20 text-[#4db8d4] border-[#006989]/30 mb-4">
              How It Works
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">
              Live in 3 steps.
            </h2>
          </div>

          <div className="relative">
            
            <div className="hidden md:block absolute left-7 top-8 bottom-8 w-px bg-linear-to-b from-[#006989] via-[#006989]/40 to-transparent" />

            <div className="space-y-8">
              {Steps.map((s, i) => (
                <div key={i} className="flex gap-8 items-start group">
                  <div className="shrink-0 w-14 h-14 bg-[#006989] rounded-full flex items-center justify-center font-black text-white z-10 group-hover:scale-110 transition-transform">
                    <s.icon size={22} />
                  </div>
                  <div className="flex-1 bg-[#080c10] border border-white/5 rounded-2xl p-6 group-hover:border-[#006989]/30 transition-all">
                    <div className="text-[#006989] text-xs font-bold tracking-widest mb-1 uppercase">
                      Step {s.step}
                    </div>
                    <h3 className="text-lg font-bold mb-2">{s.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      
      <section id="for-you" className="py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-[#006989]/20 text-[#4db8d4] border-[#006989]/30 mb-4">
              Built For You
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">
              One platform, two superpowers.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            
            <div className="bg-linear-to-br from-[#006989]/20 to-[#006989]/5 border border-[#006989]/30 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-[#006989] p-2.5 rounded-xl">
                  <Warehouse size={22} className="text-white" />
                </div>
                <div>
                  <h3 className="font-black text-xl">Wholesalers</h3>
                  <p className="text-sm text-slate-400">Manage & distribute</p>
                </div>
              </div>
              <ul className="space-y-3">
                {[
                  "Add, edit, delete products in seconds",
                  "Real-time stock level visibility",
                  "Manage retailer connections from one place",
                  "See which retailers are active",
                  "Push updates that sync across all partners instantly",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-slate-300"
                  >
                    <CheckCircle
                      size={16}
                      className="text-[#4db8d4] mt-0.5 shrink-0"
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <Button
                onClick={() => handleRoleSelect("wholesaler")}
                className="mt-8 w-full bg-[#006989] hover:bg-[#005a75] text-white font-bold rounded-xl gap-2 group"
              >
                Join as Wholesaler
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Button>
            </div>

            {/* Retailer */}
            <div className="bg-[#0d1117] border border-white/10 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-white/10 p-2.5 rounded-xl">
                  <Store size={22} className="text-slate-300" />
                </div>
                <div>
                  <h3 className="font-black text-xl">Retailers</h3>
                  <p className="text-sm text-slate-400">Discover & buy</p>
                </div>
              </div>
              <ul className="space-y-3">
                {[
                  "Browse live inventory from connected wholesalers",
                  "Instant alerts when stock changes or drops",
                  "See low stock warnings before running out",
                  "Connect with multiple wholesalers at once",
                  "Never make a call to check availability again",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-slate-300"
                  >
                    <CheckCircle
                      size={16}
                      className="text-slate-500 mt-0.5 shrink-0"
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <Button
                onClick={() => handleRoleSelect("retailer")}
                variant="outline"
                className="mt-8 w-full border-white/10 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl gap-2 group"
              >
                Join as Retailer
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Button>
            </div>
          </div>
        </div>
      </section>

    
      <section className="py-20 px-6 bg-[#0d1117] border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <Badge className="bg-amber-400/10 text-amber-400 border-amber-400/20 mb-3">
                For Investors
              </Badge>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-3">
                The B2B supply chain
                <br />
                is broken. We&apos;re fixing it.
              </h2>
              <p className="text-slate-400 max-w-md">
                ₹43 lakh crore Indian B2B market still relies on WhatsApp and
                phone calls for inventory. BizLink is the infrastructure layer
                that changes that.
              </p>
            </div>
            <div className="shrink-0 grid grid-cols-2 gap-3 text-center">
              {[
                { val: "₹43L Cr", label: "Market size" },
                { val: "5,000+", label: "Waitlist" },
                { val: "< 100ms", label: "Sync speed" },
                { val: "Beta", label: "Current stage" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="bg-white/5 border border-white/10 rounded-xl px-6 py-4"
                >
                  <div className="text-xl font-black text-[#4db8d4]">
                    {s.val}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

     
      <section className="py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-3">
              Feedback
            </h2>
            <p className="text-slate-500 text-sm"> from our users</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                name: "Rajesh Mehta",
                role: "Wholesaler, Mumbai",
                quote:
                  "Pehle retailers ko baar baar call karna padta tha stock ke liye. BizLink ne yeh problem solve kar di completely.",
                stars: 5,
              },
              {
                name: "Priya Sharma",
                role: "Retailer, Delhi",
                quote:
                  "Real-time updates are a game changer. Mujhe pata rehta hai exact kya available hai before I place an order.",
                stars: 5,
              },
              {
                name: "Amit Gupta",
                role: "Wholesaler, Bengaluru",
                quote:
                  "The dashboard is incredibly clean. It took me less than 10 minutes to list all my products and connect with 5 retailers.",
                stars: 5,
              },
            ].map((t) => (
              <div
                key={t.name}
                className="bg-[#0d1117] border border-white/10 rounded-2xl p-6 hover:border-[#006989]/30 transition-all"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className="text-amber-400 fill-amber-400"
                    />
                  ))}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  {t.quote}
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#006989]/30 flex items-center justify-center text-[#4db8d4] font-bold text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{t.name}</div>
                    <div className="text-xs text-slate-500">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <footer className="py-28 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-transparent to-[#006989]/10 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-100 bg-[#006989]/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="bg-[#006989] p-2 rounded-xl">
              <Zap size={20} fill="white" className="text-white" />
            </div>
            <span className="text-2xl font-black tracking-tighter">
              BizLink
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
            Ready to sync
            <br />
            <span className="text-[#4db8d4]">your supply chain?</span>
          </h2>
          <p className="text-slate-400 mb-10 max-w-md mx-auto">
            Join 5,000+ businesses already on the waitlist. Early access is free
            — no credit card required.
          </p>
          <Button
            onClick={() => setShowModal(true)}
            className="bg-[#006989] hover:bg-[#005a75] text-white px-10 py-6 text-lg font-bold rounded-xl gap-3 group shadow-2xl shadow-[#006989]/30"
          >
            Get Early Access — It&apos;s Free
            <ArrowUpRight
              size={20}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            />
          </Button>

          <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-600">
            <span>© 2025 BizLink. All rights reserved.</span>
            <div className="flex gap-6">
              <a href="#" className="hover:text-slate-400 transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-slate-400 transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-slate-400 transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>

      
      {showModal && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={() => setShowModal(false)}
          />
          <div className="relative w-full max-w-md bg-[#0d1117] border border-white/10 rounded-3xl shadow-2xl p-8 animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors"
            >
              <X size={22} />
            </button>

            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-[#006989] p-1.5 rounded-lg">
                  <Zap size={16} fill="white" className="text-white" />
                </div>
                <span className="font-black tracking-tighter">BizLink</span>
              </div>
              <h2 className="text-2xl font-black tracking-tight mb-1">
                Who are you?
              </h2>
              <p className="text-slate-400 text-sm">
                Select your role to get started
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => handleRoleSelect("wholesaler")}
                className="group w-full flex items-center gap-5 p-5 rounded-2xl border border-white/10 hover:border-[#006989]/60 hover:bg-[#006989]/5 transition-all text-left"
              >
                <div className="bg-[#006989]/20 p-3.5 rounded-xl group-hover:bg-[#006989] transition-colors">
                  <Warehouse
                    size={24}
                    className="text-[#4db8d4] group-hover:text-white transition-colors"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-black text-base uppercase tracking-tight">
                    Wholesaler
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Manage inventory & sync with retailers
                  </p>
                </div>
                <ChevronRight
                  size={18}
                  className="text-slate-600 group-hover:text-[#4db8d4] transition-colors"
                />
              </button>

              <button
                onClick={() => handleRoleSelect("retailer")}
                className="group w-full flex items-center gap-5 p-5 rounded-2xl border border-white/10 hover:border-[#006989]/60 hover:bg-[#006989]/5 transition-all text-left"
              >
                <div className="bg-white/5 p-3.5 rounded-xl group-hover:bg-[#006989] transition-colors">
                  <Store
                    size={24}
                    className="text-slate-400 group-hover:text-white transition-colors"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-black text-base uppercase tracking-tight">
                    Retailer
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Browse live stock & connect with wholesalers
                  </p>
                </div>
                <ChevronRight
                  size={18}
                  className="text-slate-600 group-hover:text-[#4db8d4] transition-colors"
                />
              </button>
            </div>

            <p className="text-center text-xs text-slate-600 mt-6">
              By continuing you agree to our{" "}
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors underline"
              >
                Terms of Service
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
