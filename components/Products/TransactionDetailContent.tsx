import React from "react";
import {
  User,
  GraduationCap,
  Tag,
  Receipt,
  Calendar,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { SpecificTransactionType } from "@/types/SpecificTransactionType";

export const TransactionDetailContent = ({
  data,
}: {
  data: SpecificTransactionType;
}) => {
  const formatPrice = (val: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: data.currency || "INR",
    }).format(val);

  const isPaid =
    data.payment_status === "CAPTURED" || data.payment_status === "PAID";

  return (
    <div className="space-y-6 py-4">
      {/* Course Header */}
      <div className="flex justify-between items-start border-b pb-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900">
            {data.course_name}
          </h3>
          <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
            <User size={14} /> Teacher: {data.teacher_name}
          </p>
        </div>
        <div
          className={`px-3 py-1 rounded-full text-xs font-bold ${isPaid ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}
        >
          {data.payment_status}
        </div>
      </div>

      {/* Payment Breakdown */}
      <div className="bg-slate-50 rounded-2xl p-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-slate-500">Base Amount</span>
          <span className="font-medium">{formatPrice(data.amount)}</span>
        </div>
        {data.discount && data.discount > 0 && (
          <div className="flex justify-between text-sm text-green-600">
            <span>Discount</span>
            <span>-{formatPrice(data.discount)}</span>
          </div>
        )}
        <div className="flex justify-between text-sm">
          <span className="text-slate-500">Tax ({data.gst_percentage}%)</span>
          <span className="font-medium">+{formatPrice(data.tax)}</span>
        </div>
        <div className="flex justify-between pt-2 border-t font-bold text-lg text-[#DC8916]">
          <span>Total Paid</span>
          <span>{formatPrice(data.grand_total)}</span>
        </div>
      </div>

      {/* Metadata Footnote */}
      <div className="grid grid-cols-2 gap-4 text-[11px] text-slate-400 uppercase tracking-wider font-bold">
        <div>
          <p>Receipt ID</p>
          <p className="text-slate-600 font-mono mt-1">
            {data.receipt_id.slice(0, 15)}...
          </p>
        </div>
        <div>
          <p>Counsellor</p>
          <p className="text-slate-600 mt-1">{data.counsellor || "N/A"}</p>
        </div>
      </div>
    </div>
  );
};
