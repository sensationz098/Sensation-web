import Categories from "@/components/Products/Categories";
import ExploreAll from "@/components/Products/ExploreAll";
import FeaturedCourses from "@/components/Products/FeaturedCourses";
import getAllCategories from "@/lib/categories/getAllCategories";
import getAllCourses from "@/lib/courses/getAllCourses";
import getFeaturedCourses from "@/lib/courses/getFeaturedCourses";
import { Category } from "@/types/CategoryType";
import { CourseType } from "@/types/CourseType";
import { FeaturedType } from "@/types/FeaturedType";

export default async function page() {
  const courses: CourseType[] = await getAllCourses();
  const categories: Category[] = await getAllCategories();
  const featuredCourses: FeaturedType[] = await getFeaturedCourses();

  if (!courses || !categories) return <div>Loading</div>;
  return (
    <div>
      <Categories categories={categories} courses={courses} />
      <FeaturedCourses featuredCourses={featuredCourses} />
      <ExploreAll />
    </div>
  );
}
