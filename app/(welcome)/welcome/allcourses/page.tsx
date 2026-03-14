import getAllCourses from "@/lib/courses/getAllCourses";
import CourseDisplay from "@/components/Products/CourseDisplay";

export default async function Page() {
  const { courses } = await getAllCourses();
  const allCourses = courses || [];

  if (courses.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-slate-400">No courses available right now.</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      <CourseDisplay courses={allCourses} />
    </main>
  );
}
