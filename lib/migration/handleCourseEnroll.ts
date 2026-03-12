import { BASE_URL } from "@/config/api";
import { MigrationCourseType } from "@/types/MigrationCourseType";
import getProfileId from "../user/getProfileId";

export default async function handleCourseEnroll(
  migrationCourse: MigrationCourseType[],
  id: string,
) {
  try {
    const profileId = await getProfileId(id);

    const coursesWithProfile = migrationCourse.map((c) => ({
      ...c,
      profile_id: profileId,
    }));

    const response = await fetch(`${BASE_URL}/api/enroll/migrate-enroll`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: coursesWithProfile }),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.error || "Enrollment failed",
      };
    }

    return { success: true, data: result };
  } catch (error: any) {
    console.error("Enrollment Exception:", error);
    return {
      success: false,
      error: error.message || "An unexpected error occurred",
    };
  }
}
