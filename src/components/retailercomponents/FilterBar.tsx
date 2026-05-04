import React from 'react'
import { Button } from '../ui/button'
import { Search } from 'lucide-react'
import { Input } from '../ui/input'
import type { Product, Connection } from "@/hooks/useRetailer";
import { Dispatch, SetStateAction } from "react";

type Props = {
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  connections: Connection[];
  products: Product[];
  selectedWholesalerId: string | null;
  setSelectedWholesalerId: Dispatch<SetStateAction<string | null>>;
};

const FilterBar = ({ activeTab, setActiveTab, searchQuery, setSearchQuery, connections, products, selectedWholesalerId, setSelectedWholesalerId }: Props) => {
  return (
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
          <div className="flex bg-slate-200/50 p-1 rounded-lg">
            <Button 
              variant={activeTab === "inventory" ? "default" : "ghost"}
              className={activeTab === "inventory" ? "bg-[#006989]" : ""}
              onClick={() => setActiveTab("inventory")}
            >
              Inventory
            </Button>
            <Button 
              variant={activeTab === "wholesalers" ? "default" : "ghost"}
              className={activeTab === "wholesalers" ? "bg-[#006989]" : ""}
              onClick={() => setActiveTab("wholesalers")}
            >
              Wholesalers
            </Button>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Search..." 
              className="pl-10 border border-[#006989] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006989] "
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
{activeTab === "inventory" && connections.length > 0 && (
  <div className="flex items-center gap-2 ml-auto">
    <button
      onClick={() => setSelectedWholesalerId(null)}
      className={`text-xs px-3 py-1.5 rounded-full border transition-all font-medium ${
        selectedWholesalerId === null
          ? "bg-[#006989] text-white border-[#006989]"
          : "bg-white text-gray-500 border-gray-300 hover:border-[#006989]"
      }`}
    >
      All
    </button>
    
    <div className="flex items-center -space-x-2">
      {connections.map((conn : { wholesaler_id: string; profile?: { name?: string } }) => {
        const isActive = selectedWholesalerId === conn.wholesaler_id;
        const productCount = products.filter(
          (p) => p.wholesaler_id === conn.wholesaler_id
        ).length;

        return (
          <div key={conn.wholesaler_id} className="relative group">
            <button
              onClick={() =>
                setSelectedWholesalerId((prev : string | null) =>
                  prev === conn.wholesaler_id ? null : conn.wholesaler_id
                )
              }
              className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-200 ${
                isActive
                  ? "border-[#006989] ring-2 ring-[#006989]/40 scale-110 z-10 bg-[#006989] text-white"
                  : "border-white bg-blue-100 text-[#006989] hover:scale-105 hover:border-[#006989]"
              }`}
              style={{ position: "relative" }}
            >
              {conn.profile?.name?.charAt(0).toUpperCase()}
            </button>

            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex flex-col items-center z-50 pointer-events-none">
              <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap shadow-xl">
                <p className="font-semibold">{conn.profile?.name}</p>
                <p className="text-gray-300">{productCount} products</p>
              </div>
              <div className="w-2 h-2 bg-gray-900 rotate-45 -mt-1" />
            </div>
          </div>
        );
      })}
    </div>

    {selectedWholesalerId && (
      <span className="text-xs text-[#006989] font-medium bg-blue-50 px-2 py-1 rounded-full border border-[#006989]/30">
        {connections.find((c : { wholesaler_id: string; profile?: { name?: string } }) => c.wholesaler_id === selectedWholesalerId)?.profile?.name}
      </span>
    )}
  </div>
)}
        </div>

  )
}

export default FilterBar