import { BASE_URL } from "@/config/api";

export default async function getProfileId(id: string) {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/get-profile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
      next: { revalidate: 10000 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch profile: ${response.statusText}`);
    }

    const result = await response.json();
    return result.data.id;
  } catch (error) {
    console.error("Error in getProfileId:", error);
    return null;
  }
}
