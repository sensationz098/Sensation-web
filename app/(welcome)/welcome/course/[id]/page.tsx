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
} from "lucide-react";

// Assuming your fetch helper is located here
import getSpecificCourse from "@/lib/courses/getSpecificCourse";

export default function CourseDetailView() {
  const params = useParams();
  const id = params.id as string;

  const [course, setCourse] = useState<any | null>(null);
  const [selectedPlanIndex, setSelectedPlanIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDetails = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const data = await getSpecificCourse(id);
        setCourse(data);
      } catch (error) {
        console.error("Error fetching course:", error);
      } finally {
        setLoading(false);
      }
    };
    getDetails();
  }, [id]);

  if (loading)
    return (
      <div className="p-20 text-center animate-pulse text-slate-400 font-black italic">
        LOADING MASTERCLASS...........
      </div>
    );
  if (!course)
    return <div className="p-20 text-center font-bold">Course! not found.</div>;

  const currentPlan = course.duration[selectedPlanIndex];
  const basePrice = currentPlan?.discounted_price || currentPlan?.price || 0;
  const gstAmount = (basePrice * (course.gst || 0)) / 100;
  const finalPrice = basePrice + gstAmount;

  const handleBuyNow = () => {
    console.log(
      "Initiating purchase for:",
      course.title,
      "Plan:",
      currentPlan.duration,
    );
    // Logic: router.push(`/checkout?courseId=${course.id}&planId=${currentPlan.id}`)
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* 1. Hero Image Section */}
      <div className="relative w-full h-[45vh] lg:h-[55vh] bg-slate-900">
        <Image
          src={course.image_url}
          alt={course.title}
          fill
          priority
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-20 -mt-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* 2. Left Side: Content & Plan Selection */}
          <div className="lg:col-span-2 space-y-10">
            <div className="bg-white/90 backdrop-blur-md p-8 md:p-12 rounded-[3rem] border border-slate-100 shadow-sm">
              <span className="px-4 py-1 rounded-full bg-[#DC8916] text-white text-[10px] font-black uppercase tracking-widest">
                {course.category}
              </span>
              <h1 className="text-5xl md:text-7xl font-black text-slate-900 mt-6 leading-[0.9] italic uppercase tracking-tighter">
                {course.title}
              </h1>
              <p className="text-xl text-slate-500 mt-8 leading-relaxed font-medium italic">
                "{course.description}"
              </p>
            </div>

            {/* PLAN SELECTOR GRID */}
            <div className="space-y-6">
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-3">
                <span className="w-10 h-[2px] bg-[#DC8916]" /> Choose Your
                Membership
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {course.duration.map((plan: any, index: number) => (
                  <button
                    key={plan.id}
                    onClick={() => setSelectedPlanIndex(index)}
                    className={`relative p-6 rounded-[2rem] border-2 transition-all text-left overflow-hidden ${
                      selectedPlanIndex === index
                        ? "border-[#DC8916] bg-[#DC8916]/5 shadow-md"
                        : "border-slate-100 bg-white hover:border-slate-200"
                    }`}
                  >
                    <p
                      className={`text-[10px] font-black uppercase tracking-tighter ${selectedPlanIndex === index ? "text-[#DC8916]" : "text-slate-400"}`}
                    >
                      {plan.duration}
                    </p>
                    <div className="mt-2">
                      <p className="text-2xl font-black text-slate-900 leading-none">
                        {course.currency} {plan.price}
                      </p>
                      {/* <p className="text-[10px] text-slate-400 line-through font-bold mt-1">
                        {course.currency}
                        {plan.price}
                      </p> */}
                    </div>
                    {selectedPlanIndex === index && (
                      <CheckCircle2
                        className="absolute top-4 right-4 text-[#DC8916]"
                        size={16}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Instructor & Info Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8 rounded-[2.5rem] bg-slate-50 flex items-center gap-5 border border-slate-100">
                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-[#DC8916] shadow-sm">
                  <User size={28} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Mentor
                  </p>
                  <p className="text-lg font-black text-slate-800">
                    {course.teacher_name}
                  </p>
                </div>
              </div>
              <div className="p-8 rounded-[2.5rem] bg-slate-50 flex items-center gap-5 border border-slate-100">
                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-[#DC8916] shadow-sm">
                  <Calendar size={28} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Live Schedule
                  </p>
                  <p className="text-lg font-black text-slate-800">
                    {course.days?.join(", ") || "Flexible"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Right Side: Sticky Checkout Card */}
          <div className="relative">
            <div className="sticky top-28 bg-zinc-900 text-white p-10 rounded-[3.5rem] shadow-2xl shadow-[#DC8916]/20 border border-zinc-800">
              <div className="space-y-8">
                <div>
                  <p className="text-[10px] font-black text-[#DC8916] uppercase tracking-[0.3em] mb-3">
                    Pricing
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black tracking-tighter">
                      {course.currency} {finalPrice.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-zinc-500 font-bold uppercase">
                      INCL. GST
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 mt-2 font-medium">
                    Selected Plan:{" "}
                    <span className="text-white font-bold">
                      {currentPlan.duration} Access
                    </span>
                  </p>
                </div>

                <div className="space-y-4 pt-6 border-t border-zinc-800">
                  <div className="flex items-center gap-3 text-sm text-zinc-400 font-medium">
                    <ShieldCheck size={18} className="text-[#DC8916]" /> Secure
                    Enrollment
                  </div>
                  <div className="flex items-center gap-3 text-sm text-zinc-400 font-medium">
                    <Zap size={18} className="text-[#DC8916]" /> Certification
                    Included
                  </div>
                </div>

                <button
                  onClick={handleBuyNow}
                  className="group relative w-full h-18 py-5 bg-[#DC8916] hover:bg-[#f3a02d] text-white rounded-2xl font-black text-sm uppercase tracking-[0.2em] transition-all overflow-hidden flex items-center justify-center gap-3 shadow-xl shadow-[#DC8916]/40 active:scale-95"
                >
                  <CreditCard size={18} />
                  <span>Buy Now</span>
                  <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
                </button>

                <div className="flex flex-col items-center gap-2 opacity-40">
                  <p className="text-[9px] font-bold uppercase tracking-widest">
                    Available in {course.country}
                  </p>
                  <div className="h-[1px] w-12 bg-zinc-700" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Mobile Sticky Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-2xl border-t border-slate-100 p-6 px-10 flex items-center justify-between z-50">
        <div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">
            Plan: {currentPlan.duration}
          </p>
          <p className="text-2xl font-black text-slate-900">
            {course.currency}
            {finalPrice.toLocaleString()}
          </p>
        </div>
        <button
          onClick={handleBuyNow}
          className="h-14 px-10 bg-[#DC8916] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-[#DC8916]/20 active:scale-95"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}
