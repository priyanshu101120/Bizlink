import useAuth from "@/hooks/useAuth";
import { User } from "@supabase/supabase-js";
import { Zap } from "lucide-react";
import React from "react";

type Props = {
  user: User | null; 
};

const WholesalerNav = ({ user }: Props) => {
  const { Logout } = useAuth();

  const handleLogout = async () => {
    try {
      await Logout();
    } catch (error) {
      console.error("Logout failed:", error);
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      alert("Failed to logout. Please try again." + errorMessage);
    }
  };
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between py-4 px-4 md:px-6 bg-[#006989]">
      <div className="flex items-center gap-2 text-white">
        <div className="flex items-center">
          <div className="bg-[#006989] p-2 rounded-xl text-white shadow-lg shadow-blue-900/20">
            <Zap size={24} className="md:w-8 md:h-8" fill="white" />
          </div>
        </div>
        <span className="text-xl md:text-3xl font-black tracking-tighter text-white">
          BizLink
        </span>
        <span className="hidden sm:inline-block ml-2 text-[10px] bg-blue-100 text-[#006989] px-2 py-1 rounded-full font-medium uppercase">
          wholesaler
        </span>
        <span className="hidden sm:inline-block ml-2 text-[10px] bg-blue-100 text-[#006989] px-2 py-1 rounded-full font-medium uppercase">
          {user?.user_metadata?.name}
        </span>
      </div>
      <button
        onClick={handleLogout}
        className="bg-[#eaebed] text-[#006989] font-bold py-1.5 px-3 md:py-2 md:px-4 rounded-lg text-sm md:text-base transition-transform active:scale-95"
      >
        Logout
      </button>
    </nav>
  );
};

export default WholesalerNav;
