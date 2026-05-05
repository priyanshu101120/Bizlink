import { Connection, Retailer } from "@/hooks/useWholesaler";

type Props = {
  connections: Connection[];
  allRetailers: Retailer[];
  onConnect: (id: string) => void;
  onDisconnect: (id: string) => void;
};

const RetailerList = ({
  connections,
  allRetailers,
  onConnect,
  onDisconnect,
}: Props) => {
  const unconnectedRetailers = allRetailers.filter(
    (r) => !connections.some((c) => c.retailer_id === r.id),
  );
  return (
    <div className="space-y-3">
      {connections.length > 0 && (
        <div className="bg-white rounded-2xl border border-[#006989] overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-200">
            <p className="text-sm font-medium">
              Connected Retailers ({connections.length})
            </p>
          </div>
          {connections.map((conn) => (
            <div
              key={conn.id}
              className="flex items-center justify-between px-4 py-3 border-b last:border-0"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-medium text-sm">
                  {conn.profile.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {conn.profile.name}
                  </p>
                  <p className="text-xs text-gray-500">Connected</p>
                </div>
              </div>
              <button
                onClick={() => onDisconnect(conn.id)}
                className="text-blue-500 hover:text-red-500 text-sm transition-colors"
              >
                Disconnect
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100">
          <p className="text-sm font-medium text-gray-700">
            Connect to more retailers
          </p>
        </div>
        {unconnectedRetailers.length === 0 ? (
          <p className="text-center py-8 text-gray-400 text-sm">
            No retailers available
          </p>
        ) : (
          unconnectedRetailers.map((retailer) => (
            <div
              key={retailer.id}
              className="flex items-center justify-between px-4 py-4 border-b last:border-0"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-700 text-sm font-medium">
                  {retailer.name?.charAt(0).toUpperCase()}
                </div>
                <p className="text-sm font-medium text-gray-800">
                  {retailer.name}
                </p>
              </div>
              <button
                onClick={() => onConnect(retailer.id)}
                className="text-xs bg-[#006989] hover:brightness-110 text-white px-3 py-1.5 rounded-lg transition-colors"
              >
                Connect
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RetailerList;
