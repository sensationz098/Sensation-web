export interface SpecificTransactionType {
  amount: number;
  counsellor: string | null;
  course_name: string;
  currency: string;
  date_of_payment: string;
  discount: number | null;
  grand_total: number;
  gst_percentage: number;
  payment_id: string;
  payment_status: string;
  profile: string;
  receipt_id: string;
  tax: number;
  teacher_name: string;
}
