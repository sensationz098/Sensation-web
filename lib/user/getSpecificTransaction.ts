import { BASE_URL } from "@/config/api";

export default async function getSpecificTransaction(id: string) {
  const response = await fetch(
    `${BASE_URL}/api/payment/get-one-transaction/${id}`,
  ).then((res) => res.json());
  console.log(response);
}
