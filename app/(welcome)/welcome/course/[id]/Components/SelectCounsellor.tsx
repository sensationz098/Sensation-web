import { UserCheck } from "lucide-react";

const SelectCounsellor = ({ setCounsellorId }: any) => {
  return (
    <section className="space-y-6">
      <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 flex items-center gap-3">
        <span className="w-10 h-[2px] bg-[#DC8916]" /> 05. Counsellor ID
        (Optional)
      </h3>

      <div className="relative group max-w-md">
        {/* Icon Overlay */}
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#DC8916] transition-colors duration-300 pointer-events-none">
          <UserCheck size={20} />
        </div>

        {/* The Input */}
        <input
          type="text"
          placeholder="e.g. NAV-1024"
          onChange={(e) => setCounsellorId(e.target.value)}
          className="w-full pl-14 pr-16 py-5 bg-white border-2 border-slate-100 rounded-[2rem] 
                 font-bold text-slate-700 placeholder:text-slate-300 outline-none transition-all duration-300
                 hover:border-slate-200 focus:border-[#DC8916] focus:ring-4 focus:ring-[#DC8916]/5"
        />

        {/* Optional: Validation Badge or "Apply" button */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <span className="px-3 py-1 bg-slate-100 rounded-full text-[9px] font-black text-slate-400 uppercase tracking-widest group-focus-within:bg-[#DC8916]/10 group-focus-within:text-[#DC8916] transition-all">
            Referral
          </span>
        </div>

        {/* Floating Label */}
        <span className="absolute -top-3 left-8 px-3 bg-white text-[10px] font-black text-slate-400 uppercase tracking-tighter border border-slate-50 rounded-full group-focus-within:text-[#DC8916]">
          Partner Code
        </span>
      </div>
    </section>
  );
};

export default SelectCounsellor;
