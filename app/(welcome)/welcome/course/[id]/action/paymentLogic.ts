import getUserProfileDetails from "@/lib/user/getUserProfileDetails";
import { describe } from "zod/v4/core";
import calculateEndDate from "./calculateEndDate";

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
  const end_date = calculateEndDate(startDate, currentPlan.duration);
  const data = {
    contact: response.contact,
    description: course.description,
    email: response.email,
    profile_id: response.id,
    course_id: course.id,
    start_date: startDate,
    end_date: end_date,
    schedule_id: selectedSchedule.id,
    name: response.full_name,
    teacher_id: selectedTeacher.id,
    base_amount: basePrice,
    gst_percenage: response.gst,
    currency: response.currency,
    discount_id: discountId,
    discount_amount: appliedDiscount,
    counsellor_id: counsellorId,
  };
  console.log("SENDING PACKET: ", data);
};
export default paymentLogic;
