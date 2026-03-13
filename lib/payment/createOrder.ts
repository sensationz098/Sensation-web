import { DataType } from "@/app/(welcome)/welcome/course/[id]/actions/paymentLogic";
import { BASE_URL } from "@/config/api";

export default async function createOrder(data: DataType) {
  const response = await fetch(`${BASE_URL}/api/payment/create-order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    next: { revalidate: 0 },
  }).then((res) => res.json());
  if (response.status) return response.data;
  else return response.json({ success: false });
}
