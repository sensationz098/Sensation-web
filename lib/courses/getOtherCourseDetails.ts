import { BASE_URL } from "@/config/api";

export default async function getOtherCourseDetails(id: string) {
  const response = await fetch(
    `${BASE_URL}/api/course/get-course/enroll-details/${id}`,
  ).then((res) => res.json());

  const data = {
    schedule: response.data.enroll.schedule,
    teacher: response.data.enroll.teacher,
  };
  return data;
}
