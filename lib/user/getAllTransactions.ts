import { BASE_URL } from "@/config/api";

export default async function getAllTransactions(id: string) {
  const response = await fetch(
    `${BASE_URL}/api/payment/get-transaction/${id}`,
  ).then((res) => res.json());

  if (!response.status) {
    return null;
  } else {
    return response.data;
  }
}
