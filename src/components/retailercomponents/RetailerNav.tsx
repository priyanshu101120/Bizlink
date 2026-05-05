import { Zap, LogOut } from "lucide-react";
import type { AppNotification, Profile } from "@/hooks/useRetailer";
import { Dispatch, SetStateAction } from "react";

type Props = {
  profile: Profile | null;
  notification: AppNotification[];

  showNotification: boolean;
  setNotification: Dispatch<SetStateAction<AppNotification[]>>;
  setShowNotification: Dispatch<SetStateAction<boolean>>;
  onLogout: () => void;
};

export default function RetailerNav({
  profile,
  notification,
  setNotification,
  showNotification,
  setShowNotification,
  onLogout,
}: Props) {
  const unreadedNotifications = notification.filter((n) => !n.read).length;

  const markNotificationsAsRead = () => {
    setNotification((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between py-4 px-4 md:px-6 bg-[#006989]">
      <div className="flex items-center gap-2 text-white">
        <Zap size={32} fill="white" />
        <span className="text-2xl font-black tracking-tighter">BizLink</span>
        <span className="ml-2 text-xs bg-blue-100 text-[#006989] px-2 py-1 rounded-full hidden sm:inline">
          Retailer
        </span>
        <span className="ml-2 text-xs bg-blue-100 text-[#006989] px-2 py-1 rounded-full hidden sm:inline">
          {profile?.name}
        </span>
      </div>

      <div className="flex gap-2 md:gap-4">
        <div className="relative">
          <button
            onClick={() => {
              setShowNotification(!showNotification);
              markNotificationsAsRead();
            }}
            className="relative p-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-2.405A2.032 2.032 0 0118 13V9a6 6 0 10-12 0v4c0 .386-.149.735-.405 1.05L4 17h5m6 0a3 3 0 11-6 0h6z"
              />
            </svg>
            {unreadedNotifications > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {unreadedNotifications}
              </span>
            )}
          </button>

          {showNotification && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border z-50">
              <div className="px-4 py-3 border-b flex justify-between">
                <p className="font-semibold text-gray-800">Notifications</p>
                <button
                  onClick={() => setNotification([])}
                  className="text-xs text-gray-400 hover:text-red-500"
                >
                  Clear all
                </button>
              </div>
              {notification.length === 0 ? (
                <p className="text-center py-8 text-gray-400 text-sm">
                  No notifications
                </p>
              ) : (
                <div className="max-h-72 overflow-y-auto">
                  {notification
                    .slice()
                    .reverse()
                    .map((n) => (
                      <div
                        key={n.id}
                        className={`px-4 py-3 border-b last:border-0 ${!n.read ? "bg-yellow-50" : ""}`}
                      >
                        <p
                          className={`text-sm font-medium ${n.type === "danger" ? "text-red-600" : "text-yellow-700"}`}
                        >
                          {n.type === "danger" ? "🚨" : "⚠️"} {n.message}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">{n.time}</p>
                      </div>
                    ))}
                </div>
              )}
            </div>
          )}
        </div>

        <button
          onClick={onLogout}
          className="bg-[#eaebed] text-[#006989] font-bold py-2 px-3 rounded-lg"
        >
          <LogOut size={18} />
        </button>
      </div>
    </nav>
  );
}
