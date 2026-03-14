import { BASE_URL } from "@/config/api";

export default async function getSpecificCourse(id: string | string[]) {
  const response = await fetch(`${BASE_URL}/api/course/get-course/${id}`, {
    next: { revalidate: 7200 },
  }).then((res) => res.json());
  console.log("COURSE: ", response.data);
  return response.data;
}
