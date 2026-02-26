"use client";

export default function ExploreAll() {
  const brandOrange = "#DC8916";
  return (
    <div className="px-4 py-20">
      <div className="max-w-7xl mx-auto p-16 rounded-[3rem] bg-zinc-900 border border-white/10 text-center relative overflow-hidden shadow-2xl">
        <div
          className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-[80px] opacity-30"
          style={{ backgroundColor: brandOrange }}
        />
        <h2 className="text-4xl md:text-5xl font-black mb-6">
          EXPLORE THE <span style={{ color: brandOrange }}>CATALOG</span>
        </h2>
        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
          Discover our full range of professional training programs across all
          disciplines.
        </p>
        <button
          className="px-10 py-4 rounded-2xl text-white font-black text-lg shadow-lg hover:scale-105 transition-transform"
          style={{ backgroundColor: brandOrange }}
        >
          BROWSE ALL 20+ COURSES
        </button>
      </div>
    </div>
  );
}
