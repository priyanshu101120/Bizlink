'use client';

import { useSearchParams } from "next/navigation";
import LoginPage from '@/components/LoginPage';

const LoginWrapper = () => {
  const searchParams = useSearchParams();
  const role = searchParams.get("role") ?? undefined;

  return <LoginPage role={role} />;
}

export default LoginWrapper;