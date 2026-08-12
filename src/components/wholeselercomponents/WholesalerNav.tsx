import useAuth from "@/hooks/useAuth";
import {
  Zap,
  ChevronDown,
  User as UserIcon,
  KeyRound,
  LogOut,
  X,
  Trash2,
  Mail,
  Phone,
  BadgeInfo,
} from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string; 
  role: "RETAILER" | "WHOLESALER";
}

type Props = {
  user: User | null;
};

const WholesalerNav = ({ user }: Props) => {
  const { Logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await Logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleDeleteAccount = async () => {
   
  };

  return (
    <>
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
        </div>

        
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="flex items-center gap-2 bg-[#eaebed] text-[#006989] font-bold py-1.5 px-3 md:py-2 md:px-4 rounded-lg text-sm md:text-base transition-transform active:scale-95"
          >
            <span className="max-w-25 truncate">{user?.name || "Menu"}</span>
            <ChevronDown
              size={16}
              className={`transition-transform ${open ? "rotate-180" : ""}`}
            />
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
              <button
                onClick={() => {
                  setOpen(false);
                  setShowDetails(true);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <UserIcon size={18} className="text-[#006989]" />
                <span className="text-sm font-medium">Personal Details</span>
              </button>

              <button
                onClick={() => {
                  setOpen(false);
                  
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 hover:bg-gray-50 transition-colors border-t border-gray-100"
              >
                <KeyRound size={18} className="text-[#006989]" />
                <span className="text-sm font-medium">Change Password</span>
              </button>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-left text-red-600 hover:bg-red-50 transition-colors border-t border-gray-100"
              >
                <LogOut size={18} />
                <span className="text-sm font-medium">Logout</span>
              </button>
            </div>
          )}
        </div>
      </nav>

      
      {showDetails && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setShowDetails(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            
            <div className="flex items-center justify-between px-5 py-4 bg-[#006989] text-white">
              <h2 className="text-lg font-bold">Personal Details</h2>
              <button
                onClick={() => setShowDetails(false)}
                className="p-1 rounded-lg hover:bg-white/20 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            
            <div className="p-5 space-y-4">
              <DetailRow
                icon={<UserIcon size={18} className="text-[#006989]" />}
                label="Name"
                value={user?.name || "—"}
              />
              <DetailRow
                icon={<Mail size={18} className="text-[#006989]" />}
                label="Email"
                value={user?.email || "—"}
              />
              <DetailRow
                icon={<Phone size={18} className="text-[#006989]" />}
                label="Phone"
                value={user?.phone || "Not added"}
              />
              <DetailRow
                icon={<BadgeInfo size={18} className="text-[#006989]" />}
                label="Role"
                value={user?.role || "—"}
              />
            </div>

            
            <div className="px-5 py-4 border-t border-gray-100">
              <button
                onClick={handleDeleteAccount}
                className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 font-semibold py-2.5 rounded-lg hover:bg-red-100 transition-colors"
              >
                <Trash2 size={18} />
                Delete Account
              </button>
              {/* <p className="text-[11px] text-gray-400 text-center mt-2">
                Account delete hone ke baad data permanently hat jayega.
              </p> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
const DetailRow = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="flex items-center gap-3">
    <div className="bg-gray-50 p-2 rounded-lg">{icon}</div>
    <div>
      <p className="text-[11px] text-gray-400 uppercase font-medium">{label}</p>
      <p className="text-sm font-semibold text-gray-800 break-all">{value}</p>
    </div>
  </div>
);

export default WholesalerNav;
