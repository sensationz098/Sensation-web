export interface OtherCourseType {
  schedule: ScheduleType[];
  teacher: TeacherType[];
}

export interface ScheduleType {
  id: string;
  teacher_id: string;
  timing: string;
}

export interface TeacherType {
  id: string;
  name: string;
}
