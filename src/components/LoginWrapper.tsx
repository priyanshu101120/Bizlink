'use client';

import { useSearchParams } from "next/navigation";
import LoginPage from '@/components/LoginPage';

const LoginWrapper = () => {
  const searchParams = useSearchParams();
  const role = searchParams.get("role") ?? undefined;
  const mode = searchParams.get("mode") ?? undefined;

  return <LoginPage defaultRole={role} defaultMode={mode} />;
}

export default LoginWrapper;