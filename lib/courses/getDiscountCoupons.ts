import { BASE_URL } from "@/config/api";

export default async function getDiscountCoupons() {
  const response = await fetch(`${BASE_URL}/api/coupon/active`, {
    next: { revalidate: 10 },
  }).then((res) => res.json());
  console.log(response.data.coupons);
  return response.data.coupons;
}
