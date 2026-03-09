export interface OtherCourseType {
  duration: DurationType[];
  schedule: ScheduleType[];
  teacher: TeacherType[];
}

export interface ScheduleType {
  id: string;
  teacher_id: string;
  timing: string;
  days: string[];
}

export interface TeacherType {
  id: string;
  name: string;
}

export interface DurationType {
  id: string;
  duration: string;
  price: number;
}
