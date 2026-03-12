import { BASE_URL } from "@/config/api";

export default async function raiseTicket(data: any) {
  try {
    const response = await fetch(`${BASE_URL}/api/tickets/raise`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // CRITICAL: This was missing
      },
      body: JSON.stringify(data),
    });
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
}
