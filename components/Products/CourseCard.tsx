"use client";

import React from "react";
import { User, ArrowRight, Star, Calendar, Globe } from "lucide-react";
import { CourseType } from "@/types/CourseType";
import Image from "next/image";

export default function CourseCard({ course }: { course: CourseType }) {
  const brandOrange = "#DC8916";

  // Logic: Final Price calculation (Base + GST)
  const finalPrice = course.price + (course.price * course.gst) / 100;

  return (
    <div className="group relative w-full bg-white border border-slate-100 rounded-[3rem] overflow-hidden transition-all duration-500 hover:shadow-[0_40px_80px_-20px_rgba(220,137,22,0.2)] hover:-translate-y-3">
      {/* --- Image Section --- */}
      <div className="relative aspect-[16/11] overflow-hidden">
        <Image
          src={course.image_url}
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />

        {/* Top Badges */}
        <div className="absolute top-6 left-6 flex gap-2">
          <span className="px-4 py-1.5 rounded-full bg-black/30 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest border border-white/10">
            {course.category}
          </span>
          {course.recommended && (
            <div className="bg-[#DC8916] p-2 rounded-full shadow-xl border border-white/20">
              <Star size={12} fill="white" color="white" />
            </div>
          )}
        </div>

        {/* Dynamic Price Tag */}
        <div className="absolute bottom-6 right-6 bg-white/80 backdrop-blur-xl border border-white/40 px-6 py-3 rounded-[2rem] shadow-2xl">
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">
            Full Course
          </p>
          <p className="text-2xl font-black text-slate-900 leading-none">
            <span className="text-sm mr-1 font-bold text-[#DC8916]">
              {course.currency}
            </span>
            {finalPrice.toLocaleString()}
          </p>
        </div>
      </div>

      {/* --- Content Section --- */}
      <div className="p-10">
        {/* Schedule & Location Row */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-1.5">
            {course.days.map((day) => (
              <span
                key={day}
                className="text-[10px] font-bold px-2 py-1 rounded-md bg-slate-50 text-slate-400 border border-slate-100 uppercase"
              >
                {day.substring(0, 3)}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-1 text-slate-300">
            <Globe size={12} />
            <span className="text-[10px] font-bold uppercase tracking-tighter">
              {course.country}
            </span>
          </div>
        </div>

        <h3 className="text-2xl font-black text-slate-800 mb-4 leading-tight group-hover:text-[#DC8916] transition-colors duration-300">
          {course.title}
        </h3>

        <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mb-10 font-medium italic">
          "{course.description}"
        </p>

        {/* --- Footer / CTA --- */}
        <div className="flex items-center justify-between pt-8 border-t border-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100 text-[#DC8916] group-hover:bg-[#DC8916] group-hover:text-white transition-all duration-300">
              <User size={20} />
            </div>
            <div>
              <p className="text-[9px] uppercase font-black text-slate-300 tracking-[0.2em] mb-0.5">
                Expert Mentor
              </p>
              <p className="text-sm font-black text-slate-700">
                {course.teacher_name}
              </p>
            </div>
          </div>

          <button
            className="group/btn relative overflow-hidden flex items-center gap-3 h-14 px-8 rounded-2xl text-white font-black text-xs uppercase tracking-widest transition-all active:scale-95 shadow-xl shadow-[#DC8916]/20"
            style={{ backgroundColor: brandOrange }}
          >
            <span className="relative z-10">Book Now</span>
            <ArrowRight
              size={16}
              className="relative z-10 group-hover/btn:translate-x-1 transition-transform"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
