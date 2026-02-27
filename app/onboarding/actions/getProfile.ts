import axios from "axios";
import { setCountry } from "./setCountry";
import { BASE_URL } from "@/config/api";

export const getProfile = async (id: string | undefined, router: any) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/auth/get-profile`, {
      id,
    });
    if (response.data.status) {
      const country = response.data.data.country;
      setCountry(country, router);
    } else {
      router.push("/onboarding/details");
    }
  } catch (error: any) {
    console.error("Profile not found or Server Error", error.response?.status);

    if (error.response?.status === 404) {
      router.push("/onboarding/details");
    }
  }
};
