import { BASE_URL } from "@/config/api";

export default async function getOtherCourseDetails(id: string) {
  const response = await fetch(
    `${BASE_URL}/api/course/get-course/enroll-details/${id}`,
    {
      next: { revalidate: 0 },
    },
  ).then((res) => res.json());

  const data = {
    duration: response.data.enroll.duration,
    schedule: response.data.enroll.schedule,
    teacher: response.data.enroll.teacher,
  };
  return data;
}
