"use client";
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
  Loader2,
  Eye,
  EyeOff,
} from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { Button } from "../ui/button";

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
  const { Logout, changePassword, deleteAccount } = useAuth();
  const [open, setOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isChangingPass, setIsChangingPass] = useState(false);
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [showVisibility, setShowVisibility] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const toggleVisibility = (field: "current" | "new" | "confirm") => {
    setShowVisibility((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
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
    try {
      setIsDeleting(true);
      await deleteAccount();
    } catch (error) {
      
    } finally {
      setIsDeleting(false);
    }
  };

  
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwords.new !== passwords.confirm) {
      return toast.error("New passwords do not match!");
    }
    if (passwords.new.length < 6) {
      return toast.error("New password must be at least 6 characters.");
    }

    try {
      setIsChangingPass(true);
      await changePassword(passwords.current, passwords.new);
      setPasswords({ current: "", new: "", confirm: "" });
      setShowChangePassword(false);
    } catch (error) {
      
    } finally {
      setIsChangingPass(false);
    }
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
                  setShowChangePassword(true);
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
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setShowDetails(false);
                  setShowDeleteConfirm(true);
                }}
                className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 font-semibold py-2.5 rounded-lg hover:bg-red-100 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      )}

     
      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete your account, inventory, and connections.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 text-white hover:bg-red-600 focus:ring-red-500"
              onClick={handleDeleteAccount}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Trash2 size={18} />
              )}
              {isDeleting ? "Deleting..." : "Delete Account"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    
      {showChangePassword && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setShowChangePassword(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 bg-[#006989] text-white">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <KeyRound size={20} />
                Change Password
              </h2>
              <button
                onClick={() => setShowChangePassword(false)}
                className="p-1 rounded-lg hover:bg-white/20 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleChangePassword} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showVisibility.current ? "text" : "password"}
                    required
                    value={passwords.current}
                    onChange={(e) =>
                      setPasswords({ ...passwords, current: e.target.value })
                    }
                    className="w-full px-3 py-2 pr-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006989]/50 text-sm"
                    placeholder="Enter current password"
                  />
                  <button
                    type="button"
                    onClick={() => toggleVisibility("current")}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-[#006989] transition-colors"
                  >
                    {showVisibility.current ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showVisibility.new ? "text" : "password"}
                    required
                    value={passwords.new}
                    onChange={(e) =>
                      setPasswords({ ...passwords, new: e.target.value })
                    }
                    className="w-full px-3 py-2 pr-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006989]/50 text-sm"
                    placeholder="Min 6 characters"
                  />
                  <button
                    type="button"
                    onClick={() => toggleVisibility("new")}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-[#006989] transition-colors"
                  >
                    {showVisibility.new ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showVisibility.confirm ? "text" : "password"}
                    required
                    value={passwords.confirm}
                    onChange={(e) =>
                      setPasswords({ ...passwords, confirm: e.target.value })
                    }
                    className="w-full px-3 py-2 pr-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006989]/50 text-sm"
                    placeholder="Type new password again"
                  />
                  <button
                    type="button"
                    onClick={() => toggleVisibility("confirm")}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-[#006989] transition-colors"
                  >
                    {showVisibility.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isChangingPass}
                  className="w-full flex items-center justify-center gap-2 bg-[#006989] hover:bg-[#005570] text-white font-semibold py-2.5 rounded-lg transition-colors disabled:opacity-50"
                >
                  {isChangingPass ? <Loader2 size={18} className="animate-spin" /> : null}
                  {isChangingPass ? "Updating..." : "Update Password"}
                </button>
              </div>
            </form>
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