import Razorpay from "razorpay";

export const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_TEST_API!,
  key_secret: process.env.RAZORPAY_TEST_KEY_SECRET!,
});
