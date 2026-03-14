import ChatBot from "@/components/Home/ChatBot";
import Categories from "@/components/Products/Categories";
import ExploreAll from "@/components/Products/ExploreAll";
import FeaturedCourses from "@/components/Products/FeaturedCourses";
import getAllCategories from "@/lib/categories/getAllCategories";
import getAllCourses from "@/lib/courses/getAllCourses";
import getDiscountCoupons from "@/lib/courses/getDiscountCoupons";
import getFeaturedCourses from "@/lib/courses/getFeaturedCourses";
import { Category } from "@/types/CategoryType";
import { CourseType } from "@/types/CourseType";
import { DiscountType } from "@/types/DiscountType";
import { FeaturedType } from "@/types/FeaturedType";

export default async function page() {
  const coursesData = await getAllCourses();
  const categories: Category[] = await getAllCategories();
  const featuredCourses: FeaturedType[] = await getFeaturedCourses();
  const courses: CourseType[] = coursesData.courses;
  const courseCount: number = coursesData.count;
  if (!courses || !categories || !featuredCourses)
    return <div>Error fetching data</div>;

  return (
    <div>
      <Categories categories={categories} courses={courses} />
      <FeaturedCourses featuredCourses={featuredCourses} />
      <ExploreAll courseCount={courseCount} />
      <ChatBot />
    </div>
  );
}
