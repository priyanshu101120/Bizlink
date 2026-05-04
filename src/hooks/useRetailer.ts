'use client'
import supabase from "@/supabase/supabase"
import { User } from "@supabase/supabase-js"
import { useCallback, useEffect, useState } from "react"

export interface Profile {
  id: string
  name: string
  email?: string
  role: string
}

export interface Connection {
  id: string
  wholesaler_id: string
  retailer_id: string
  profile: {
    id: string
    name: string
  }
}
export interface Product {
  id: string
  name: string
  description: string
  price: number
  created_at: string;
  quantity: number
  wholesaler_id: string
  profile: {
    name: string
  }
}
export interface AppNotification {
  id: number;
  message: string;
  type: 'warning' | 'danger' | 'success'; 
  read: boolean;
  time: Date;
}

const useRetailer = ()=>{
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [connections, setConnections] = useState<Connection[]>([])
  const [allWholesalers, setAllWholesalers] = useState<Profile[]>([])
  const [notification, setNotification] = useState<AppNotification[]>([])
  const [loading, setLoading] = useState(false)



 useEffect(() => {
  const loadUser = async () => {
    const { data } = await supabase.auth.getSession()
    setUser(data.session?.user ?? null)
  }

  loadUser()

  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((_event, session) => {
    setUser(session?.user ?? null)
  })

  return () => {
    subscription.unsubscribe()
  }
}, [])

 const fetchConnections = useCallback(async () => {
  if(!user) return;

  const {data} = await supabase.from('connections').select('*, profile:wholesaler_id (id,name)').eq('retailer_id', user.id)
  if(data) setConnections(data as Connection[])
 }, [user])

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

useEffect(()=>{
  if(!user?.id) return

 

  const fetchAllWholesalers = async () => {
    const {data} = await supabase.from('profiles').select('id,name,role').eq('role', 'wholesaler')
    if(data) setAllWholesalers(data as Profile[])
  }

 const loadData = async () => {
  setLoading(true)
   await fetchProfile()
   await fetchAllWholesalers()
    await fetchConnections()
    setLoading(false)
  }
  loadData()

}, [user?.id, fetchConnections,fetchProfile])
useEffect(() => {
  const fetchProducts = async () => {
    const wholesalerIds = connections.map((c) => c.wholesaler_id);

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
  };

  fetchProducts();
}, [connections]);

const disconnectWholesaler = async (connectionId: string) => {
    const { error } = await supabase.from('connections').delete().eq('id', connectionId)
    if (error) return alert("Failed to disconnect. Please try again." + error.message)
    const loadConnections = async () => {
      await fetchConnections()
    }
    loadConnections()
  }

const connectToWholesaler = async (wholesalerId: string) => {
    const alresdyConnected = connections.some(c => c.wholesaler_id === wholesalerId)
    if (alresdyConnected) return alert("Already connected to this wholesaler")
if (!user) return alert("User not found. Please login again.")
    const { error } = await supabase.from('connections').insert({
      wholesaler_id: wholesalerId,
      retailer_id: user.id
    })
    if (error) return alert("Failed to connect. Please try again." + error.message)
    const loadConnections = async () => {
      await fetchConnections()
    }
    loadConnections()
  }

  useEffect(()=>{
if ("Notification" in window) {
  Notification.requestPermission();
}

},[])


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
    disconnectWholesaler
  };
}
export default useRetailer
