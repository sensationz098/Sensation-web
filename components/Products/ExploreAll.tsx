// 1. Correct the import
import Link from "next/link";

export default function ExploreAll() {
  const brandOrange = "#DC8916";

  return (
    <div className="px-4 py-20">
      <div className="max-w-7xl mx-auto p-16 rounded-[3rem] bg-zinc-900 border border-white/10 text-center relative overflow-hidden shadow-2xl">
        {/* Decorative Glow - Top Right */}
        <div
          className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-[80px] opacity-30"
          style={{ backgroundColor: brandOrange }}
        />

        {/* Decorative Glow - Bottom Left */}
        <div
          className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full blur-[80px] opacity-10"
          style={{ backgroundColor: brandOrange }}
        />

        <h2 className="text-4xl md:text-5xl font-black mb-6 text-white tracking-tighter italic uppercase">
          EXPLORE THE <span style={{ color: brandOrange }}>CATALOG</span>
        </h2>

        <p className="text-zinc-400 mb-10 max-w-xl mx-auto text-lg font-medium">
          Discover our full range of professional training programs across all
          disciplines. From Indian Classical to Global Pop.
        </p>

        <Link href="/welcome/allcourses">
          <button
            className="px-10 py-4 rounded-2xl text-white font-black text-lg shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-[#DC8916]/20 hover:shadow-[#DC8916]/40"
            style={{ backgroundColor: brandOrange }}
          >
            BROWSE ALL 20+ COURSES
          </button>
        </Link>
      </div>
    </div>
  );
}
