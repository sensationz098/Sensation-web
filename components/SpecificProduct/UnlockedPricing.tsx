import { useCourseStore } from "@/store/useCourseStore";
import { CreditCard } from "lucide-react";
import { useEffect } from "react";

const UnlockedPricing = ({
  updatedFinalPrice,
  basePrice,
  gstAmount,
  handleApplyCoupon,
  finalPrice,
  handlePayment,
  updatedGst,
}: any) => {
  const {
    course,
    couponInput,
    setCouponInput,
    appliedDiscount,
    selectedTeacher,
    selectedSchedule,
    startDate,
  } = useCourseStore();
  useEffect(() => {
    console.log(updatedFinalPrice);
  }, [updatedFinalPrice]);
  return (
    <div className="space-y-8 animate-in zoom-in-95 duration-500">
      <div className="pb-6 border-b border-zinc-800">
        <p className="text-[10px] font-black text-[#DC8916] uppercase tracking-[0.3em] mb-3">
          Tuition Breakdown
        </p>

        <div className="space-y-2">
          {/* 1. Base Price */}
          <div className="flex justify-between items-center text-sm">
            <span className="text-zinc-500 font-extrabold">Base Amount</span>
            <span className="text-zinc-300 font-extrabold">
              {course.currency} {basePrice.toLocaleString()}
            </span>
          </div>

          {/* 2. Tax Amount (GST) */}
          <div className="flex justify-between items-center text-sm">
            <span className="text-zinc-500 font-extrabold italic">
              GST ({course.gst}%)
            </span>
            <span className="text-zinc-300 font-extrabold">
              + {course.currency}{" "}
              {updatedGst ? updatedGst : gstAmount.toLocaleString()}
            </span>
          </div>
          {/* --- NEW COUPON SECTION --- */}
          <div className="pt-5 space-y-3">
            <div className="relative group">
              <input
                type="text"
                placeholder="APPLY COUPON"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                className="w-full pl-5 pr-20 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-[10px] font-black tracking-widest text-white outline-none focus:border-[#DC8916] transition-all"
              />
              <button
                onClick={handleApplyCoupon}
                className="cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 px-5 py-3 bg-[#DC8916] text-white text-[9px] font-black rounded-lg hover:bg-white hover:text-black transition-all"
              >
                APPLY
              </button>
            </div>

            {appliedDiscount > 0 && (
              <div className="flex justify-between items-center px-2 animate-in fade-in slide-in-from-top-1">
                <span className="text-[10px] text-green-500 font-black uppercase">
                  Coupon Discount
                </span>
                <span className="text-[20px] text-green-500 font-black">
                  - {course.currency} {appliedDiscount}
                </span>
              </div>
            )}
          </div>
          {/* 3. Final Price */}
          <div className="flex items-baseline justify-between mt-4 pt-4 border-t border-zinc-800/50">
            <span className="text-xs font-black text-white uppercase tracking-wider">
              Total Payable:
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black tracking-tighter text-white">
                {course.currency}{" "}
                {updatedFinalPrice
                  ? updatedFinalPrice
                  : finalPrice.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Selection Summary */}
      <div className="space-y-3 bg-white/5 p-4 rounded-2xl">
        <div className="flex justify-between text-[10px] uppercase tracking-widest">
          <span className="text-zinc-500 font-black">Mentor</span>
          <span className="text-[#DC8916] font-black">
            {selectedTeacher?.name}
          </span>
        </div>
        <div className="flex justify-between text-[10px] uppercase tracking-widest">
          {/* <span className="text-zinc-500 font-black">Slot</span>
          <span className="text-[#DC8916] font-black">
            {selectedSchedule?.timing}
          </span> */}
        </div>

        <div className="flex justify-between text-[10px] uppercase tracking-widest">
          <span className="text-zinc-500 font-black">Starting from: </span>
          <span className="text-[#DC8916] font-black">{startDate}</span>
        </div>
      </div>

      <button
        className="w-full h-18 py-5 bg-[#DC8916] hover:bg-[#f3a02d] text-white rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl shadow-[#DC8916]/30 active:scale-95 flex items-center justify-center gap-3"
        onClick={handlePayment}
      >
        <CreditCard size={18} /> Enroll Now
      </button>
    </div>
  );
};

export default UnlockedPricing;
