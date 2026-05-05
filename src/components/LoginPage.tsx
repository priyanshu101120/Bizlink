"use client";
import useAuth from "@/hooks/useAuth";
import { Building2, EyeOff, Lock, User } from "lucide-react";
import React, { FormEvent, useState } from "react";

const LoginPage = ({ role }: { role?: string }) => {
  const { Login, SignUp, LoginWithGoogle } = useAuth();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isSingnUp, setisSingnUp] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

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
        await SignUp(name, email, password, role as string);
        setisSingnUp(false);
        alert("BizLink account created! Please login now.");
      } else {
        await Login(email, password);
      }
    } catch (error: unknown) {
      setErrorMessage(
        error instanceof Error ? error.message : "An error occurred",
      );
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setErrorMessage("");
      await LoginWithGoogle();
    } catch (error: unknown) {
      setErrorMessage(
        error instanceof Error ? error.message : "An error occurred",
      );
    }
  };

  return (
    <main className="min-h-screen bg-[#f0f4f5] flex items-center justify-center p-4">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white rounded-[30px] overflow-hidden shadow-2xl min-h-150">
       
        <div className="relative w-full md:w-2/5 bg-[#006989] p-10 flex flex-col justify-center text-white">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute -bottom-10 right-0 w-48 h-48 bg-white/10 rounded-full blur-xl" />

          <div className="relative z-10 text-center md:text-left">
            <h2 className="text-5xl font-black mb-2 tracking-tighter italic">
              BizLink
            </h2>
            <p className="text-sm font-medium opacity-90 mb-6 uppercase tracking-[0.2em]">
              Real-Time B2B Sync
            </p>
            <p className="text-xs leading-relaxed opacity-70">
              Retailer or wholesaler, BizLink keeps your inventory and orders in perfect harmony. Join us and experience the future of B2B commerce with real-time updates, seamless connections, and effortless management.
            </p>
          </div>
        </div>

        
        <div className="w-full md:w-3/5 p-8 md:p-12 flex flex-col justify-center bg-white">
          <header className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800">
              {isSingnUp ? "Create Account" : `Welcome Back, ${role || "User"}`}
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              {isSingnUp
                ? "Register as a partner on BizLink"
                : "Login to manage your business"}
            </p>
          </header>

          <form onSubmit={handleSubmitForm} className="space-y-4">
            {isSingnUp && (
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

            {/* Divider */}
            <div className="flex items-center gap-3 py-1">
              <hr className="flex-1 border-gray-200" />
              <span className="text-xs text-gray-400 font-medium">OR</span>
              <hr className="flex-1 border-gray-200" />
            </div>

            {/* Google Button */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 border border-gray-200 bg-gray-50 rounded-xl py-3 px-4 hover:bg-gray-100 active:scale-[0.98] transition-all"
            >
              <svg viewBox="0 0 48 48" className="w-5 h-5 shrink-0">
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                />
                <path
                  fill="#4285F4"
                  d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                />
                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                />
                <path fill="none" d="M0 0h48v48H0z" />
              </svg>
              <span className="text-sm font-semibold text-gray-600">
                {isSingnUp ? "Sign up with Google" : "Continue with Google"}
              </span>
            </button>

            {errorMessage && (
              <p className="text-red-500 text-center text-xs font-bold bg-red-50 p-2 rounded-lg">
                {errorMessage}
              </p>
            )}

            <p className="text-center text-sm text-gray-500 mt-6 font-medium">
              {isSingnUp ? "Already a partner? " : "Want to join BizLink? "}
              <button
                type="button"
                onClick={() => {
                  setisSingnUp(!isSingnUp);
                  setErrorMessage("");
                }}
                className="text-[#006989] font-bold underline underline-offset-4"
              >
                {isSingnUp ? "Log In" : "Register Now"}
              </button>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
