import { BASE_URL } from "@/config/api";

export default async function handleMigration(email: string) {
  if (!email) return { error: "No email found", success: false };
  //change the email
  const url = `${BASE_URL}/api/user/migrate?email=${encodeURIComponent(email)}`;
  try {
    const response = await fetch(url).then((res) => res.json());
    if (!response.status) {
      return { error: "THERE IS NO ENROLLMENT", success: false };
    }
    return { success: true, course: response.data };
  } catch (error) {
    return { success: false, error: `${error}` };
  }
}
