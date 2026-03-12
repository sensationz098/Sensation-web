import { useCourseStore } from "@/store/useCourseStore";
import { CalendarDays } from "lucide-react";

const StartDate = () => {
  const { setStartDate } = useCourseStore();
  return (
    <section className="space-y-6">
      <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 flex items-center gap-3">
        <span className="w-10 h-[2px] bg-[#DC8916]" /> 04. Package Starting Date
      </h3>

      <div className="relative group max-w-md">
        {/* Icon Overlay */}
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#DC8916] transition-colors duration-300 pointer-events-none">
          <CalendarDays size={20} />
        </div>

        {/* The Input */}
        <input
          type="date"
          min={new Date().toISOString().split("T")[0]} // Prevents selecting past dates
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full pl-14 pr-6 py-5 bg-white border-2 border-slate-100 rounded-[2rem] 
                 font-bold text-slate-700 outline-none transition-all duration-300
                 hover:border-slate-200 focus:border-[#DC8916] focus:ring-4 focus:ring-[#DC8916]/5
                 appearance-none cursor-pointer"
        />

        {/* Subtle Label Hint */}
        <span className="absolute -top-3 left-8 px-3 bg-white text-[10px] font-black text-[#DC8916] uppercase tracking-tighter border border-slate-50 rounded-full">
          Select Date
        </span>
      </div>
    </section>
  );
};
export default StartDate;
