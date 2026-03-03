import { BASE_URL } from "@/config/api";

export default async function getUserProfileDetails(id: string) {
  const response = await fetch(`${BASE_URL}/api/auth/get-profile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
    next: { revalidate: 0 },
  }).then((res) => res.json());
  // console.log("SPECIFIC DATA: ", response.data);
  return response.data;
}
