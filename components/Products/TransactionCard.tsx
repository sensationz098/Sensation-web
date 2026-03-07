import React from "react";
import {
  Receipt,
  Calendar,
  CreditCard,
  ChevronRight,
  Download,
} from "lucide-react";
import { TransactionType } from "@/types/TransactionType";

interface TransactionCardProps {
  transaction: TransactionType;
}

export const TransactionCard = ({ transaction }: TransactionCardProps) => {
  const brandOrange = "#DC8916";

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: currency || "INR",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="group relative bg-white border border-slate-100 rounded-[2rem] p-5 hover:shadow-xl hover:shadow-slate-200/50 hover:border-[#DC8916]/30 transition-all duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-slate-50 text-slate-400 group-hover:bg-[#DC8916]/10 group-hover:text-[#DC8916] transition-colors">
            <Receipt size={24} />
          </div>
          <div>
            <h4 className="font-bold text-slate-800 text-lg">
              Receipt #{transaction.receipt_id}
            </h4>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-400 mt-0.5">
              <span className="flex items-center gap-1">
                <Calendar size={14} />
                {formatDate(transaction.date_of_payment)}
              </span>
              <span className="flex items-center gap-1">
                <CreditCard size={14} />
                ID: {transaction.id.slice(0, 8)}...
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 pt-3 md:pt-0">
          <div className="text-left md:text-right">
            <p className="text-[10px] uppercase font-black tracking-widest text-slate-400">
              Amount Paid
            </p>
            <p className="text-xl font-black text-slate-900">
              {formatCurrency(transaction.grand_total, transaction.currency)}
            </p>
          </div>

          {/* <button className="flex items-center justify-center h-12 w-12 rounded-2xl bg-slate-50 text-slate-400 hover:bg-[#DC8916] hover:text-white transition-all group-hover:scale-105">
              <Download size={20} />
            </button> */}
        </div>
      </div>

      <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <ChevronRight size={16} className="text-[#DC8916]" />
      </div>
    </div>
  );
};
