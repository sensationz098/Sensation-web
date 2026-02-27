"use client";

import React from "react";
import Image from "next/image";
import {
  Video,
  MessageCircle,
  Calendar,
  Clock,
  User,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { EnrolledCourse } from "@/types/EnrolledCourse";

export default function EnrolledCourses({
  courses,
}: {
  courses: EnrolledCourse[];
}) {
  const brandOrange = "#DC8916";

  return (
    <div className="space-y-8 py-10">
      <div className="grid grid-cols-1 gap-6">
        {courses.map((item) => (
          <div
            key={item.id}
            className="group relative bg-white border border-slate-100 rounded-[2rem] overflow-hidden hover:shadow-xl transition-all duration-300 p-4 md:p-6"
          >
            <div className="flex flex-col md:flex-row gap-6">
              {/* 1. Image Thumbnail with Date Badge */}
              <div className="relative w-full md:w-64 aspect-video md:aspect-square rounded-2xl overflow-hidden shrink-0">
                <Image
                  src={item.course_image_url || "/placeholder-course.jpg"}
                  alt={item.course_title || "Course"}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-md text-white text-[10px] px-3 py-1 rounded-full font-bold uppercase">
                  Active Member
                </div>
              </div>

              {/* 2. Middle Content: Course & Teacher Info */}
              <div className="flex-1 space-y-4">
                <div>
                  <h3 className="text-2xl font-black text-slate-800 tracking-tight group-hover:text-[#DC8916] transition-colors">
                    {item.course_title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 text-slate-400">
                    <User size={14} />
                    <span className="text-sm font-semibold italic">
                      with {item.teacher_full_name || "Assigned Faculty"}
                    </span>
                  </div>
                </div>

                {/* Schedule Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                    <div className="p-2 bg-white rounded-lg text-[#DC8916] shadow-sm">
                      <Clock size={16} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase leading-none mb-1">
                        Timing
                      </p>
                      <p className="text-sm font-bold text-slate-700">
                        {item.schedule_timing || "Not set"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                    <div className="p-2 bg-white rounded-lg text-[#DC8916] shadow-sm">
                      <Calendar size={16} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase leading-none mb-1">
                        Days
                      </p>
                      <p className="text-sm font-bold text-slate-700">
                        {item.course_days.length > 0
                          ? item.course_days.join(", ")
                          : "Check Portal"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Date Progress */}
                <div className="flex items-center gap-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                  <span>
                    Start: {new Date(item.start_date).toLocaleDateString()}
                  </span>
                  <ChevronRight size={12} />
                  <span>
                    End: {new Date(item.end_date).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* 3. Right Side: Quick Action Links */}
              <div className="flex flex-col justify-center gap-3 w-full md:w-56 border-t md:border-t-0 md:border-l border-slate-50 pt-6 md:pt-0 md:pl-6">
                {/* Join Meeting Button */}
                <a
                  href={item.schedule_meeting_link || "#"}
                  target="_blank"
                  className={`flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
                    item.schedule_meeting_link
                      ? "bg-[#DC8916] text-white shadow-lg shadow-[#DC8916]/30 hover:shadow-[#DC8916]/50 active:scale-95"
                      : "bg-slate-100 text-slate-400 cursor-not-allowed"
                  }`}
                >
                  <Video size={16} />
                  Join Class
                </a>

                {/* WhatsApp Group Button */}
                <a
                  href={item.schedule_whatsapp_link || "#"}
                  target="_blank"
                  className={`flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest border-2 transition-all ${
                    item.schedule_whatsapp_link
                      ? "border-green-500 text-green-500 hover:bg-green-50"
                      : "border-slate-100 text-slate-300 cursor-not-allowed"
                  }`}
                >
                  <MessageCircle size={16} />
                  Group Link
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
