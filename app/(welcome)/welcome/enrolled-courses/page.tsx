"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import getEnrolledCourses from "@/lib/courses/getEnrolledCourses";
import { EnrolledCourse } from "@/types/EnrolledCourse";
import EnrolledCourses from "@/components/Student/EnrolledCourses";
import getProfileId from "@/lib/user/getProfileId";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const EnrollmentPage = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState<EnrolledCourse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      if (user?.uid) {
        try {
          const id = await getProfileId(user.uid);
          const data = await getEnrolledCourses(id);
          setCourses(data || []);
        } catch (error) {
          console.error("Failed to fetch enrollments:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCourses();
  }, [user?.uid]);

  if (!user)
    return <div className="p-20 text-center">404: Unauthenticated!</div>;
  if (loading)
    return (
      <div className="p-20 text-center text-slate-400">
        Loading your courses...
      </div>
    );

  if (!Array.isArray(courses) || courses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <div className="text-center text-slate-400 font-bold">
          No active enrollments found.
        </div>

        <div className="flex gap-2">
          {" "}
          <Link href={"/welcome/allcourses"}>
            <Button variant="outline">Explore all courses</Button>
          </Link>
          <Link href={"/welcome/enrolled-courses/migration"}>
            <Button>Migrate Data</Button>
          </Link>
        </div>
      </div>
    );
  }
  return <EnrolledCourses courses={courses} />;
};

export default EnrollmentPage;
