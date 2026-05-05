'use client';
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const SkeletonPulse = ({ className }: { className?: string }) => (
  <div className={`animate-pulse bg-slate-200 rounded-md ${className}`} />
);

const RetailerSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#eaebed]">
      
      <nav className="sticky top-0 z-50 flex items-center justify-between py-4 px-4 md:px-6 bg-[#006989]">
        <div className="flex items-center gap-4">
          <SkeletonPulse className="w-10 h-10 bg-white/20 rounded-xl" />
          <SkeletonPulse className="w-24 h-8 bg-white/20" />
          <SkeletonPulse className="w-20 h-6 bg-white/10 rounded-full hidden sm:block" />
        </div>
        <div className="flex gap-4">
          <SkeletonPulse className="w-10 h-10 bg-white/20 rounded-full" />
          <SkeletonPulse className="w-20 h-10 bg-white/20 rounded-lg" />
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="border-none shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <SkeletonPulse className="w-20 h-4" />
                <SkeletonPulse className="w-4 h-4 rounded-full" />
              </CardHeader>
              <CardContent>
                <SkeletonPulse className="w-12 h-8" />
              </CardContent>
            </Card>
          ))}
        </div>

        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex bg-white/50 p-1 rounded-lg gap-1">
            <SkeletonPulse className="w-24 h-10 rounded-md" />
            <SkeletonPulse className="w-24 h-10 rounded-md" />
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto">
             <SkeletonPulse className="w-full md:w-72 h-10 rounded-lg" />
             <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                    <SkeletonPulse key={i} className="w-9 h-9 rounded-full border-2 border-white" />
                ))}
             </div>
          </div>
        </div>

        
        <Card className="border-none shadow-sm overflow-hidden">
          <div className="bg-slate-50 p-4 border-b border-slate-100">
            <div className="grid grid-cols-5 gap-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <SkeletonPulse key={i} className="h-4 w-full" />
              ))}
            </div>
          </div>
          <div className="p-4 space-y-6">
            {[1, 2, 3, 4, 5, 6].map((row) => (
              <div key={row} className="grid grid-cols-5 gap-4 items-center">
                <SkeletonPulse className="h-5 w-3/4" />
                <SkeletonPulse className="h-5 w-1/2" />
                <SkeletonPulse className="h-5 w-1/4" />
                <SkeletonPulse className="h-5 w-1/3" />
                <div className="flex justify-end">
                  <SkeletonPulse className="h-6 w-20 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RetailerSkeleton;