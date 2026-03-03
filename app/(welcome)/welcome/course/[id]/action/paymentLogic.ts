import getUserProfileDetails from "@/lib/user/getUserProfileDetails";
import { describe } from "zod/v4/core";
import calculateEndDate from "./calculateEndDate";
import createOrder from "@/lib/payment/createOrder";
export interface DataType {
  contact: string;
  description: string;
  email: string;
  profile_id: string;
  course_id: string;
  start_date: string;
  end_date: string;
  schedule_id: string;
  name: string;
  teacher_id: string;
  base_amount: number;
  gst_percentage: number;
  currency: string;
  discount_id?: string | null;
  discount_amount: number;
  counsellor_id?: string | null;
}
const paymentLogic = async ({
  id,
  course,
  startDate,
  selectedSchedule,
  selectedTeacher,
  appliedDiscount,
  counsellorId,
  discountId,
  currentPlan,
  basePrice,
}: any) => {
  const response = await getUserProfileDetails(id);
  const end_date = calculateEndDate(
    startDate,
    currentPlan.duration,
  ).toISOString();
  console.log("DATE ARE: ", startDate, end_date);
  const data: DataType = {
    contact: response.contact,
    description: course.description,
    email: response.email,
    profile_id: response.id,
    course_id: course.id,
    start_date: new Date(startDate).toISOString(),
    end_date: end_date,
    schedule_id: selectedSchedule.id,
    name: response.full_name,
    teacher_id: selectedTeacher.id,
    base_amount: basePrice,
    gst_percentage: Number(course.gst),
    currency: course.currency,
    discount_id: discountId,
    discount_amount: appliedDiscount,
    counsellor_id: counsellorId,
  };
  const result = await createOrder(data);
  console.log("SENDING PACKET: ", data);
};
export default paymentLogic;
