"use client";
import supabase from "@/supabase/supabase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AuthCallbackPage = () => {
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error || !data.session) {
        router.push("/");
        return;
      }

      const userId = data.session.user.id;

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", userId)
        .single();

      if (profileError || !profile) {
        router.push("/");
        return;
      }

      if (profile.role === "retailer") {
        router.push("/retailer-dashboard");
      } else if (profile.role === "wholesaler") {
        router.push("/wholesaler-dashboard");
      } else {
        router.push("/");
      }
    };

    handleCallback();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f4f5]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-[#006989] border-t-transparent rounded-full animate-spin" />
        <p className="text-[#006989] font-semibold text-sm">
          Signing you in...
        </p>
      </div>
    </div>
  );
};

export default AuthCallbackPage;
