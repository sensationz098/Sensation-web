import { BASE_URL } from "@/config/api";

export default async function getSpecificCourse(id: string | string[]) {
  const response = await fetch(`${BASE_URL}/api/course/get-course/${id}`, {
    next: { revalidate: 100 },
  }).then((res) => res.json());
  console.log("Specific product data: ", response.data);
  return response.data;
}
