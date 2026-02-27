import { BASE_URL } from "@/config/api";
import { useAuth } from "@/context/AuthContext";

export default async function getEnrolledCourses(id: string) {
  const response = await fetch(
    `${BASE_URL}/api/enroll/enroll-course/${id}`,
  ).then((res) => res.json());
  return response;
}
