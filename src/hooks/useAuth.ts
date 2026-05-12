"use client";
import supabase from "@/supabase/supabase";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;

    const loadUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.log("error load user", error.message);
        if (isMounted) setUser(null);
        return;
      }
      if (isMounted) {
        setUser(data.user);
      }
    };
    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const Login = async (email: string, password: string): Promise<void> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error || !data.user) {
        toast.error(error?.message || "Login failed");
        throw new Error(error?.message);
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", data.user.id)
        .single();

      if (!profile) {
        toast.error("User profile not found");
        throw new Error("User profile not found");
      }

      toast.success("Login successful! Welcome back 👋");

      if (profile.role === "retailer") {
        router.push("/retailer-dashboard");
      } else if (profile.role === "wholesaler") {
        router.push("/wholesaler-dashboard");
      }
    } catch (err) {
      throw err;
    }
  };

  const SignUp = async (
    name: string,
    email: string,
    password: string,
    role: string,
  ): Promise<void> => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          role,
        },
      },
    });
    if (error) {
      toast.error(error.message);
      throw new Error(error.message);
    }
    toast.success("Account created! Please verify your email 📧");
  };

  const Logout = async (): Promise<void> => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Logout failed: " + error.message);
      throw error;
    }
    toast.success("Logged out successfully");
    router.push("/");
  };

  const LoginWithGoogle = async (): Promise<void> => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) {
      toast.error("Login with Google failed: " + error.message);
      throw error;
    }
  };

  return { user, Login, SignUp, Logout, LoginWithGoogle };
};

export default useAuth;
