"use client";
import { useCallback, useEffect, useState } from "react";
import api from "@/lib/api";
import { getSocket } from "@/lib/socket";
import { toast } from "sonner";
import useAuth from "./useAuth";

export interface Profile {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface Connection {
  id: string;
  wholesalerId: string;
  retailerId: string;
  wholesaler: { id: string; name: string; email: string };
}

export interface Product {
  id: string;
  name: string;
  price: number | null;
  quantity: number;
  createdAt: string;
  wholesalerId: string;
  wholesaler?: { name: string };
}

export interface AppNotification {
  id: number;
  message: string;
  type: "warning" | "danger" | "success";
  read: boolean;
  time: string;
}

const useRetailer = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [allWholesalers, setAllWholesalers] = useState<Profile[]>([]);
  const [notification, setNotification] = useState<AppNotification[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchConnections = useCallback(async () => {
    const { data } = await api.get("/connections/mine");
    setConnections(data.connections);
    return data.connections as Connection[];
  }, []);

  const fetchProducts = useCallback(async () => {
    const { data } = await api.get("/products/connected");
    setProducts(data.products);
  }, []);

  const fetchAllWholesalers = useCallback(async () => {
    const { data } = await api.get("/users/wholesalers");
    setAllWholesalers(data.wholesalers);
  }, []);

  useEffect(() => {
    if (!user?.id) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(false);
      return;
    }
    const loadAll = async () => {
      setLoading(true);
      await Promise.all([fetchConnections(), fetchProducts(), fetchAllWholesalers()]);
      setLoading(false);
    };
    loadAll();
  }, [user?.id, fetchConnections, fetchProducts, fetchAllWholesalers]);

 
  useEffect(() => {
    if (!user?.id || user.role !== "RETAILER") return;

    const socket = getSocket();
    socket.connect();

    const joinRooms = async () => {
      const conns = await fetchConnections();
      const wholesalerIds = conns.map((c) => c.wholesalerId);
      if (wholesalerIds.length > 0) {
        socket.emit("join-wholesaler-rooms", wholesalerIds);
      }
    };
    joinRooms();

    const handleProductUpdate = (product: Product) => {
      setProducts((prev) => {
        const exists = prev.some((p) => p.id === product.id);
        if (exists) return prev.map((p) => (p.id === product.id ? { ...p, ...product } : p));
        return [product, ...prev];
      });
      toast.success(`"${product.name}" was updated`);
    };

    const handleLowStock = (data: { productId: string; name: string; quantity: number }) => {
      const note: AppNotification = {
        id: Date.now(),
        message: `Low stock: "${data.name}" (${data.quantity} left)`,
        type: data.quantity === 0 ? "danger" : "warning",
        read: false,
        time: new Date().toISOString(),
      };
      setNotification((prev) => [...prev, note]);
      toast.warning(note.message);
    };

    socket.on("product:update", handleProductUpdate);
    socket.on("product:low-stock", handleLowStock);

    return () => {
      socket.off("product:update", handleProductUpdate);
      socket.off("product:low-stock", handleLowStock);
    };
  }, [user?.id, user?.role, fetchConnections]);

  const connectToWholesaler = async (wholesalerId: string) => {
    try {
      await api.post("/connections", { targetUserId: wholesalerId });
      toast.success("Connected successfully");
      const conns = await fetchConnections();
      await fetchProducts();
      getSocket().emit("join-wholesaler-rooms", conns.map((c) => c.wholesalerId));
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
    allWholesalers,
    notification,
    setNotification,
    loading,
    connectToWholesaler,
    disconnectWholesaler,
  };
};

export default useRetailer;