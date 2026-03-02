"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import {
  CreditCard,
  Zap,
  ShieldCheck,
  Calendar,
  Clock,
  User,
  Globe,
  CheckCircle2,
  Lock,
  CalendarDays,
  UserCheck,
  ChevronDown,
} from "lucide-react";

import getSpecificCourse from "@/lib/courses/getSpecificCourse";
import getOtherCourseDetails from "@/lib/courses/getOtherCourseDetails";
import {
  OtherCourseType,
  TeacherType,
  ScheduleType,
} from "@/types/OtherCourseType";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import createOrder from "@/lib/payment/createOrder";
import { DiscountType } from "@/types/DiscountType";
import getDiscountCoupons from "@/lib/courses/getDiscountCoupons";
import discountLogic from "./action/discountLogic";
import Hero from "./Components/Hero";
import { CourseType } from "@/types/CourseType";
import Heading from "./Components/Heading";
import SelectTeacher from "./Components/SelectTeacher";
import Timings from "./Components/Timings";
import SelectPlan from "./Components/SelectPlan";
import StartDate from "./Components/StartDate";
import SelectCounsellor from "./Components/SelectCounsellor";
import UnlockedPricing from "./Components/UnlockedPricing";
import LockedPricing from "./Components/LockedPricing";

export default function CourseDetailView() {
  const params = useParams();
  const id = params.id as string;
  const [course, setCourse] = useState<any | null>(null);
  const [otherDetails, setOtherDetails] = useState<OtherCourseType | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [selectedPlanIndex, setSelectedPlanIndex] = useState(0);
  const [selectedTeacher, setSelectedTeacher] = useState<TeacherType | null>(
    null,
  );
  const [selectedSchedule, setSelectedSchedule] = useState<ScheduleType | null>(
    null,
  );
  const [startDate, setStartDate] = useState<string>();
  const [counsellorId, setCounsellorId] = useState<string>();
  const [couponInput, setCouponInput] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [couponError, setCouponError] = useState<string>();
  const [isMentorOpen, setIsMentorOpen] = useState(false);
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
    const response = await createOrder();
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
      {/* 1. Hero Section */}
      <Hero url={course.image_url} alt={course.title} />

      <div className="max-w-7xl mx-auto px-6 lg:px-20 -mt-24 relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* 2. Selection Area */}
        <div className="lg:col-span-2 space-y-12">
          <Heading category={course.category} title={course.title} />

          {/* STEP 1: SELECT TEACHER */}
          <SelectTeacher
            isMentorOpen={isMentorOpen}
            setIsMentorOpen={setIsMentorOpen}
            selectedTeacher={selectedTeacher}
            otherDetails={otherDetails}
            setSelectedTeacher={setSelectedTeacher}
            setSelectedSchedule={setSelectedSchedule}
          />

          {/* STEP 2: SELECT TIMING */}
          <Timings
            selectedTeacher={selectedTeacher}
            availableSchedules={availableSchedules}
            setSelectedSchedule={setSelectedSchedule}
            selectedSchedule={selectedSchedule}
          />

          {/* STEP 3: SELECT PLAN */}
          <SelectPlan
            otherDetails={otherDetails}
            setSelectedPlanIndex={setSelectedPlanIndex}
            selectedPlanIndex={selectedPlanIndex}
          />

          {/* STEP 4: START DATE */}
          <StartDate setStartDate={setStartDate} />

          {/* STEP 5: Counsellor ID */}
          <SelectCounsellor setCounsellorId={setCounsellorId} />
        </div>

        {/* 3. RIGHT SIDE: STICKY PRICING CARD */}
        <div className="relative">
          <div className="sticky top-28 bg-zinc-900 text-white p-10 rounded-[3.5rem] shadow-2xl border border-zinc-800 overflow-hidden">
            {isReady ? (
              <UnlockedPricing
                course={course}
                basePrice={basePrice}
                gstAmount={gstAmount}
                couponInput={couponInput}
                setCouponInput={setCouponInput}
                handleApplyCoupon={handleApplyCoupon}
                appliedDiscount={appliedDiscount}
                finalPrice={finalPrice}
                selectedTeacher={selectedTeacher}
                handlePayment={handlePayment}
                selectedSchedule={selectedSchedule}
                startDate={startDate}
              />
            ) : (
              <LockedPricing
                selectedTeacher={selectedTeacher}
                selectedSchedule={selectedSchedule}
                startDate={startDate}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
