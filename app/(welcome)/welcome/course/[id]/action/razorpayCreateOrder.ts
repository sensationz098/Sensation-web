// razorpayCreateOrder.ts
import createOrder from "@/lib/payment/createOrder";
import { DataType } from "./paymentLogic";
import { BASE_URL } from "@/config/api";

// Define the window interface for TypeScript
declare global {
  interface Window {
    Razorpay: any;
  }
}

export default async function razorpayCreateOrder(data: DataType) {
  const res = await createOrder(data);
  const { id: order_id, amount, currency } = res;

  const options = {
    key: process.env.NEXT_PUBLIC_RAZORPAY_TEST_API,
    amount: amount,
    currency: currency || "INR",
    name: data.name,
    description: data.description,
    image: "/logo.png",
    order_id: order_id,
    prefill: {
      name: data.name,
      email: data.email,
      contact: data.contact,
    },
    theme: { color: "#F37254" },
    handler: async function (response: any) {
      alert("Payment Successful!");
    },
    modal: {
      ondismiss: function () {
        console.log("Checkout modal closed");
      },
    },
  };

  try {
    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (error) {
    console.error("Razorpay failed to open:", error);
  }
}
