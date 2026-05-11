"use client";
import React, { useState } from "react";
import useWholesaler, { Product } from "@/hooks/useWholesaler";
import WholesalerNav from "@/components/wholeselercomponents/WholesalerNav";
import StatsGrid from "@/components/wholeselercomponents/StatsGrid";
import FormFilter from "@/components/wholeselercomponents/FormFilter";
import ProdductTable from "@/components/wholeselercomponents/productTable";
import RetailerList from "@/components/wholeselercomponents/RetailerList";
import WholesalerskeletonLoader from "@/components/WholesalerskeletonLoader";
import OverviewTab from "@/components/wholeselercomponents/OverviewTab";

const WholeSalerDashboard = () => {
  const {
    user,
    products,
    loading,
    handleAddOrUpdate,
    handleDelete,
    connections,
    allRetailers,
    connectToRetailer,
    disconnectRetailer,
  } = useWholesaler();

  const [showForm, setShowForm] = useState<boolean>(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [name, setName] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [activeTab, setActiveTab] = useState("inventory");

  const handleEditProduct = (product: Product) => {
    setEditProduct(product);
    setName(product.name);
    setQuantity(String(product.quantity));
    setPrice(String(product.price));
    setShowForm(true);
  };

  const resetForm = () => {
    setName("");
    setQuantity("");
    setPrice("");
    setEditProduct(null);
    setShowForm(false);
  };
  if (loading) return <WholesalerskeletonLoader/>

  return (
    <div className="min-h-screen bg-[#eaebed]">
      <WholesalerNav user={user} />

      <div className="mx-auto py-6">
        <StatsGrid products={products} />
        <FormFilter
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          showForm={showForm}
          resetForm={resetForm}
          name={name}
          quantity={quantity}
          price={price}
          handleAddOrUpdate={handleAddOrUpdate}
          setShowForm={setShowForm}
          editProduct={editProduct}
          setName={setName}
          setQuantity={setQuantity}
          setPrice={setPrice}
        />

        <div className="px-4 md:px-6">
  {activeTab === "overview" ? (
    <OverviewTab products={products} />          // ← add this
  ) : activeTab === "inventory" ? (
    <ProdductTable
      products={products}
      handleEditProduct={handleEditProduct}
      handleDelete={handleDelete}
    />
  ) : (
    <RetailerList
      connections={connections}
      allRetailers={allRetailers}
      onConnect={connectToRetailer}
      onDisconnect={disconnectRetailer}
    />
  )}
</div>
      </div>
    </div>
  );
};

export default WholeSalerDashboard;
