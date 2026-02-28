"use client";
import React, { useState, useMemo } from "react";
import { COURSES } from "@/data/courses";
import { Category } from "@/types/CategoryType";
import { CourseType } from "@/types/CourseType";
import Image from "next/image";
import Link from "next/link";

export default function Categories({
  categories,
  courses,
}: {
  categories: Category[];
  courses: CourseType[];
}) {
  const [activeTab, setActiveTab] = useState("Fitness");
  const brandOrange = "#DC8916";

  // 1. Optimize: Prevent re-filtering on every minor re-render
  const filtered = useMemo(() => {
    return courses.filter((c) => c.category === activeTab);
  }, [activeTab]);

  return (
    <div className="py-16 px-4 max-w-7xl mx-auto">
      {/* Category Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((cat: Category, id) => (
          <button
            // 1. Use a unique string/number for the key, not the whole object
            key={id}
            // 2. Compare the activeTab string against the category name
            onClick={() => setActiveTab(cat.category)}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all border duration-200 ${
              activeTab === cat.category
                ? "text-white"
                : "text-muted-foreground border-slate-200 bg-white"
            }`}
            style={
              activeTab === cat.category
                ? { backgroundColor: brandOrange, borderColor: brandOrange }
                : {}
            }
          >
            {/* 3. Render the name property of the object */}
            {cat.category}
          </button>
        ))}
      </div>

      {/* 2. Optimize: Use a fixed grid height or key-based transitions if possible */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 transition-opacity duration-300">
        {filtered.map((courses: CourseType) => (
          <Link href={`/welcome/course/${courses.id}`}>
            <div
              key={courses.id}
              className="bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden group hover:border-[#DC8916]/50 hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-video relative overflow-hidden bg-slate-100">
                <Image
                  fill
                  src={courses.image_url}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 will-change-transform"
                  alt={courses.title}
                  loading="lazy"
                />
                <div className="absolute top-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-[10px] font-bold text-white uppercase">
                  {courses.currency} {courses.price}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{courses.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                  {courses.description}
                </p>
                <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                  <span className="text-xs font-bold text-[#DC8916]">
                    {courses.teacher_name}
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
          </Link>
        ))}
      </div>
    </div>
  );
}
