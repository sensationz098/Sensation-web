import { useCourseStore } from "@/store/useCourseStore";

const SelectPlan = () => {
  const { otherDetails, setSelectedPlanIndex, selectedPlanIndex } =
    useCourseStore();
  return (
    <section className="space-y-6">
      <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 flex items-center gap-3">
        <span className="w-10 h-[2px] bg-[#DC8916]" /> 03. Membership Plan
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {otherDetails?.duration.map((plan: any, index: number) => (
          <button
            key={plan.id}
            onClick={() => setSelectedPlanIndex(index)}
            className={`p-6 rounded-[2rem] border-2 transition-all text-left ${
              selectedPlanIndex === index
                ? "border-[#DC8916] bg-[#DC8916]/5"
                : "border-slate-100 bg-white"
            }`}
          >
            <p className="text-[10px] font-black uppercase text-slate-400 mb-1">
              {plan.duration}
            </p>
            <p className="font-black text-slate-900 italic">INR {plan.price}</p>
          </button>
        ))}
      </div>
    </section>
  );
};
export default SelectPlan;
