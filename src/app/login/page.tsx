'use client';
import LoginPage from '@/components/LoginPage'
import { useSearchParams } from "next/navigation";

const Page = () => {
  const searchParams = useSearchParams();
  const role = searchParams.get("role") ?? undefined;

  return <LoginPage role={role} />;
}

export default Page