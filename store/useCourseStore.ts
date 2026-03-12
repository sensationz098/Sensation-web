import { CourseType } from "@/types/CourseType";
import { MigrationCourseType } from "@/types/MigrationCourseType";
import {
  OtherCourseType,
  ScheduleType,
  TeacherType,
} from "@/types/OtherCourseType";
import { create } from "zustand";

interface CourseState {
  course: any | null;
  otherDetails: OtherCourseType | null;
  loading: boolean;
  selectedPlanIndex: number;
  selectedTeacher: TeacherType | null;
  selectedSchedule: ScheduleType | null;
  startDate: string | undefined;
  counsellorId: string | undefined;
  couponInput: string;
  appliedDiscount: number;
  couponError: string | undefined;
  isMentorOpen: boolean;
  discountId: string | null;
  migrationCourse: MigrationCourseType[] | null;
  // availableSchedules: ScheduleType[] | null;

  // Actions
  setCourse: (course: CourseType | null) => void;
  setOtherDetails: (details: OtherCourseType | null) => void;
  setLoading: (loading: boolean) => void;
  setSelectedPlanIndex: (index: number) => void;
  setSelectedTeacher: (teacher: TeacherType | null) => void;
  setSelectedSchedule: (schedule: ScheduleType | null) => void;
  setStartDate: (date: string | undefined) => void;
  setCounsellorId: (id: string | undefined) => void;
  setCouponInput: (input: string) => void;
  setAppliedDiscount: (discount: number) => void;
  setCouponError: (error: string | undefined) => void;
  setIsMentorOpen: (isOpen: boolean) => void;
  setDiscountId: (id: string | null) => void;
  setMigrationCourse: (migrationCourse: MigrationCourseType[] | null) => void;
  // setAvailableSchedules: (schedules: ScheduleType[] | null) => void;
  resetStore: () => void;
}

const initialState = {
  course: null,
  otherDetails: null,
  loading: true,
  selectedPlanIndex: 0,
  selectedTeacher: null,
  selectedSchedule: null,
  startDate: undefined,
  counsellorId: undefined,
  couponInput: "",
  appliedDiscount: 0,
  couponError: undefined,
  isMentorOpen: false,
  discountId: null,
  migrationCourse: null,
  // availableSchedules: null,
};

export const useCourseStore = create<CourseState>((set) => ({
  ...initialState,

  // Actions
  setCourse: (course) => set({ course }),
  setOtherDetails: (otherDetails) => set({ otherDetails }),
  setLoading: (loading) => set({ loading }),
  setSelectedPlanIndex: (selectedPlanIndex) => set({ selectedPlanIndex }),
  setSelectedTeacher: (selectedTeacher) => set({ selectedTeacher }),
  setSelectedSchedule: (selectedSchedule) => set({ selectedSchedule }),
  setStartDate: (startDate) => set({ startDate }),
  setCounsellorId: (counsellorId) => set({ counsellorId }),
  setCouponInput: (couponInput) => set({ couponInput }),
  setAppliedDiscount: (appliedDiscount) => set({ appliedDiscount }),
  setCouponError: (couponError) => set({ couponError }),
  setIsMentorOpen: (isMentorOpen) => set({ isMentorOpen }),
  setDiscountId: (discountId) => set({ discountId }),
  setMigrationCourse: (migrationCourse) => set({ migrationCourse }),
  resetStore: () => set(initialState),
}));
