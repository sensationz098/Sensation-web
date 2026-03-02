"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import {
  CreditCard,
  Zap,
  ShieldCheck,
  Calendar,
  Clock,
  User,
  Globe,
  CheckCircle2,
  Lock,
  CalendarDays,
  UserCheck,
} from "lucide-react";

import getSpecificCourse from "@/lib/courses/getSpecificCourse";
import getOtherCourseDetails from "@/lib/courses/getOtherCourseDetails";
import {
  OtherCourseType,
  TeacherType,
  ScheduleType,
} from "@/types/OtherCourseType";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import createOrder from "@/lib/payment/createOrder";
import { DiscountType } from "@/types/DiscountType";
import getDiscountCoupons from "@/lib/courses/getDiscountCoupons";

export default function CourseDetailView() {
  const params = useParams();
  const id = params.id as string;
  const [course, setCourse] = useState<any | null>(null);
  const [otherDetails, setOtherDetails] = useState<OtherCourseType | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [selectedPlanIndex, setSelectedPlanIndex] = useState(0);
  const [selectedTeacher, setSelectedTeacher] = useState<TeacherType | null>(
    null,
  );
  const [selectedSchedule, setSelectedSchedule] = useState<ScheduleType | null>(
    null,
  );
  const [startDate, setStartDate] = useState<string>();
  const [counsellorId, setCounsellorId] = useState<string>();
  const [couponInput, setCouponInput] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [couponError, setCouponError] = useState<string>();
  useEffect(() => {
    const fetchAllData = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const [courseData, otherData] = await Promise.all([
          getSpecificCourse(id),
          getOtherCourseDetails(id),
        ]);
        setCourse(courseData);
        setOtherDetails(otherData);
      } catch (error) {
        console.error("Error fetching course data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, [id]);

  if (loading)
    return (
      <div className="p-20 text-center animate-pulse">
        LOADING MASTERCLASS...
      </div>
    );
  if (!course)
    return <div className="p-20 text-center font-bold">Course not found.</div>;

  // --- Logic & Calculations ---
  const isReady = selectedTeacher && selectedSchedule && startDate;
  const currentPlan = course.duration[selectedPlanIndex];
  const basePrice = currentPlan?.discounted_price || currentPlan?.price || 0;
  const gstAmount = (basePrice * (Number(course.gst) || 0)) / 100;
  const finalPrice = basePrice + gstAmount - appliedDiscount;
  // Filter schedules based on selected teacher
  const availableSchedules = otherDetails?.schedule.filter(
    (s) => s.teacher_id === selectedTeacher?.id,
  );
  const handlePayment = async () => {
    const response = await createOrder();
  };

  const handleApplyCoupon = async () => {
    const discountCoupons: DiscountType[] = await getDiscountCoupons();
    console.log(discountCoupons);
    const filter = discountCoupons.filter(
      (d) => d.coupon_code === couponInput.toUpperCase(),
    );
    if (!filter || filter.length === 0) {
      setCouponError("COUPON NOT VALID!");
      console.log("COUPON NOT VALID!");
      return;
    }

    if (basePrice < filter[0].min_amount) {
      setCouponError(`Only valid if amount > ${filter[0].min_amount}`);
      console.log(`Only valid if amount > ${filter[0].min_amount}`);

      return;
    }
    setAppliedDiscount(filter[0].discount_amount);
    console.log("HI");
  };
  return (
    <div className="min-h-screen bg-white pb-32">
      {/* 1. Hero Section */}
      <div className="relative w-full h-[40vh] bg-slate-900">
        <Image
          src={course.image_url}
          alt={course.title}
          fill
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-20 -mt-24 relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* 2. Selection Area */}
        <div className="lg:col-span-2 space-y-12">
          <div className="bg-white/90 backdrop-blur-md p-8 rounded-[3rem] border border-slate-100 shadow-sm">
            <span className="px-4 py-1 rounded-full bg-[#DC8916] text-white text-[10px] font-black uppercase tracking-widest">
              {course.category}
            </span>
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 mt-6 italic uppercase tracking-tighter">
              {course.title}
            </h1>
          </div>

          {/* STEP 1: SELECT TEACHER */}
          <section className="space-y-6">
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 flex items-center gap-3">
              <span className="w-10 h-[2px] bg-[#DC8916]" /> 01. Choose Your
              Mentor
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {otherDetails?.teacher.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setSelectedTeacher(t);
                    setSelectedSchedule(null);
                  }}
                  className={`p-6 rounded-[2rem] border-2 flex items-center justify-between transition-all ${
                    selectedTeacher?.id === t.id
                      ? "border-[#DC8916] bg-[#DC8916]/5"
                      : "border-slate-100 bg-white"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-[#DC8916] font-bold">
                      {/* 1. Uppercase Initial */}
                      {t.name.charAt(0).toUpperCase()}
                    </div>
                    {/* 2. Uppercase Full Name */}
                    <span className="font-bold text-slate-800 uppercase tracking-tight">
                      {t.name.toUpperCase()}
                    </span>
                  </div>

                  {selectedTeacher?.id === t.id && (
                    <CheckCircle2 className="text-[#DC8916]" size={20} />
                  )}
                </button>
              ))}
            </div>
          </section>

          {/* STEP 2: SELECT TIMING */}
          {selectedTeacher && (
            <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 flex items-center gap-3">
                <span className="w-10 h-[2px] bg-[#DC8916]" /> 02. Select
                Available Timing
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {availableSchedules?.map((s) => (
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

          {/* STEP 3: SELECT PLAN */}
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
                  <p className="font-black text-slate-900 italic">
                    INR {plan.price}
                  </p>
                </button>
              ))}
            </div>
          </section>

          {/* STEP 4: START DATE */}
          <section className="space-y-6">
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 flex items-center gap-3">
              <span className="w-10 h-[2px] bg-[#DC8916]" /> 04. Package
              Starting Date
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

          {/* STEP 5: Counsellor ID */}
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
        </div>

        {/* 3. RIGHT SIDE: STICKY PRICING CARD */}
        <div className="relative">
          <div className="sticky top-28 bg-zinc-900 text-white p-10 rounded-[3.5rem] shadow-2xl border border-zinc-800 overflow-hidden">
            {isReady ? (
              <div className="space-y-8 animate-in zoom-in-95 duration-500">
                <div className="pb-6 border-b border-zinc-800">
                  <p className="text-[10px] font-black text-[#DC8916] uppercase tracking-[0.3em] mb-3">
                    Tuition Breakdown
                  </p>

                  <div className="space-y-2">
                    {/* 1. Base Price */}
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-zinc-500 font-extrabold">
                        Base Amount
                      </span>
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
                        + {course.currency} {gstAmount.toLocaleString()}
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
                          {course.currency} {finalPrice.toLocaleString()}
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
                      {selectedTeacher.name}
                    </span>
                  </div>
                  <div className="flex justify-between text-[10px] uppercase tracking-widest">
                    <span className="text-zinc-500 font-black">Slot</span>
                    <span className="text-[#DC8916] font-black">
                      {selectedSchedule?.timing}
                    </span>
                  </div>

                  <div className="flex justify-between text-[10px] uppercase tracking-widest">
                    <span className="text-zinc-500 font-black">
                      Starting from:{" "}
                    </span>
                    <span className="text-[#DC8916] font-black">
                      {startDate}
                    </span>
                  </div>
                </div>

                <button
                  className="w-full h-18 py-5 bg-[#DC8916] hover:bg-[#f3a02d] text-white rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl shadow-[#DC8916]/30 active:scale-95 flex items-center justify-center gap-3"
                  onClick={handlePayment}
                >
                  <CreditCard size={18} /> Enroll Now
                </button>
              </div>
            ) : (
              <div className="py-12 flex flex-col items-center text-center space-y-6">
                <div className="w-20 h-20 bg-zinc-800 rounded-[2rem] flex items-center justify-center text-zinc-600">
                  <Lock size={32} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-zinc-200">
                    Price is Locked
                  </h4>
                  <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
                    Please select "MENTOR", "TIMING" & "STARTING DATE" slot to
                    see the final investment amount.
                  </p>
                </div>
                <div className="w-full pt-6 space-y-2">
                  {!selectedTeacher && (
                    <div className="h-1 bg-zinc-800 rounded-full" />
                  )}
                  {selectedTeacher && !selectedSchedule && (
                    <div className="h-1 bg-[#DC8916] rounded-full w-1/2" />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
