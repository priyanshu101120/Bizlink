import { useCallback, useEffect, useState } from "react";
import supabase from "../supabase/supabase";
import { User } from "@supabase/supabase-js";

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
export interface Retailer {
  id: string;
  name: string;
  email?: string;
  role: string;
}

export interface Connection {
  id: string;
  retailer_id: string;
  wholesaler_id: string;
  profile: {
    id: string;
    name: string;
  };
}

const useWholesaler = () => {
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]); // ← add
  const [allRetailers, setAllRetailers] = useState<Retailer[]>([]);

  const refetchConnections = useCallback(async () => {
    if (!user?.id) return;
    const { data } = await supabase
      .from("connections")
      .select("*, profile:retailer_id(id, name)")
      .eq("wholesaler_id", user.id);
    if (data) setConnections(data as Connection[]);
  }, [user]);

  useEffect(() => {
    const loadUser = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user ?? null);
    };
    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) =>
      setUser(session?.user ?? null),
    );
    return () => subscription.unsubscribe();
  }, []);
  
  useEffect(() => {
    if (!user?.id) return;
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("wholesaler_id", user.id)
        .order("created_at", { ascending: false });
      if (!error && data) setProducts(data as Product[]);
    };
    const fetchConnections = async (userId: string) => {
      const { data } = await supabase
        .from("connections")
        .select("*, profile:retailer_id(id, name)")
        .eq("wholesaler_id", userId);
      if (data) setConnections(data as Connection[]);
    };

    const fetchAllRetailers = async () => {
      const { data } = await supabase
        .from("profiles")
        .select("id, name, role")
        .eq("role", "retailer");
      if (data) setAllRetailers(data as Retailer[]);
    };
    fetchProducts();
    fetchConnections(user.id);
    fetchAllRetailers();
  }, [user]);

  const refetchProducts = async (userId: string) => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("wholesaler_id", userId)
      .order("created_at", { ascending: false });
    if (!error && data) setProducts(data as Product[]);
  };

  const handleAddOrUpdate = async (
    name: string,
    price: string,
    quantity: number,
    editProduct: Product | null,
  ) => {
    if (!name || !price || !quantity) return alert("Please fill all fields");
    if (!user) return alert("User not found");
    if (editProduct) {
      const { error } = await supabase
        .from("products")
        .update({
          name,
          price: parseFloat(price),
          quantity: Number(quantity),
        })
        .eq("id", editProduct.id);
      if (error)
        return alert(
          "Failed to update product. Please try again." + error.message,
        );
    } else {
      const { error } = await supabase.from("products").insert({
        name,
        price: parseFloat(price),
        quantity: Number(quantity),
        wholesaler_id: user.id,
      });
      if (error)
        return alert(
          "Failed to add product. Please try again." + error.message,
        );
    }
    await refetchProducts(user.id);
  };
  const handleDelete = async (id: string) => {
    if (!user) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error)
      return alert(
        "Failed to delete product. Please try again." + error.message,
      );
    await refetchProducts(user.id);
  };

  const disconnectRetailer = async (connectionId: string) => {
    const { error } = await supabase
      .from("connections")
      .delete()
      .eq("id", connectionId);
    if (error) return alert("Failed to disconnect: " + error.message);
    await refetchConnections();
  };
  const connectToRetailer = async (retailerId: string) => {
    const alreadyConnected = connections.some(
      (c) => c.retailer_id === retailerId,
    );
    if (alreadyConnected) return alert("Already connected to this retailer");
    if (!user) return alert("User not found");

    const { error } = await supabase.from("connections").insert({
      wholesaler_id: user.id,
      retailer_id: retailerId,
    });
    if (error) return alert("Failed to connect: " + error.message);
    await refetchConnections();
  };

  useEffect(() => {
    if (!user?.id) return;

   
    const productChannel = supabase
      .channel("wholesaler-products")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "products",
          filter: `wholesaler_id=eq.${user.id}`,
        },
        () => {
          refetchProducts(user.id);
        },
      )
      .subscribe();

   
    const connectionChannel = supabase
      .channel("wholesaler-connections")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "connections",
          filter: `wholesaler_id=eq.${user.id}`,
        },
        () => {
          refetchConnections();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(productChannel);
      supabase.removeChannel(connectionChannel);
    };
  }, [user?.id,refetchConnections]);
  return {
    user,
    products,
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
