import { BASE_URL } from "@/config/api";

export default async function getFeaturedCourses() {
  const response = await fetch(`${BASE_URL}/api/course/recommended-course`, {
    next: { revalidate: 7200 }, // 2 hour
  }).then((res) => res.json());
  return response.data;
}
