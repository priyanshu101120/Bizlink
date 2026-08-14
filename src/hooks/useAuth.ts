"use client";
import api from "@/lib/api";
import { getSocket } from "@/lib/socket";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface User {
  id: string;
  name: string;
  email: string;
  role: "RETAILER" | "WHOLESALER";
}

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;

    const loadUser = async () => {
      try {
        const { data } = await api.get("/auth/me");
        if (isMounted) setUser(data.user);
      } catch (error) {
        if (isMounted) setUser(null);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    loadUser();

    return () => {
      isMounted = false;
    };
  }, []);

  const Login = async (email: string, password: string): Promise<void> => {
    try {
      const { data } = await api.post("/auth/login", { email, password });
      setUser(data.user);
      toast.success("Login successful! Welcome back 👋");

      if (data.user.role === "RETAILER") {
        router.push("/retailer-dashboard");
      } else if (data.user.role === "WHOLESALER") {
        router.push("/wholesaler-dashboard");
      }
    } catch (err: any) {
      const message = err.response?.data?.message || "Login failed";
      toast.error(message);
      throw new Error(message);
    }
  };

  const SignUp = async (
    name: string,
    email: string,
    password: string,
    role: "RETAILER" | "WHOLESALER"
  ): Promise<void> => {
    try {
      await api.post("/auth/register", { name, email, password, role });
      toast.success("Account created! Please log in");
    } catch (err: any) {
      const message = err.response?.data?.message || "Signup failed";
      toast.error(message);
      throw new Error(message);
    }
  };

  const Logout = async (): Promise<void> => {
    try {
      await api.post("/auth/logout");
      getSocket().disconnect();
      setUser(null);
      toast.success("Logged out successfully");
      router.push("/");
    } catch (err: any) {
      toast.error("Logout failed: " + (err.response?.data?.message || err.message));
      throw err;
    }
  };


  const changePassword = async (currentPassword: string, newPassword: string): Promise<void> => {
  try {
    await api.put("/auth/change-password", { currentPassword, newPassword });
    toast.success("Password changed successfully! Please log in again.");
    setUser(null);
    getSocket().disconnect();
    router.push("/login");
  } catch (err: any) {
    const message = err.response?.data?.message || "Failed to change password";
    toast.error(message);
    throw new Error(message);
  }
};

const deleteAccount = async (): Promise<void> => {
  try {
    await api.delete("/auth/account");
    toast.success("Account deleted permanently");
    setUser(null);
    getSocket().disconnect();
    router.push("/");
  } catch (err: any) {
    const message = err.response?.data?.message || "Failed to delete account";
    toast.error(message);
    throw new Error(message);
  }
};

  return { user, loading, Login, SignUp, Logout, changePassword, deleteAccount };
};

export default useAuth;