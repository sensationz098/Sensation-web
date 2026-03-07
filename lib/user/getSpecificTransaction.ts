import { BASE_URL } from "@/config/api";

export default async function getSpecificTransaction(id: string) {
  const response = await fetch(
    `${BASE_URL}/api/payment/get-one-transaction/${id}`,
    {
      next: { revalidate: 10000 },
    },
  ).then((res) => res.json());
  if (!response.status) return null;
  return response.data;
}
