"use client";
import React, { useState } from "react";
import { COURSES } from "@/data/courses";

export default function Categories() {
  const [activeTab, setActiveTab] = useState("Kathak");
  const brandOrange = "#DC8916";
  const categories = ["Kathak", "Yoga", "Dance", "Music", "Spoken English"];

  const filtered = COURSES.filter((c) => c.category === activeTab);

  return (
    <div className="py-16 px-4 max-w-7xl mx-auto">
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all border ${activeTab === cat ? "text-white" : "text-muted-foreground border-white/10"}`}
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filtered.map((course) => (
          <div
            key={course.id}
            className="bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden backdrop-blur-sm group hover:border-[#DC8916]/50 transition-colors"
          >
            <div className="aspect-video relative overflow-hidden">
              <img
                src={course.image_url}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                alt={course.title}
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
              <div className="flex justify-between items-center pt-4 border-t border-white/5">
                <span className="text-xs font-bold text-[#DC8916]">
                  {course.course_teachers[0]}
                </span>
                <button
                  className="px-5 py-2 rounded-xl text-white text-xs font-bold transition-opacity hover:opacity-80"
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
