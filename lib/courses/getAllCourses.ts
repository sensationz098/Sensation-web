import { BASE_URL } from "@/config/api";

export default async function getAllCourses() {
  const response = await fetch(`${BASE_URL}/api/course`, {
    next: { revalidate: 7200 }, // 2 hour
  }).then((res) => res.json());
  return response.data.courses;
}
