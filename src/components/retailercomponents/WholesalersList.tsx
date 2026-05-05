import { Card } from "@/components/ui/card";
import type { Connection, Profile } from "@/hooks/useRetailer";

type Props = {
  connections: Connection[];
  filteredWholesalers: Profile[];
  onConnect: (id: string) => void;
  onDisconnect: (id: string) => void;
};;

export default function WholesalersList({
  connections, filteredWholesalers, onConnect, onDisconnect
}: Props) {
  return (
    <Card className="border border-[#006989] shadow-sm p-4 space-y-3">
      
      {connections.length > 0 && (
        <div className="bg-white rounded-2xl border border-[#006989] overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-200">
            <p className="text-sm font-medium">Connected wholesalers ({connections.length})</p>
          </div>
          {connections.map((conn) => (
            <div key={conn.id}
              className="flex items-center justify-between px-4 py-3 border-b border-gray-100 last:border-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-medium text-sm">
                  {conn.profile.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">{conn.profile.name}</p>
                  <p className="text-xs text-gray-500">Connected</p>
                </div>
              </div>
              <button onClick={() => onDisconnect(conn.id)}
                className="text-blue-500 hover:text-red-500 text-sm">
                Disconnect
              </button>
            </div>
          ))}
        </div>
      )}

      
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100">
          <p className="text-sm font-medium text-gray-700">Connect to more wholesalers</p>
        </div>
        {filteredWholesalers.length === 0 ? (
          <p className="text-center py-8 text-gray-400 text-sm">No wholesalers available</p>
        ) : (
          filteredWholesalers.map((w) => (
            <div key={w.id}
              className="flex items-center justify-between px-4 py-4 border-b border-gray-50 last:border-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 text-sm font-medium">
                  {w.name?.charAt(0).toUpperCase()}
                </div>
                <p className="text-sm font-medium text-gray-800">{w.name}</p>
              </div>
              <button onClick={() => onConnect(w.id)}
                className="text-xs bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-lg transition-colors">
                Connect
              </button>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}