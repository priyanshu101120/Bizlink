"use client";
import supabase from "@/supabase/supabase";
import { User } from "@supabase/supabase-js";
import { useCallback, useEffect, useState } from "react";

export interface Profile {
  id: string;
  name: string;
  email?: string;
  role: string;
}

export interface Connection {
  id: string;
  wholesaler_id: string;
  retailer_id: string;
  profile: {
    id: string;
    name: string;
  };
}
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  created_at: string;
  quantity: number;
  wholesaler_id: string;
  profile: {
    name: string;
  };
}
export interface AppNotification {
  id: number;
  message: string;
  type: "warning" | "danger" | "success";
  read: boolean;
  time: string;
}

const useRetailer = () => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [allWholesalers, setAllWholesalers] = useState<Profile[]>([]);
  const [notification, setNotification] = useState<AppNotification[]>([]);
  const [loading, setLoading] = useState(false);

  const sendBrowserNotification = useCallback((message: string) => {
    if (Notification.permission === "granted") {
      new Notification("BizLink", {
        body: message,
        icon: "/logo.png",
      });
    }
  }, []);

  useEffect(() => {
    const loadUser = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user ?? null);
    };
    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);
  const fetchProducts = useCallback(
    async (currentConnections: Connection[]) => {
      const wholesalerIds = currentConnections.map((c) => c.wholesaler_id);
      if (wholesalerIds.length === 0) {
        setProducts([]);
        return;
      }
      const { data } = await supabase
        .from("products")
        .select("*, profile:wholesaler_id(name)")
        .in("wholesaler_id", wholesalerIds)
        .order("created_at", { ascending: false });
      if (data) setProducts(data as Product[]);
    },
    [],
  );
  const fetchConnections = useCallback(async () => {
    if (!user) return;
    const { data } = await supabase
      .from("connections")
      .select("*, profile:wholesaler_id (id,name)")
      .eq("retailer_id", user.id);
    if (data) {
      setConnections(data as Connection[]);
      await fetchProducts(data as Connection[]);
    }
  }, [user, fetchProducts]);

  const fetchProfile = useCallback(async () => {
    if (!user?.id) return;
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();
    if (error) {
      console.log("Error fetching profile", error.message);
      return;
    }
    setProfile(data);
  }, [user]);

  useEffect(() => {
    if (!user?.id) return;
    const fetchAllWholesalers = async () => {
      const { data } = await supabase
        .from("profiles")
        .select("id,name,role")
        .eq("role", "wholesaler");
      if (data) setAllWholesalers(data as Profile[]);
    };
    const loadData = async () => {
      setLoading(true);
      await fetchProfile();
      await fetchAllWholesalers();
      await fetchConnections();
      setLoading(false);
    };
    loadData();
  }, [user?.id, fetchConnections, fetchProfile]);

  
  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission();
    }
  }, []);


  useEffect(() => {
    if (!user?.id) return;

    const connectionChannel = supabase
      .channel("retailer-connections")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "connections",
          filter: `retailer_id=eq.${user.id}`,
        },
        () => {
          fetchConnections();
          setNotification((prev) => [
            ...prev,
            {
              id: Date.now(),
              message: "Ek naya wholesaler ne connect kiya!",
              type: "success",
              read: false,
              time: new Date().toISOString(),
            },
          ]);
          sendBrowserNotification("Ek naya wholesaler ne connect kiya!");
        },
      )
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "connections",
          filter: `retailer_id=eq.${user.id}`,
        },
        () => {
          fetchConnections();
          setNotification((prev) => [
            ...prev,
            {
              id: Date.now(),
              message: "Ek wholesaler ne disconnect kar dia.",
              type: "danger",
              read: false,
              time: new Date().toISOString(),
            },
          ]);
          sendBrowserNotification("Ek wholesaler ne disconnect kar dia.");
        },
      )
      .subscribe();

    const productChannel = supabase
      .channel("retailer-products")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "products",
        },
        (payload) => {
          const isConnected = connections.some(
            (c) => c.wholesaler_id === payload.new.wholesaler_id,
          );
          if (!isConnected) return;

          fetchProducts(connections); 
          setNotification((prev) => [
            ...prev,
            {
              id: Date.now(),
              message: `Naya product available: "${payload.new.name}"`,
              type: "success",
              read: false,
              time: new Date().toISOString(),
            },
          ]);
          sendBrowserNotification(
            `Naya product available: "${payload.new.name}"`,
          );
        },
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "products",
        },
        (payload) => {
          const isConnected = connections.some(
            (c) => c.wholesaler_id === payload.new.wholesaler_id,
          );
          if (!isConnected) return;

          fetchProducts(connections);
          setNotification((prev) => [
            ...prev,
            {
              id: Date.now(),
              message: `Product update hua: "${payload.new.name}"`,
              type: "warning",
              read: false,
              time: new Date().toISOString(),
            },
          ]);
          sendBrowserNotification(`Product update hua: "${payload.new.name}"`);
        },
      )
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "products",
        },
        () => {
          fetchProducts(connections);
        },
      )
      .subscribe();
    return () => {
      supabase.removeChannel(connectionChannel);
      supabase.removeChannel(productChannel);
    };
  }, [
    user?.id,
    connections,
    fetchConnections,
    fetchProducts,
    sendBrowserNotification,
  ]);

  const disconnectWholesaler = async (connectionId: string) => {
    const { error } = await supabase
      .from("connections")
      .delete()
      .eq("id", connectionId);
    if (error)
      return alert("Failed to disconnect. Please try again." + error.message);
    await fetchConnections();
  };

  const connectToWholesaler = async (wholesalerId: string) => {
    const alreadyConnected = connections.some(
      (c) => c.wholesaler_id === wholesalerId,
    );
    if (alreadyConnected) return alert("Already connected to this wholesaler");
    if (!user) return alert("User not found. Please login again.");
    const { error } = await supabase.from("connections").insert({
      wholesaler_id: wholesalerId,
      retailer_id: user.id,
    });
    if (error)
      return alert("Failed to connect. Please try again." + error.message);
    await fetchConnections();
  };

  return {
    user,
    profile,
    loading,
    products,
    connections,
    notification,
    fetchProfile,
    allWholesalers,
    setNotification,
    connectToWholesaler,
    disconnectWholesaler,
  };
};

export default useRetailer;
