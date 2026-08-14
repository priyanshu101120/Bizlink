"use client";
import useAuth from "@/hooks/useAuth";
import { Building2, EyeOff, Lock, Store, User, Warehouse } from "lucide-react";
import { motion } from "framer-motion";
import React, { FormEvent, useState } from "react";
import { toast } from "sonner";

type Role = "WHOLESALER" | "RETAILER";

const LoginPage = ({
  defaultRole,
  defaultMode,
}: {
  defaultRole?: string;
  defaultMode?: string;
}) => {
  const { Login, SignUp } = useAuth();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<Role>(
    defaultRole === "RETAILER" ? "RETAILER" : "WHOLESALER",
  );
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isSingnUp, setisSingnUp] = useState<boolean>(
    defaultMode === "signup" || !!defaultRole,
  );
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const switchMode = (signup: boolean) => {
    setisSingnUp(signup);
    setErrorMessage("");
  };

  const handleSubmitForm = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    if (isSingnUp) {
      if (!name || !email || !password || !role) {
        setErrorMessage("Please fill all the fields");
        return;
      }
    } else if (!email || !password) {
      setErrorMessage("Please enter email and password");
      return;
    }

    try {
      if (isSingnUp) {
        await SignUp(name, email, password, role);
        switchMode(false);
        toast.success("Account created! Please login now.");
      } else {
        await Login(email, password);
      }
    } catch (error: unknown) {
      setErrorMessage(
        error instanceof Error ? error.message : "An error occurred",
      );
    }
  };

  const formFields = (
    <form onSubmit={handleSubmitForm} className="space-y-4">
      {isSingnUp && (
        <>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setRole("WHOLESALER")}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                role === "WHOLESALER"
                  ? "border-[#006989] bg-[#006989]/5"
                  : "border-gray-200 bg-gray-50"
              }`}
            >
              <Warehouse
                size={20}
                className={
                  role === "WHOLESALER" ? "text-[#006989]" : "text-gray-400"
                }
              />
              <span
                className={`text-xs font-bold uppercase ${
                  role === "WHOLESALER" ? "text-[#006989]" : "text-gray-500"
                }`}
              >
                Wholesaler
              </span>
            </button>

            <button
              type="button"
              onClick={() => setRole("RETAILER")}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                role === "RETAILER"
                  ? "border-[#006989] bg-[#006989]/5"
                  : "border-gray-200 bg-gray-50"
              }`}
            >
              <Store
                size={20}
                className={
                  role === "RETAILER" ? "text-[#006989]" : "text-gray-400"
                }
              />
              <span
                className={`text-xs font-bold uppercase ${
                  role === "RETAILER" ? "text-[#006989]" : "text-gray-500"
                }`}
              >
                Retailer
              </span>
            </button>
          </div>

          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 group-focus-within:text-[#006989]">
              <Building2 size={18} />
            </div>
            <input
              type="text"
              placeholder="Business / Full Name"
              className="w-full bg-gray-50 border-none rounded-xl py-3 pl-10 pr-4 text-gray-700 focus:ring-2 focus:ring-[#006989] outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </>
      )}

      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 group-focus-within:text-[#006989]">
          <User size={18} />
        </div>
        <input
          type="email"
          placeholder="Email Address"
          className="w-full bg-gray-50 border-none rounded-xl py-3 pl-10 pr-4 text-gray-700 focus:ring-2 focus:ring-[#006989] outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 group-focus-within:text-[#006989]">
          <Lock size={18} />
        </div>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          className="w-full bg-gray-50 border-none rounded-xl py-3 pl-10 pr-12 text-gray-700 focus:ring-2 focus:ring-[#006989] outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-4 flex items-center text-[10px] font-black text-[#006989] uppercase"
        >
          {showPassword ? <EyeOff size={16} /> : "SHOW"}
        </button>
      </div>

      <div className="pt-4">
        <button
          type="submit"
          className="w-full bg-[#006989] text-white font-bold py-4 rounded-xl shadow-lg hover:brightness-110 active:scale-[0.98] transition-all uppercase tracking-widest text-sm"
        >
          {isSingnUp ? "Register on BizLink" : "Sign In"}
        </button>
      </div>

      {errorMessage && (
        <p className="text-red-500 text-center text-xs font-bold bg-red-50 p-2 rounded-lg">
          {errorMessage}
        </p>
      )}
    </form>
  );

  const infoText = (
    <div className="relative z-10 text-center md:text-left">
      <h2 className="text-5xl font-black mb-2 tracking-tighter italic">
        BizLink
      </h2>
      <p className="text-sm font-medium opacity-90 mb-6 uppercase tracking-[0.2em]">
        Real-Time B2B Sync
      </p>
      <p className="text-xs leading-relaxed opacity-70">
        Retailer or wholesaler, BizLink keeps your inventory and orders in
        perfect harmony. Join us and experience the future of B2B commerce with
        real-time updates, seamless connections, and effortless management.
      </p>
    </div>
  );

  const switchButton = (
    <button
      type="button"
      onClick={() => switchMode(!isSingnUp)}
      className="mt-8 w-full max-w-55 mx-auto md:mx-0 border-2 border-white/60 text-white font-bold py-3 rounded-xl hover:bg-white hover:text-[#006989] active:scale-[0.98] transition-all uppercase tracking-widest text-xs"
    >
      {isSingnUp ? "Log In Instead" : "Sign Up Instead"}
    </button>
  );

  return (
    <main className="min-h-screen bg-[#f0f4f5] flex items-center justify-center p-4">
      <div className="md:hidden w-full max-w-md bg-white rounded-[30px] overflow-hidden shadow-2xl">
        <div className="relative bg-[#006989] p-10 flex flex-col justify-center text-white">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute -bottom-10 right-0 w-48 h-48 bg-white/10 rounded-full blur-xl" />
          {infoText}

          <div className="relative mt-8 flex bg-white/10 rounded-full p-1 max-w-60 mx-auto">
            <motion.div
              className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-full shadow-md"
              animate={{ left: isSingnUp ? "calc(50% + 0px)" : "4px" }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
            />
            <button
              type="button"
              onClick={() => switchMode(false)}
              className="relative z-10 flex-1 py-2.5 text-xs font-bold uppercase tracking-wider rounded-full transition-colors"
            >
              <span className={!isSingnUp ? "text-[#006989]" : "text-white/80"}>
                Log In
              </span>
            </button>
            <button
              type="button"
              onClick={() => switchMode(true)}
              className="relative z-10 flex-1 py-2.5 text-xs font-bold uppercase tracking-wider rounded-full transition-colors"
            >
              <span className={isSingnUp ? "text-[#006989]" : "text-white/80"}>
                Sign Up
              </span>
            </button>
          </div>
        </div>

        <div className="p-8">
          <header className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800">
              {isSingnUp ? "Create Account" : "Welcome Back"}
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              {isSingnUp
                ? "Register as a partner on BizLink"
                : "Login to manage your business"}
            </p>
          </header>
          {formFields}
        </div>
      </div>

      <div className="hidden md:block relative w-full max-w-4xl min-h-150 bg-white rounded-[30px] overflow-hidden shadow-2xl">
        <motion.div
          className="absolute top-0 left-0 h-full w-1/2 p-12 flex flex-col justify-center bg-white"
          animate={{ x: isSingnUp ? "100%" : "0%" }}
          transition={{ type: "spring", stiffness: 210, damping: 26 }}
        >
          <header className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800">
              {isSingnUp ? "Create Account" : "Welcome Back"}
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              {isSingnUp
                ? "Register as a partner on BizLink"
                : "Login to manage your business"}
            </p>
          </header>
          {formFields}
        </motion.div>

        <motion.div
          className={`absolute top-0 left-0 h-full w-1/2 bg-[#006989] p-10 flex flex-col justify-center text-white transition-[border-radius] duration-500 ${
            isSingnUp ? "rounded-r-[70px]" : "rounded-l-[70px]"
          }`}
          animate={{ x: isSingnUp ? "0%" : "100%" }}
          transition={{ type: "spring", stiffness: 210, damping: 26 }}
        >
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute -bottom-10 right-0 w-48 h-48 bg-white/10 rounded-full blur-xl" />
          {infoText}
          {switchButton}
        </motion.div>
      </div>
    </main>
  );
};

export default LoginPage;
