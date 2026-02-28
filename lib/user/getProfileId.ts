import { BASE_URL } from "@/config/api";

export default async function getProfileId(id: string) {
  console.log("Fetching Profile for ID: ", id);

  try {
    const response = await fetch(`${BASE_URL}/api/auth/get-profile`, {
      method: "POST", // 👈 CRITICAL: Must be POST to send a body
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
    console.log("Profile Data received:", result.data.id);
    return result.data.id;
  } catch (error) {
    console.error("Error in getProfileId:", error);
    return null;
  }
}
