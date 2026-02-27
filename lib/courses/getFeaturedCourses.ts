import { BASE_URL } from "@/config/api";

export default async function getFeaturedCourses() {
  const response = await fetch(
    `${BASE_URL}/api/course/recommended-course`,
  ).then((res) => res.json());
  return response.data;
}
