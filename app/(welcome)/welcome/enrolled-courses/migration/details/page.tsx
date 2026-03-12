"use client";
import React, { useEffect, useState } from "react";
import { useCourseStore } from "@/store/useCourseStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  User,
  Phone,
  CheckCircle2,
  ArrowRight,
  RefreshCcw,
  MessageCircle,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import handleCourseEnroll from "@/lib/migration/handleCourseEnroll";
import { useAuth } from "@/context/AuthContext";

const page = () => {
  const { migrationCourse } = useCourseStore();
  const { user } = useAuth();
  const router = useRouter();
  const [error, setError] = useState("");
  useEffect(() => {
    if (migrationCourse?.length == null)
      router.push("/welcome/enrolled-courses/migration");
  }, []);
  const handleCourseEnrollLogic = async () => {
    const response = await handleCourseEnroll(
      migrationCourse || [],
      user?.uid || "",
    );

    if (!response.success) {
      setError("Error enrolling in course");
      return;
    } else {
      router.push("/welcome/enolled-courses");
    }
  };
  if (!migrationCourse || migrationCourse.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <p className="text-slate-500 mb-4">No migrated courses found.</p>
        <Link href="/">
          <Button>ENROLL IN COURSES</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-2">
        <div className="flex justify-center">
          <CheckCircle2 className="h-16 w-16 text-green-500 animate-in zoom-in duration-500" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900">
          Migration Successful!
        </h1>
        <p className="text-slate-500">
          We found {migrationCourse.length} active enrollments linked to your
          profile.
        </p>
      </div>

      {/* Course List */}
      <div className="grid gap-6">
        {migrationCourse.map((item, index) => (
          <Card
            key={item._id || index}
            className="overflow-hidden border-l-4 border-l-primary hover:shadow-md transition-shadow"
          >
            <CardHeader className="bg-slate-50/50 pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <Badge
                    variant="outline"
                    className="mb-2 uppercase tracking-wider text-[10px]"
                  >
                    Enrolled Course
                  </Badge>
                  <CardTitle className="text-xl text-primary">
                    {item.course}
                  </CardTitle>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-400 font-mono">
                    ID: {item._id.slice(-6)}
                  </p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="grid md:grid-cols-2 gap-4 pt-6">
              {/* Left Column: Schedule Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Clock className="h-4 w-4 text-slate-400" />
                  <span>
                    <strong>Timing:</strong> {item.timing} (
                    {item.sanitizedTiming})
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <User className="h-4 w-4 text-slate-400" />
                  <span>
                    <strong>Teacher:</strong> {item.Teacher}
                  </span>
                </div>
              </div>

              {/* Right Column: Contact & Dates */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Phone className="h-4 w-4 text-slate-400" />
                  <span>
                    <strong>Contact:</strong> {item.contact}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Calendar className="h-4 w-4 text-slate-400" />
                  <span>
                    <strong>Duration:</strong> {item.CourseDuration} Months
                  </span>
                </div>
              </div>
            </CardContent>

            {/* <div className="px-6 pb-6 flex justify-end">
              <Button
                variant="ghost"
                size="sm"
                className="text-primary hover:text-primary/80 group"
              >
                Access Course{" "}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div> */}
          </Card>
        ))}
      </div>

      <div className="flex justify-center pt-8">
        <Button
          onClick={handleCourseEnrollLogic}
          variant="outline"
          size="lg"
          className="px-12"
        >
          Enroll in Courses
        </Button>
      </div>

      {error ? (
        <div className="flex flex-col items-center justify-center p-6 border border-red-100 bg-red-50 rounded-2xl transition-all animate-in fade-in zoom-in duration-300">
          <div className="w-full text-center space-y-6">
            {/* Error Message */}
            <div className="space-y-2">
              <div className="flex justify-center">
                <div className="bg-red-100 p-3 rounded-full">
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-red-900">
                Migration Issue
              </h3>
              <p className="text-red-700/80 max-w-xs mx-auto text-sm">
                {error}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <Button
                variant="destructive"
                className="w-full h-12 text-md font-semibold shadow-sm"
                onClick={() =>
                  window.open("https://wa.me/YOUR_WHATSAPP_NUMBER", "_blank")
                }
              >
                <MessageCircle className="mr-2 h-5 w-5" /> Raise a Ticket
              </Button>

              <Button
                variant="ghost"
                className="text-slate-500 hover:text-slate-800"
                onClick={() => window.location.reload()}
              >
                <RefreshCcw className="mr-2 h-4 w-4" /> Try Again
              </Button>
            </div>

            <p className="text-[10px] text-red-400 uppercase tracking-widest font-bold">
              Error Code: {error.split(":")[0]}
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default page;
