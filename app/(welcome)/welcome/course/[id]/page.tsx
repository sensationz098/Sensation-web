"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import getSpecificCourse from "@/lib/courses/getSpecificCourse";
import getOtherCourseDetails from "@/lib/courses/getOtherCourseDetails";
import createOrder from "@/lib/payment/createOrder";
import discountLogic from "./action/discountLogic";
import Hero from "./Components/Hero";
import Heading from "./Components/Heading";
import SelectTeacher from "./Components/SelectTeacher";
import Timings from "./Components/Timings";
import SelectPlan from "./Components/SelectPlan";
import StartDate from "./Components/StartDate";
import SelectCounsellor from "./Components/SelectCounsellor";
import UnlockedPricing from "./Components/UnlockedPricing";
import LockedPricing from "./Components/LockedPricing";
import { CourseType } from "@/types/CourseType";
import { useCourseStore } from "@/store/useCourseStore";
import { getProfile } from "@/app/onboarding/actions/getProfile";
import { useAuth } from "@/context/AuthContext";
import getUserProfileDetails from "@/lib/user/getUserProfileDetails";
import paymentLogic from "./action/paymentLogic";

export default function CourseDetailView() {
  const params = useParams();
  const id = params.id as string;
  const {
    discountId,
    course,
    setCourse,
    isMentorOpen,
    otherDetails,
    setOtherDetails,
    loading,
    setLoading,
    selectedPlanIndex,
    setSelectedPlanIndex,
    selectedTeacher,
    setSelectedTeacher,
    startDate,
    setStartDate,
    counsellorId,
    setCounsellorId,
    couponInput,
    setCouponInput,
    appliedDiscount,
    setAppliedDiscount,
    couponError,
    setCouponError,
    setIsMentorOpen,
    selectedSchedule,
    setSelectedSchedule,
  } = useCourseStore();
  useEffect(() => {
    const fetchAllData = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const [courseData, otherData] = await Promise.all([
          getSpecificCourse(id),
          getOtherCourseDetails(id),
        ]);
        setCourse(courseData);
        setOtherDetails(otherData);
      } catch (error) {
        console.error("Error fetching course data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, [id]);
  const { user } = useAuth();

  if (loading)
    return (
      <div className="p-20 text-center animate-pulse">
        LOADING MASTERCLASS...
      </div>
    );
  if (!course)
    return <div className="p-20 text-center font-bold">Course not found.</div>;

  // --- Logic & Calculations ---
  const isReady = selectedTeacher && selectedSchedule && startDate;
  const currentPlan = course.duration[selectedPlanIndex];
  const basePrice = currentPlan?.discounted_price || currentPlan?.price || 0;
  const gstAmount = (basePrice * (Number(course.gst) || 0)) / 100;
  const finalPrice = basePrice + gstAmount - appliedDiscount;
  const availableSchedules = otherDetails?.schedule.filter(
    (s) => s.teacher_id === selectedTeacher?.id,
  );
  const handlePayment = async () => {
    if (!user) return;
    paymentLogic({
      id: user.uid,
      course,
      startDate,
      selectedSchedule,
      selectedTeacher,
      appliedDiscount,
      counsellorId,
      discountId,
      currentPlan,
      basePrice,
    });
  };

  const handleApplyCoupon = async () => {
    const response = await discountLogic(
      couponInput,
      finalPrice,
      setCouponError,
    );
    setAppliedDiscount(response);
  };
  return (
    <div className="min-h-screen bg-white pb-32">
      <Hero url={course.image_url} alt={course.title} />

      <div className="max-w-7xl mx-auto px-6 lg:px-20 -mt-24 relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          <Heading category={course.category} title={course.title} />

          <SelectTeacher />
          <Timings availableSchedules={availableSchedules} />

          <SelectPlan />
          <StartDate />
          <SelectCounsellor />
        </div>

        <div className="relative">
          <div className="sticky top-28 bg-zinc-900 text-white p-10 rounded-[3.5rem] shadow-2xl border border-zinc-800 overflow-hidden">
            {isReady ? (
              <UnlockedPricing
                basePrice={basePrice}
                gstAmount={gstAmount}
                handleApplyCoupon={handleApplyCoupon}
                finalPrice={finalPrice}
                handlePayment={handlePayment}
              />
            ) : (
              <LockedPricing />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
