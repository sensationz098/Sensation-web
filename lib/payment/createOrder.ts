import { BASE_URL } from "@/config/api";

export default async function createOrder() {
  const response = await fetch(`${BASE_URL}/api/payment/create-order`, {});
}
