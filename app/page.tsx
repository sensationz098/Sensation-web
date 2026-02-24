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
      <header className="max-w-6xl mx-auto flex justify-between items-center mb-16">
        <div className="flex flex-col">
          <h1 className="text-3xl font-extrabold text-slate-900">
            Sensationz <span style={{ color: brandColor }}>Performing </span>{" "}
            Arts
          </h1>
        </div>
        <Button
          style={{ backgroundColor: brandColor }}
          className="hover:brightness-110 shadow-lg shadow-[#DC8916]/20 transition-all"
        >
          Login
        </Button>
      </header>

      {/* Course Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {courses.map((course) => (
          <Card
            key={course.id}
            className="group border-none shadow-md hover:shadow-2xl transition-all duration-300 bg-white"
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
        ))}
      </div>

      {/* Modern Bottom Login Card */}
      <section className="max-w-4xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl bg-slate-900 p-8 md:p-12 text-center shadow-2xl">
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
              <Button
                size="lg"
                style={{ backgroundColor: brandColor }}
                className="px-10 py-6 text-lg font-bold hover:scale-105 transition-transform"
              >
                Login to Account
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CourseCatalog;
