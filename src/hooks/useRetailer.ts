"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import api from "@/lib/api";
import { getSocket } from "@/lib/socket";
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
  const joinedRoomsRef = useRef<Set<string>>(new Set());

  const fetchConnections = useCallback(async () => {
    const { data } = await api.get("/connections/mine");
    setConnections(data.connections);
    return data.connections as Connection[];
  }, []);

  const fetchProducts = useCallback(async () => {
    const { data } = await api.get("/products/connected");
    setProducts(data.products);
  }, []);

  useEffect(() => {
    if (!user?.id) {
      setLoading(false);
      return;
    }
    const loadAll = async () => {
      setLoading(true);
      await fetchConnections();
      await fetchProducts();
      setLoading(false);
    };
    loadAll();
  }, [user?.id, fetchConnections, fetchProducts]);

  // Realtime — socket connect + rooms join + live listeners
  useEffect(() => {
    if (!user?.id || user.role !== "RETAILER") return;

    const socket = getSocket();
    if (!socket.connected) socket.connect();

    const joinRooms = () => {
      const ids = connections.map((c) => c.wholesalerId);
      const newIds = ids.filter((id) => !joinedRoomsRef.current.has(id));
      if (newIds.length > 0) {
        socket.emit("join-wholesaler-rooms", newIds);
        newIds.forEach((id) => joinedRoomsRef.current.add(id));
      }
    };

    if (socket.connected) joinRooms();
    socket.on("connect", joinRooms);

    const handleUpdate = (product: Product) => {
      setProducts((prev) => {
        const exists = prev.some((p) => p.id === product.id);
        return exists
          ? prev.map((p) => (p.id === product.id ? product : p))
          : [product, ...prev];
      });
    };

    const handleLowStock = (data: { productId: string; name: string; quantity: number }) => {
      toast.warning(`Low stock: "${data.name}" — only ${data.quantity} left`);
    };

    socket.on("product:update", handleUpdate);
    socket.on("product:low-stock", handleLowStock);

    return () => {
      socket.off("connect", joinRooms);
      socket.off("product:update", handleUpdate);
      socket.off("product:low-stock", handleLowStock);
    };
  }, [user?.id, user?.role, connections]);

  const connectToWholesaler = async (wholesalerId: string) => {
    try {
      await api.post("/connections", { targetUserId: wholesalerId });
      toast.success("Connected successfully");
      await fetchConnections();
      await fetchProducts();
      const socket = getSocket();
      if (socket.connected) {
        socket.emit("join-wholesaler-rooms", [wholesalerId]);
        joinedRoomsRef.current.add(wholesalerId);
      }
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