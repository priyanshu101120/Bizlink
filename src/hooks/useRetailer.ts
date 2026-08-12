"use client";
import { useCallback, useEffect, useState } from "react";
import api from "@/lib/api";
import { toast } from "sonner";
import useAuth from "./useAuth";

export interface Connection {
  id: string;
  wholesalerId: string;
  retailerId: string;
  wholesaler: { id: string; name: string };
}

export interface Product {
  id: string;
  name: string;
  price: number | null;
  quantity: number;
  createdAt: string;
  wholesalerId: string;
}

const useRetailer = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchConnections = useCallback(async () => {
    const { data } = await api.get("/connections/mine");
    setConnections(data.connections);
  }, []);

  const fetchProducts = useCallback(async () => {
    const { data } = await api.get("/products/connected");
    setProducts(data.products);
  }, []);

  useEffect(() => {
    if (!user?.id) return;
    const loadAll = async () => {
      setLoading(true);
      await fetchConnections();
      await fetchProducts();
      setLoading(false);
    };
    loadAll();
  }, [user?.id, fetchConnections, fetchProducts]);

  const connectToWholesaler = async (wholesalerId: string) => {
    try {
      await api.post("/connections", { wholesalerId });
      toast.success("Connected successfully");
      await fetchConnections();
      await fetchProducts();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to connect");
    }
  };

  const disconnectWholesaler = async (connectionId: string) => {
    try {
      await api.delete(`/connections/${connectionId}`);
      toast.success("Disconnected successfully");
      await fetchConnections();
      await fetchProducts();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to disconnect");
    }
  };

  return {
    user,
    products,
    connections,
    loading,
    connectToWholesaler,
    disconnectWholesaler,
  };
};

export default useRetailer;