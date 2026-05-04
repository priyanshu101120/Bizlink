"use client";
import React, { useMemo, useState } from "react";
import useRetailer from "@/hooks/useRetailer";
import useAuth from "@/hooks/useAuth";
import StatsGrid from "@/components/retailercomponents/StatsGrid";
import FilterBar from "@/components/retailercomponents/FilterBar";
import InventoryTable from "@/components/retailercomponents/InventoryTable";
import WholesalersList from "@/components/retailercomponents/WholesalersList";
import RetailerNav from "@/components/retailercomponents/RetailerNav";
import RetailerSkeleton from "@/components/ReatilerSkeleton";

const RetailerDashboard = () => {
  const {
    profile,
    loading,
    products,
    connections,
    allWholesalers,
    notification,
    setNotification,
    connectToWholesaler,
    disconnectWholesaler,
  } = useRetailer();
  const { Logout } = useAuth();
  const [showNotification, setShowNotification] = useState(false);
  const [activeTab, setActiveTab] = useState("inventory");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedWholesalerId, setSelectedWholesalerId] = useState<
    string | null
  >(null);

  const displayedProducts = useMemo(() => {
    let baseProducts = products;

    if (selectedWholesalerId) {
      baseProducts = baseProducts.filter(
        (p) => p.wholesaler_id === selectedWholesalerId,
      );
    }
    if (searchQuery) {
      baseProducts = baseProducts.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }
    return baseProducts;
  }, [selectedWholesalerId, products, searchQuery]);

  const filteredWholesalers = allWholesalers.filter(
    (w) =>
      w.name.includes(searchQuery.toLowerCase()) &&
      !connections.some((c) => c.wholesaler_id === w.id),
  );

  const handleLogout = async () => {
    try {
      await Logout();
    } catch (error) {
      console.error("Logout failed:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      alert("Failed to logout. Please try again." + errorMessage);
    }
  };

  if (loading) return <RetailerSkeleton />;

  return (
    <div className="min-h-screen bg-[#eaebed]">
      <RetailerNav
        profile={profile}
        notification={notification}
        setNotification={setNotification}
        showNotification={showNotification}
        setShowNotification={setShowNotification}
        onLogout={handleLogout}
      />
      <div className="max-w-7xl mx-auto p-6">
        <StatsGrid connections={connections} products={products} />
        <FilterBar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          connections={connections}
          products={products}
          selectedWholesalerId={selectedWholesalerId}
          setSelectedWholesalerId={setSelectedWholesalerId}
        />
        {activeTab === "inventory" ? (
          <InventoryTable products={displayedProducts} />
        ) : (
          <WholesalersList
            connections={connections}
            filteredWholesalers={filteredWholesalers}
            onConnect={connectToWholesaler}
            onDisconnect={disconnectWholesaler}
          />
        )}
      </div>
    </div>
  );
};

export default RetailerDashboard;
