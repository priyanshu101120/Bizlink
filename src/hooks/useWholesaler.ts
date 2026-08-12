"use client";
import { useCallback, useEffect, useState } from "react";
import api from "@/lib/api";
import { toast } from "sonner";
import useAuth from "./useAuth";

export interface Product {
  id: string;
  name: string;
  price: number | null;
  quantity: number;
  createdAt: string;
  wholesalerId: string;
}

export interface Connection {
  id: string;
  retailerId: string;
  wholesalerId: string;
  retailer: { id: string; name: string };
}

export interface Retailer {
  id: string;
  name: string;
  email: string;
  role: string;
}

const useWholesaler = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [allRetailers, setAllRetailers] = useState<Retailer[]>([]);
  const [loading, setLoading] = useState(true);

  const refetchProducts = useCallback(async () => {
    const { data } = await api.get("/products/mine");
    setProducts(data.products);
  }, []);

  const refetchConnections = useCallback(async () => {
    const { data } = await api.get("/connections/mine");
    setConnections(data.connections);
  }, []);

  const fetchAllRetailers = useCallback(async () => {
    const { data } = await api.get("/users/retailers");
    setAllRetailers(data.retailers);
  }, []);

  useEffect(() => {
    if (!user?.id) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(false);
      return;
    }
    const loadAll = async () => {
      setLoading(true);
      await Promise.all([refetchProducts(), refetchConnections(), fetchAllRetailers()]);
      setLoading(false);
    };
    loadAll();
  }, [user?.id, refetchProducts, refetchConnections, fetchAllRetailers]);

  const handleAddOrUpdate = async (
    name: string,
    price: string,
    quantity: number,
    editProduct: Product | null
  ) => {
    if (!name || !price || !quantity) return toast.error("Please fill all fields");
    try {
      if (editProduct) {
        await api.put(`/products/${editProduct.id}`, {
          name,
          price: parseFloat(price),
          quantity: Number(quantity),
        });
        toast.success("Product updated successfully");
      } else {
        await api.post("/products", {
          name,
          price: parseFloat(price),
          quantity: Number(quantity),
        });
        toast.success("Product added successfully");
      }
      await refetchProducts();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/products/${id}`);
      toast.success("Product deleted successfully");
      await refetchProducts();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to delete product");
    }
  };

  const connectToRetailer = async (retailerId: string) => {
    try {
      await api.post("/connections", { targetUserId: retailerId });
      toast.success("Retailer connected successfully");
      await refetchConnections();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to connect");
    }
  };

  const disconnectRetailer = async (connectionId: string) => {
    try {
      await api.delete(`/connections/${connectionId}`);
      toast.success("Retailer disconnected successfully");
      await refetchConnections();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to disconnect");
    }
  };

  return {
    user,
    products,
    loading,
    connections,
    allRetailers,
    refetchProducts,
    handleAddOrUpdate,
    handleDelete,
    connectToRetailer,
    disconnectRetailer,
  };
};

export default useWholesaler;