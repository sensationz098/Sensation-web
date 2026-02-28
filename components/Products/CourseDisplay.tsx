"use client";
import { User, ArrowRight, Star, Calendar, Globe } from "lucide-react";
import { CourseType } from "@/types/CourseType";
import Image from "next/image";
import Link from "next/link";
export default function CourseDisplay({
  courses = [],
}: {
  courses: CourseType[];
}) {
  const brandOrange = "#DC8916";

  if (courses.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-slate-400 font-medium">
          No masterclasses available right now.
        </p>
      </div>
    );
  }

  return (
    <section className="py-10 px-6 max-w-7xl mx-auto">
      {/* 1. Header Section */}
      <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-5xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">
            Our <span style={{ color: brandOrange }}>Masterclasses</span>
          </h2>
          <p className="text-slate-500 mt-4 text-lg font-medium max-w-md">
            Professional artistic training curated by world-class mentors.
          </p>
        </div>
        <div className="px-6 py-2 bg-slate-100 rounded-full text-xs font-black uppercase tracking-widest text-slate-400">
          {courses.length} Programs Available
        </div>
      </div>

      {/* 2. Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {courses.map((course) => {
          // Calculation Logic
          const finalPrice = course.price + (course.price * course.gst) / 100;

          return (
            <Link href={`/welcome/course/${course.id}`}>
              <div
                key={course.id}
                className="group relative bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:shadow-[0_40px_80px_-20px_rgba(220,137,22,0.15)] hover:-translate-y-3"
              >
                {/* --- Image Section --- */}
                <div className="relative aspect-[16/11] overflow-hidden bg-slate-100">
                  <Image
                    src={course.image_url}
                    alt={course.title}
                    fill
                    priority={course.recommended} // High priority for featured courses
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />

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

                  <div className="absolute bottom-6 right-6 bg-white/80 backdrop-blur-xl border border-white/40 px-6 py-3 rounded-[2rem] shadow-2xl">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">
                      Total Course Fee
                    </p>
                    <p className="text-2xl font-black text-slate-900 leading-none">
                      <span className="text-sm mr-1 font-bold text-[#DC8916]">
                        {course.currency}
                      </span>
                      {course.price}
                    </p>
                  </div>
                </div>

                {/* --- Content Section --- */}
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex gap-1.5">
                      {course.days.map((day) => (
                        <span
                          key={day}
                          className="text-[9px] font-bold px-2 py-1 rounded-md bg-slate-50 text-slate-400 border border-slate-100 uppercase"
                        >
                          {day.substring(0, 3)}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-1 text-slate-300">
                      <Globe size={12} />
                      <span className="text-[9px] font-bold uppercase tracking-tighter">
                        {course.country}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-black text-slate-800 mb-3 leading-tight group-hover:text-[#DC8916] transition-colors duration-300">
                    {course.title}
                  </h3>

                  <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mb-8 font-medium italic">
                    {course.description}
                  </p>

                  {/* --- Mentor & CTA Footer --- */}
                  <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100 text-[#DC8916] group-hover:bg-[#DC8916] group-hover:text-white transition-all duration-300">
                        <User size={18} />
                      </div>
                      <div>
                        <p className="text-[8px] uppercase font-black text-slate-300 tracking-[0.2em] mb-0.5">
                          Faculty
                        </p>
                        <p className="text-sm font-black text-slate-700">
                          {course.teacher_name}
                        </p>
                      </div>
                    </div>

                    <button
                      className="flex items-center gap-3 h-12 px-6 rounded-2xl text-white font-black text-xs uppercase tracking-widest transition-all active:scale-95 shadow-xl shadow-[#DC8916]/20"
                      style={{ backgroundColor: brandOrange }}
                    >
                      Enroll Now
                      <ArrowRight
                        size={14}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
