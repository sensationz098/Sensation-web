export interface EnrolledCourse {
  id: string;
  start_date: string;
  end_date: string;
  course_title: string | null;
  course_days: string[];
  course_image_url: string | null;
  teacher_full_name: string | null;
  schedule_meeting_link: string | null;
  schedule_timing: string | null;
  schedule_whatsapp_link: string | null;
}
