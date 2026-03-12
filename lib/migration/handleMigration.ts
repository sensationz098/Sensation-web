import { BASE_URL } from "@/config/api";

export default async function handleMigration(email: string) {
  if (!email) return { error: "No email found", success: false };
  //change the email
  const url = `${BASE_URL}/api/user/migrate?email=${encodeURIComponent("gokrati2012@gmail.com")}`;

  const response = await fetch(url).then((res) => res.json());
  if (!response.status) {
    // console.log("THERE IS NO ENROLLMENT");
    return { error: "THERE IS NO ENROLLMENT", success: false };
  }
  //   console.log(response);
  return { success: true, course: response.data };
}
