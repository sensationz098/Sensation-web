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
} from "lucide-react";

import getSpecificCourse from "@/lib/courses/getSpecificCourse";
import getOtherCourseDetails from "@/lib/courses/getOtherCourseDetails";
import {
  OtherCourseType,
  TeacherType,
  ScheduleType,
} from "@/types/OtherCourseType";

export default function CourseDetailView() {
  const params = useParams();
  const id = params.id as string;

  // --- States ---
  const [course, setCourse] = useState<any | null>(null);
  const [otherDetails, setOtherDetails] = useState<OtherCourseType | null>(
    null,
  );
  const [loading, setLoading] = useState(true);

  // --- Selection States ---
  const [selectedPlanIndex, setSelectedPlanIndex] = useState(0);
  const [selectedTeacher, setSelectedTeacher] = useState<TeacherType | null>(
    null,
  );
  const [selectedSchedule, setSelectedSchedule] = useState<ScheduleType | null>(
    null,
  );

  useEffect(() => {
    const fetchAllData = async () => {
      if (!id) return;
      try {
        setLoading(true);
        // Parallel fetching for performance
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
  const isReady = selectedTeacher && selectedSchedule;
  const currentPlan = course.duration[selectedPlanIndex];
  const basePrice = currentPlan?.discounted_price || currentPlan?.price || 0;
  const gstAmount = (basePrice * (Number(course.gst) || 0)) / 100;
  const finalPrice = basePrice + gstAmount;

  // Filter schedules based on selected teacher
  const availableSchedules = otherDetails?.schedule.filter(
    (s) => s.teacher_id === selectedTeacher?.id,
  );

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
                      {t.name.charAt(0)}
                    </div>
                    <span className="font-bold text-slate-800">{t.name}</span>
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
              {course.duration.map((plan: any, index: number) => (
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
                  <p className="font-black text-slate-900 italic">BASE PLAN</p>
                </button>
              ))}
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
                    Tuition Fee
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black tracking-tighter">
                      {course.currency} {finalPrice.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-zinc-500 font-bold uppercase">
                      INCL. GST
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-500 uppercase font-bold">
                      Mentor
                    </span>
                    <span className="text-white font-bold">
                      {selectedTeacher.name}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-500 uppercase font-bold">
                      Timing
                    </span>
                    <span className="text-white font-bold">
                      {selectedSchedule?.timing}
                    </span>
                  </div>
                </div>

                <button className="w-full h-18 py-5 bg-[#DC8916] hover:bg-[#f3a02d] text-white rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl shadow-[#DC8916]/30 active:scale-95 flex items-center justify-center gap-3">
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
                    Please select a mentor and timing slot to see the final
                    investment amount.
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
