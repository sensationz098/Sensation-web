"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { User, ChevronDown, CheckCircle2, Clock, Calendar } from "lucide-react";
import getSpecificCourse from "@/lib/courses/getSpecificCourse";
import getOtherCourseDetails from "@/lib/courses/getOtherCourseDetails";
import { useCourseStore } from "@/store/useCourseStore";
import { useAuth } from "@/context/AuthContext";
import Hero from "../../../../../components/SpecificProduct/Hero";
import Heading from "../../../../../components/SpecificProduct/Heading";
import SelectPlan from "../../../../../components/SpecificProduct/SelectPlan";
import StartDate from "../../../../../components/SpecificProduct/StartDate";
import SelectCounsellor from "../../../../../components/SpecificProduct/SelectCounsellor";
import UnlockedPricing from "../../../../../components/SpecificProduct/UnlockedPricing";
import LockedPricing from "../../../../../components/SpecificProduct/LockedPricing";
import paymentLogic from "@/lib/specific-product/paymentLogic";
import discountLogic from "@/lib/specific-product/discountLogic";

export default function CourseDetailView() {
  const params = useParams();
  const id = params.id as string;
  const { user } = useAuth();

  // Local state for dropdown visibility
  const [isTimingOpen, setIsTimingOpen] = useState(false);
  const [isDaysOpen, setIsDaysOpen] = useState(false);
  const [isMentorOpen, setIsMentorOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState("");
  const [scheduleId, setScheduleId] = useState("");
  const {
    course,
    setCourse,
    otherDetails,
    setOtherDetails,
    loading,
    setLoading,
    selectedPlanIndex,
    selectedTeacher,
    setSelectedTeacher,
    selectedSchedule,
    setSelectedSchedule,
    startDate,
    appliedDiscount,
    setAppliedDiscount,
    couponInput,
    setCouponError,
    discountId,
    counsellorId,
    setDiscountId,
  } = useCourseStore();

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
  }, [id, setCourse, setOtherDetails, setLoading]);

  const uniqueTimings = Array.from(
    new Set(otherDetails?.schedule.map((s) => s.timing)),
  );
  const filteredByTiming = otherDetails?.schedule.filter(
    (s) => s.timing === (selectedSchedule as unknown as string),
  );
  const uniqueDays = Array.from(
    new Set(filteredByTiming?.flatMap((s) => s.days)),
  );
  const availableTeachers =
    otherDetails?.teacher.filter((t) =>
      otherDetails?.schedule.some(
        (s) =>
          s.timing === (selectedSchedule as unknown as string) &&
          s.days.includes(selectedDay) &&
          s.teacher_id === t.id,
      ),
    ) || [];

  const isReady =
    selectedSchedule && selectedDay && selectedTeacher && startDate;
  const currentPlan = course?.duration[selectedPlanIndex];
  const basePrice = currentPlan?.discounted_price || currentPlan?.price || 0;
  const gstAmount = (basePrice * (Number(course?.gst) || 0)) / 100;
  const finalPrice = basePrice + gstAmount - appliedDiscount;

  const handlePayment = async () => {
    console.log("SCHEDULE ID: ", scheduleId);
    if (!user) return;
    paymentLogic({
      id: user.uid,
      course,
      startDate,
      selectedSchedule,
      schedule_id: scheduleId,
      selectedTeacher,
      appliedDiscount,
      counsellorId,
      discountId,
      currentPlan,
      basePrice,
    });
  };

  const handleApplyCoupon = async () => {
    const response = await discountLogic(
      couponInput,
      finalPrice,
      setCouponError,
      setDiscountId,
    );
    setAppliedDiscount(response);
  };

  if (loading)
    return (
      <div className="p-20 text-center animate-pulse font-black text-slate-400">
        LOADING MASTERCLASS...
      </div>
    );
  if (!course)
    return <div className="p-20 text-center font-bold">Course not found.</div>;

  return (
    <div className="min-h-screen bg-white pb-32">
      <Hero url={course.image_url} alt={course.title} />

      <div className="max-w-7xl mx-auto px-6 lg:px-20 -mt-24 relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-16">
          <Heading category={course.category} title={course.title} />

          <section className="space-y-6">
            <SelectPlan />

            <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 flex items-center gap-3">
              <span className="w-10 h-[2px] bg-[#DC8916]" /> Choose Timing
            </h3>
            <div className="relative max-w-md">
              <button
                onClick={() => setIsTimingOpen(!isTimingOpen)}
                className={`w-full p-5 rounded-[2rem] border-2 flex items-center justify-between transition-all bg-white ${isTimingOpen ? "border-[#DC8916] shadow-lg" : "border-slate-100"}`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-[#DC8916]">
                    <Clock size={18} />
                  </div>
                  <span className="font-bold text-slate-800 uppercase tracking-tight">
                    {selectedSchedule
                      ? (selectedSchedule as any)
                      : "Select Timing"}
                  </span>
                </div>
                <ChevronDown
                  className={`text-slate-400 transition-transform ${isTimingOpen ? "rotate-180" : ""}`}
                  size={20}
                />
              </button>
              {isTimingOpen && (
                <div className="absolute top-full left-0 w-full mt-3 bg-white border border-slate-100 rounded-[2.5rem] shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95">
                  <div className="p-2 max-h-64 overflow-y-auto">
                    {otherDetails?.schedule.map((t) => (
                      <div
                        key={t.id}
                        onClick={() => {
                          setSelectedSchedule(t.timing as any);
                          setScheduleId(t.id);
                          setSelectedDay("");
                          setSelectedTeacher(null);
                          setIsTimingOpen(false);
                        }}
                      >
                        <span className="text-sm font-bold uppercase tracking-widest">
                          {t.timing}
                        </span>
                        {/* {selectedSchedule === t && <CheckCircle2 size={16} />} */}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* END */}
          {selectedSchedule && (
            <section className="space-y-6 animate-in fade-in slide-in-from-top-4">
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 flex items-center gap-3">
                <span className="w-10 h-[2px] bg-[#DC8916]" /> Select Days
              </h3>
              <div className="relative max-w-md">
                <button
                  onClick={() => setIsDaysOpen(!isDaysOpen)}
                  className={`w-full p-5 rounded-[2rem] border-2 flex items-center justify-between transition-all bg-white ${isDaysOpen ? "border-[#DC8916] shadow-lg" : "border-slate-100"}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-[#DC8916]">
                      <Calendar size={18} />
                    </div>
                    <span className="font-bold text-slate-800 uppercase tracking-tight">
                      {selectedDay ? selectedDay.toUpperCase() : "Select Days"}
                    </span>
                  </div>
                  <ChevronDown
                    className={`text-slate-400 transition-transform ${isDaysOpen ? "rotate-180" : ""}`}
                    size={20}
                  />
                </button>
                {isDaysOpen && (
                  <div className="absolute top-full left-0 w-full mt-3 bg-white border border-slate-100 rounded-[2.5rem] shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95">
                    <div className="p-2 max-h-64 overflow-y-auto">
                      {uniqueDays.map((d) => (
                        <div
                          key={d}
                          onClick={() => {
                            setSelectedDay(d);
                            setSelectedTeacher(null);
                            setIsDaysOpen(false);
                          }}
                          className={`flex items-center justify-between p-4 rounded-[1.8rem] cursor-pointer ${selectedDay === d ? "bg-[#DC8916]/10 text-[#DC8916]" : "hover:bg-slate-50 text-slate-600"}`}
                        >
                          <span className="text-sm font-bold uppercase tracking-widest">
                            {d}
                          </span>
                          {selectedDay === d && <CheckCircle2 size={16} />}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}

          {selectedDay && (
            <section className="space-y-6 animate-in fade-in slide-in-from-top-4">
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 flex items-center gap-3">
                <span className="w-10 h-[2px] bg-[#DC8916]" /> Choose Mentor
              </h3>
              <div className="relative max-w-md">
                <button
                  onClick={() => setIsMentorOpen(!isMentorOpen)}
                  className={`w-full p-5 rounded-[2rem] border-2 flex items-center justify-between transition-all bg-white ${isMentorOpen ? "border-[#DC8916] shadow-lg" : "border-slate-100"}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-[#DC8916] font-bold">
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
                    className={`text-slate-400 transition-transform ${isMentorOpen ? "rotate-180" : ""}`}
                    size={20}
                  />
                </button>
                {isMentorOpen && (
                  <div className="absolute top-full left-0 w-full mt-3 bg-white border border-slate-100 rounded-[2.5rem] shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95">
                    <div className="p-2 max-h-64 overflow-y-auto">
                      {availableTeachers.map((t) => (
                        <div
                          key={t.id}
                          onClick={() => {
                            setSelectedTeacher(t);
                            setIsMentorOpen(false);
                          }}
                          className={`flex items-center justify-between p-4 rounded-[1.8rem] cursor-pointer ${selectedTeacher?.id === t.id ? "bg-[#DC8916]/10 text-[#DC8916]" : "hover:bg-slate-50 text-slate-600"}`}
                        >
                          <div className="flex items-center gap-4">
                            <div
                              className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black ${selectedTeacher?.id === t.id ? "bg-[#DC8916] text-white" : "bg-slate-100 text-slate-400"}`}
                            >
                              {t.name.charAt(0).toUpperCase()}
                            </div>
                            <span className="text-sm font-bold uppercase tracking-widest">
                              {t.name}
                            </span>
                          </div>
                          {selectedTeacher?.id === t.id && (
                            <CheckCircle2 size={16} />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}

          {selectedTeacher && (
            <div className="space-y-16 animate-in fade-in slide-in-from-bottom-6">
              <div className="h-[2px] bg-slate-50 w-full" />
              <StartDate />
              <SelectCounsellor />
            </div>
          )}
        </div>

        <div className="relative">
          <div className="sticky top-28 bg-zinc-900 text-white p-10 rounded-[3.5rem] shadow-2xl border border-zinc-800">
            {isReady ? (
              <UnlockedPricing
                basePrice={basePrice}
                gstAmount={gstAmount}
                finalPrice={finalPrice}
                handleApplyCoupon={handleApplyCoupon}
                handlePayment={handlePayment}
              />
            ) : (
              <LockedPricing />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
