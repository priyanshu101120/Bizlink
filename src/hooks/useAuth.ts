'use client'
import supabase from "@/supabase/supabase"
import { User } from "@supabase/supabase-js"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"


const useAuth = () => {

  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

 useEffect(() => {
  let isMounted = true;

  const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
    if (isMounted) {
      setUser(session?.user ?? null);
    }

    // Jab INITIAL_SESSION ya SIGNED_IN event ho, tab profile check karke redirect karo
    if (event === 'SIGNED_IN' && session?.user) {
      const user = session.user;
      
      // Profile fetch karein taaki role pata chale
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (profile) {
        if (profile.role === 'retailer') {
          router.push('/retailer-dashboard');
        } else if (profile.role === 'wholesaler') {
          router.push('/wholesaler-dashboard');
        }
      } else {
        // Agar naya user hai jisne Google se login kiya aur profile nahi bani
        // Toh aap use profile completion page ya default dashboard bhej sakte hain
        console.log("No profile found for this user.");
      }
    }
  });

  return () => {
    isMounted = false;
    subscription.unsubscribe();
  };
}, [router]);

  const Login = async (email: string, password: string): Promise<void> => {
    const { data,error } = await supabase.auth.signInWithPassword({ email, password })
    if (error || !data.user) {
      throw new Error(error?.message)
    }

    const {data: profile } = await supabase.from('profiles').select('*').eq('id', data.user.id).single()

    if(!profile){
      throw new Error('User profile not found')
    }

    if(profile.role === 'retailer'){
      router.push('/retailer-dashboard')
    } else if(profile.role === 'wholesaler'){
      router.push('/wholesaler-dashboard')
    }
  }  

  const SignUp = async (name: string, email: string, password: string, role: string): Promise<void> => {
    const {error} = await supabase.auth.signUp ({email, password,options: {
      data: {
        name, role}}})
    if (error) {
      throw new Error(error.message)
    }
  }

  const Logout = async (): Promise<void> => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    router.push("/");
  };

  const LoginWithGoogle = async (): Promise<void> => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
      },
    });
    if (error) throw error;
  };

  return { user, Login, SignUp, Logout, LoginWithGoogle };
};

export default useAuth;
  