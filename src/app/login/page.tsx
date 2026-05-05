import { Suspense } from "react";
import LoginWrapper from "@/components/LoginWrapper";

const Page = () => {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center font-bold text-[#006989]">
          Loading BizLink...
        </div>
      }
    >
      <LoginWrapper />
    </Suspense>
  );
};

export default Page;
