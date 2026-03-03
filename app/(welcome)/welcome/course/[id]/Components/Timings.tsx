import { useCourseStore } from "@/store/useCourseStore";

const Timings = () => {
  const {
    selectedTeacher,
    availableSchedules,
    setSelectedSchedule,
    selectedSchedule,
  } = useCourseStore();
  return (
    <div>
      {selectedTeacher && (
        <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
          <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 flex items-center gap-3">
            <span className="w-10 h-[2px] bg-[#DC8916]" /> 02. Select Available
            Timing
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {availableSchedules?.map((s: any) => (
              <button
                key={s.id}
                onClick={() => setSelectedSchedule(s)}
                className={`p-4 rounded-2xl border-2 font-bold text-sm transition-all ${
                  selectedSchedule?.id === s.id
                    ? "bg-zinc-900 text-white border-zinc-900"
                    : "bg-white border-slate-100 text-slate-600"
                }`}
              >
                {s.timing}
              </button>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Timings;
