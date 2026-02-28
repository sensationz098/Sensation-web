import axios from "axios";

export const setCountry = async (country: string, router: any) => {
  const response = await axios.post("/api/auth/session/set-country", {
    country: country,
  });

  if (response.data.success) router.push("/welcome");
  else console.log("error setting country in cookies");
};
