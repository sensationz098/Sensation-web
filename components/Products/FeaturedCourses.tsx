"use client";
import React from "react";
import { COURSES } from "@/data/courses";
import { FeaturedType } from "@/types/FeaturedType";
import Image from "next/image";
import Link from "next/link";

export default function FeaturedCourses({
  featuredCourses,
}: {
  featuredCourses: FeaturedType[];
}) {
  const brandOrange = "#DC8916";

  return (
    <div className="py-10 px-4 max-w-7xl mx-auto">
      <h2
        className="text-2xl font-black mb-8 border-l-4 pl-4"
        style={{ borderColor: brandOrange }}
      >
        RECOMMENDED FOR YOU
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredCourses.map((course) => (
          <Link href={`/welcome/course/${course.id}`}>
            <div
              key={course.id}
              className="relative group rounded-3xl overflow-hidden aspect-[4/5] bg-zinc-900 border border-white/10"
            >
              <Image
                fill
                src={course.image_url}
                alt={course.title}
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <h3 className="text-white font-bold text-lg mb-2">
                  {course.title}
                </h3>
                <button
                  className="px-6 py-2 rounded-xl text-white text-xs font-bold w-full backdrop-blur-md border border-white/20"
                  style={{ backgroundColor: `${brandOrange}CC` }}
                >
                  Quick Enroll
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
