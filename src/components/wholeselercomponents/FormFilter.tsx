import React, { Dispatch, SetStateAction } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Product } from "@/hooks/useWholesaler";

type Props = {
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
  showForm: boolean;
  setShowForm: (val: boolean) => void;
  editProduct: Product | null;
  name: string;
  setName: (val: string) => void;
  quantity: string;
  setQuantity: (val: string) => void;
  price: string;
  setPrice: (val: string) => void;
  handleAddOrUpdate: (
    name: string,
    price: string,
    quantity: number,
    editProduct: Props["editProduct"],
  ) => Promise<void>;
  resetForm: () => void;
};

const FormFilter = ({
  activeTab,
  setActiveTab,
  showForm,
  setShowForm,
  editProduct,
  name,
  setName,
  quantity,
  setQuantity,
  price,
  setPrice,
  handleAddOrUpdate,
  resetForm,
}: Props) => {
  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 px-4 md:px-6 gap-4">
        <div className="flex bg-slate-200/50 p-1 rounded-lg">
          <Button
            variant={activeTab === "inventory" ? "default" : "ghost"}
            className={activeTab === "inventory" ? "bg-[#006989]" : ""}
            onClick={() => setActiveTab("inventory")}
          >
            Inventory
          </Button>
          <Button
            variant={activeTab === "Retailers" ? "default" : "ghost"}
            className={activeTab === "Retailers" ? "bg-[#006989]" : ""}
            onClick={() => setActiveTab("Retailers")}
          >
            Retailers
          </Button>
        </div>
        <Button
          onClick={() => setShowForm(true)}
          className="w-full sm:w-auto bg-[#006989] hover:brightness-110 text-[#eaebed] font-bold py-2.5 px-6 rounded-xl shadow-lg shadow-blue-900/10 transition-all active:scale-95"
        >
          + Add New Product
        </Button>
      </div>

      {showForm && (
        <div className="bg-white border border-[#006989] rounded-2xl p-5 md:p-6 mx-4 md:mx-6 mb-8 shadow-xl animate-in fade-in slide-in-from-top-4 duration-300">
          <h3 className="font-bold text-gray-800 mb-4 text-lg">
            {editProduct ? "Edit Product Details" : "Enter New Product"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">
                Product Name
              </label>
              <Input
                placeholder="Search..."
                className="border border-[#006989] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006989] "
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">
                Quantity
              </label>
              <Input
                placeholder="0"
                className="border border-[#006989] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006989] "
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">
                Price (₹)
              </label>
              <Input
                placeholder="0.00"
                className="border border-[#006989] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006989] "
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3">
            <Button
              onClick={() => setShowForm(false)}
              className="w-full sm:w-auto bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold py-2.5 px-6 rounded-xl transition-colors"
            >
              Cancel
            </Button>
            <Button
              onClick={async () => {
                await handleAddOrUpdate(
                  name,
                  price,
                  Number(quantity),
                  editProduct,
                );
                resetForm();
              }}
              className="w-full sm:w-auto bg-[#006989] hover:brightness-110 text-[#eaebed] font-bold py-2.5 px-8 rounded-xl shadow-md transition-all active:scale-95"
            >
              {editProduct ? "Update Changes" : "Save Product"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormFilter;
