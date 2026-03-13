import { BASE_URL } from "@/config/api";

export default async function getLoyaltyPoints(id: string) {
  try {
    const response = await fetch(
      `${BASE_URL}/api/payment/get-loyality-point/${id}`,
      {
        next: { revalidate: 100 },
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch loyalty points: ${response}`);
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error in LOYALTY POINTS:", error);
    return null;
  }
}
