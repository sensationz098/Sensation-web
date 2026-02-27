"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import getEnrolledCourses from "@/lib/courses/getEnrolledCourses";
import { EnrolledCourse } from "@/types/EnrolledCourse";
import EnrolledCourses from "@/components/Student/EnrolledCourses";
import getProfileId from "@/lib/user/getProfileId";

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
      <div className="p-20 text-center text-slate-400 font-bold">
        No active enrollments found.
      </div>
    );
  }
  return <EnrolledCourses courses={courses} />;
};

export default EnrollmentPage;
