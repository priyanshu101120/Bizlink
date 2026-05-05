import { Zap } from "lucide-react";

const WholesalerLoader = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="sticky top-0 z-50 flex items-center justify-between py-4 px-4 md:px-6 bg-[#006989]">
        <div className="flex items-center gap-2 text-white">
          <div className="flex items-center">
            <div className="bg-[#006989] p-2 rounded-xl text-white shadow-lg shadow-blue-900/20">
              <Zap size={24} className="md:w-8 md:h-8" fill="white" />
            </div>
          </div>
          <span className="text-xl md:text-3xl font-black tracking-tighter text-white">
            BizLink
          </span>

          <div className="hidden sm:block ml-2 h-5.5 w-18 bg-white/20 rounded-full animate-pulse" />
          <div className="hidden sm:block h-5.5 w-13 bg-white/20 rounded-full animate-pulse" />
        </div>

        <div className="h-8.5 md:h-10 w-18 md:w-20 bg-[#eaebed]/30 rounded-lg animate-pulse" />
      </nav>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 px-4 md:px-6 mb-8 mt-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-xl border border-transparent bg-white text-card-foreground shadow-sm"
          >
            <div className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
              <div className="h-4 w-28 bg-[#006989]/15 rounded animate-pulse" />
              <div className="h-4 w-4 bg-[#006989]/15 rounded animate-pulse" />
            </div>

            <div className="p-6 pt-0">
              <div className="h-8 w-10 bg-[#006989]/20 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 px-4 md:px-6 gap-4">
        <div className="flex bg-slate-200/50 p-1 rounded-lg gap-1">
          <div className="h-10 w-22.5 bg-[#006989] rounded-md animate-pulse" />
          <div className="h-10 w-22.5 bg-[#006989]/10 rounded-md animate-pulse" />
        </div>

        <div className="h-10 w-full sm:w-40 bg-[#006989]/20 rounded-xl animate-pulse" />
      </div>

      <div className="px-4 md:px-6">
        <div className="bg-white border border-[#006989] rounded-2xl overflow-hidden shadow-sm">
          <div className="bg-slate-50 grid grid-cols-4 px-4 border-b border-[#006989]/10">
            {["w-28", "w-24", "w-20", "w-16"].map((w, i) => (
              <div
                key={i}
                className={`py-4 flex ${i === 3 ? "justify-center" : ""}`}
              >
                <div
                  className={`h-4 ${w} bg-[#006989]/15 rounded animate-pulse`}
                />
              </div>
            ))}
          </div>

          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="grid grid-cols-4 items-center px-4 border-b border-[#006989]/10 last:border-0"
            >
              <div className="py-4">
                <div className="h-4 w-32 bg-[#006989]/15 rounded animate-pulse" />
              </div>

              <div className="py-4 flex items-center gap-3">
                <div className="h-4 w-8 bg-[#006989]/15 rounded animate-pulse" />
                <div className="h-5 w-16 bg-[#006989]/15 rounded-full animate-pulse" />
              </div>

              <div className="py-4 flex flex-col gap-1">
                <div className="h-5 w-20 bg-[#006989]/20 rounded animate-pulse" />

                <div className="h-3 w-12 bg-[#006989]/10 rounded animate-pulse" />
              </div>

              <div className="py-4 flex items-center justify-center gap-2">
                <div className="h-8 w-14 bg-[#006989]/15 rounded-lg animate-pulse" />

                <div className="h-8 w-16 bg-[#006989]/10 rounded-lg animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WholesalerLoader;
