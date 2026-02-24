import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LockKeyhole } from "lucide-react";
import Link from "next/link";

const courses = [
  {
    id: 1,
    title: "General Yoga",
    category: "Yoga",
    image: "/yoga.png",
  },
  {
    id: 2,
    title: "Kathak",
    category: "Dance",
    image: "/kathak.png",
  },
  {
    id: 3,
    title: "Ladies Dance",
    category: "Dance",
    image: "/dance.png",
  },
  {
    id: 4,
    title: "Guitar & Keyboard",
    category: "Music",
    image: "/music.png",
  },
  {
    id: 5,
    title: "English Spoken",
    category: "Language",
    image: "/speaking.png",
  },
];

const CourseCatalog = () => {
  const brandColor = "#DC8916";

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 font-sans">
      {/* Top Navigation / Header */}
      <header className="max-w-6xl mx-auto flex justify-between items-center ">
        <div className="flex flex-col">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight tracking-tight">
            Sensationz
            <span className="block sm:inline" style={{ color: brandColor }}>
              {" "}
              Performing{" "}
            </span>
            Arts
          </h1>
        </div>
        <Link href={"/login"}>
          <Button
            style={{ backgroundColor: brandColor }}
            className="hover:brightness-110 shadow-lg shadow-[#DC8916]/20 transition-all"
          >
            Login
          </Button>
        </Link>
      </header>
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        {/* Subtle Top Badge */}
        <span
          className="mb-4 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.2em]"
          style={{ backgroundColor: `${brandColor}15`, color: brandColor }}
        >
          World-Class Learning
        </span>

        {/* Main Heading */}
        <h2 className="max-w-3xl text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
          Explore some of our <br />
          <span className="relative">
            <span style={{ color: brandColor }}>Exclusive Courses</span>
            {/* Decorative hand-drawn style underline */}
            <svg
              className="absolute -bottom-2 left-0 w-full h-3"
              viewBox="0 0 300 12"
              fill="none"
            >
              <path
                d="M4 9c40-4 120-7 292-1"
                stroke={brandColor}
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </h2>

        <p className="mt-8 max-w-xl text-lg text-slate-500 font-medium leading-relaxed">
          From traditional arts to modern languages, unlock your potential with
          curriculums designed by industry experts.
        </p>
      </div>
      {/* Course Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
        {courses.map((course) => (
          <Link href={"/login"}>
            <Card
              key={course.id}
              className="cursor-pointer group border-none shadow-md hover:shadow-2xl transition-all duration-300 bg-white"
            >
              <div className="relative aspect-video overflow-hidden rounded-t-xl">
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10" />
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <CardHeader>
                <Badge
                  variant="outline"
                  style={{ color: brandColor, borderColor: brandColor }}
                  className="w-fit"
                >
                  {course.category}
                </Badge>
                <CardTitle className="pt-2 text-slate-800">
                  {course.title}
                </CardTitle>
              </CardHeader>
              <CardFooter>
                <p
                  className="text-sm text-slate-500 font-medium cursor-pointer"
                  style={{ color: brandColor }}
                >
                  Explore Syllabus →
                </p>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>

      {/* Modern Bottom Login Card */}
      <section className="max-w-4xl mx-auto">
        <div className="mt-20 relative overflow-hidden rounded-3xl bg-slate-900 p-8 md:p-12 text-center shadow-2xl">
          {/* Background Decorative Glow */}
          <div
            className="absolute -top-24 -right-24 h-64 w-64 rounded-full blur-[100px] opacity-20"
            style={{ backgroundColor: brandColor }}
          ></div>

          <div className="relative z-10 flex flex-col items-center">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md">
              <LockKeyhole size={32} style={{ color: brandColor }} />
            </div>
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
              Ready to see the full curriculum?
            </h2>
            <p className="mb-8 max-w-lg text-slate-400">
              Join 50,000+ students today. Login to unlock advanced UI layouts,
              personalized learning paths, and certificate tracking.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={"/login"}>
                <Button
                  size="lg"
                  style={{ backgroundColor: brandColor }}
                  className="px-10 py-6 text-lg font-bold hover:scale-105 transition-transform"
                >
                  Login to Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CourseCatalog;
