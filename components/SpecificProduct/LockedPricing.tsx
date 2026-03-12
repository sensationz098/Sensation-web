import { useCourseStore } from "@/store/useCourseStore";
import { Lock } from "lucide-react";

export default function LockedPricing() {
  const { selectedTeacher, selectedSchedule, startDate } = useCourseStore();
  return (
    <div className="py-12 flex flex-col items-center text-center space-y-6">
      <div className="w-20 h-20 bg-zinc-800 rounded-[2rem] flex items-center justify-center text-zinc-600">
        <Lock size={32} />
      </div>
      <div>
        <h4 className="text-lg font-bold text-zinc-200">Price is Locked</h4>
        <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
          Please select "MENTOR", "TIMING" & "STARTING DATE" slot to see the
          final investment amount.
        </p>
      </div>
      <div className="w-full pt-6 space-y-2">
        {!selectedTeacher && <div className="h-1 bg-zinc-800 rounded-full" />}
        {selectedTeacher && !selectedSchedule && (
          <div className="h-1 bg-[#DC8916] rounded-full w-1/3" />
        )}
        {selectedTeacher && selectedSchedule && !startDate && (
          <div className="h-1 bg-[#DC8916] rounded-full w-1/1" />
        )}
      </div>
    </div>
  );
}
