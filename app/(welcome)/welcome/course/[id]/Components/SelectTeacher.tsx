import { useCourseStore } from "@/store/useCourseStore";
import { CheckCircle2, ChevronDown, User } from "lucide-react";

const SelectTeacher = () => {
  const {
    isMentorOpen,
    setIsMentorOpen,
    selectedTeacher,
    otherDetails,
    setSelectedTeacher,
    setSelectedSchedule,
  } = useCourseStore();
  return (
    <section className="space-y-6">
      <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 flex items-center gap-3">
        <span className="w-10 h-[2px] bg-[#DC8916]" /> 01. Choose Your Mentor
      </h3>

      <div className="relative max-w-md">
        {/* The Trigger Button */}
        <button
          onClick={() => setIsMentorOpen(!isMentorOpen)}
          className={`w-full p-5 rounded-[2rem] border-2 flex items-center justify-between transition-all bg-white ${
            isMentorOpen ? "border-[#DC8916] shadow-lg" : "border-slate-100"
          }`}
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-[#DC8916] font-bold">
              {selectedTeacher ? (
                selectedTeacher.name.charAt(0).toUpperCase()
              ) : (
                <User size={18} />
              )}
            </div>
            <span className="font-bold text-slate-800 uppercase tracking-tight">
              {selectedTeacher
                ? selectedTeacher.name.toUpperCase()
                : "Select a Mentor"}
            </span>
          </div>
          <ChevronDown
            className={`text-slate-400 transition-transform duration-300 ${isMentorOpen ? "rotate-180" : ""}`}
            size={20}
          />
        </button>

        {/* The Dropdown Menu */}
        {isMentorOpen && (
          <div className="absolute top-full left-0 w-full mt-3 bg-white border border-slate-100 rounded-[2.5rem] shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-2 max-h-64 overflow-y-auto custom-scrollbar">
              {otherDetails?.teacher.map((t: any) => (
                <div
                  key={t.id}
                  onClick={() => {
                    setSelectedTeacher(t);
                    setSelectedSchedule(null);
                    setIsMentorOpen(false);
                  }}
                  className={`flex items-center justify-between p-4 rounded-[1.8rem] cursor-pointer transition-colors ${
                    selectedTeacher?.id === t.id
                      ? "bg-[#DC8916]/10 text-[#DC8916]"
                      : "hover:bg-slate-50 text-slate-600"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black ${
                        selectedTeacher?.id === t.id
                          ? "bg-[#DC8916] text-white"
                          : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      {t.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-bold uppercase tracking-widest">
                      {t.name}
                    </span>
                  </div>
                  {selectedTeacher?.id === t.id && <CheckCircle2 size={16} />}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SelectTeacher;
