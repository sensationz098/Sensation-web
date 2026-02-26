"use client";
import React, { useState, useMemo } from "react";
import { COURSES } from "@/data/courses";

export default function Categories() {
  const [activeTab, setActiveTab] = useState("Kathak");
  const brandOrange = "#DC8916";
  const categories = ["Kathak", "Yoga", "Dance", "Music", "Spoken English"];

  // 1. Optimize: Prevent re-filtering on every minor re-render
  const filtered = useMemo(() => {
    return COURSES.filter((c) => c.category === activeTab);
  }, [activeTab]);

  return (
    <div className="py-16 px-4 max-w-7xl mx-auto">
      {/* Category Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all border duration-200 ${
              activeTab === cat
                ? "text-white"
                : "text-muted-foreground border-slate-200 bg-white"
            }`}
            style={
              activeTab === cat
                ? { backgroundColor: brandOrange, borderColor: brandOrange }
                : {}
            }
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 2. Optimize: Use a fixed grid height or key-based transitions if possible */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 transition-opacity duration-300">
        {filtered.map((course) => (
          <div
            key={course.id}
            className="bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden group hover:border-[#DC8916]/50 hover:shadow-xl transition-all duration-300"
          >
            <div className="aspect-video relative overflow-hidden bg-slate-100">
              <img
                src={course.image_url}
                // 3. Optimize: will-change tells the browser to use GPU for the zoom effect
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 will-change-transform"
                alt={course.title}
                loading="lazy" // Prevent loading all images at once
              />
              <div className="absolute top-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-[10px] font-bold text-white uppercase">
                {course.currency} {course.price}
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{course.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                {course.description}
              </p>
              <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                <span className="text-xs font-bold text-[#DC8916]">
                  {course.course_teachers[0]}
                </span>
                <button
                  className="px-5 py-2 rounded-xl text-white text-xs font-bold transition-transform active:scale-95 hover:opacity-90"
                  style={{ backgroundColor: brandOrange }}
                >
                  Buy Course
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
