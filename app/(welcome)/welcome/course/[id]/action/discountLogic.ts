import getDiscountCoupons from "@/lib/courses/getDiscountCoupons";
import { useCourseStore } from "@/store/useCourseStore";
import { DiscountType } from "@/types/DiscountType";

export default async function discountLogic(
  couponInput: string,
  finalPrice: number,
  setCouponError: any,
) {
  const { setDiscountId } = useCourseStore();
  const discountCoupons: DiscountType[] = await getDiscountCoupons();
  const filter = discountCoupons.filter(
    (d) => d.coupon_code === couponInput.toUpperCase(),
  );
  if (!filter || filter.length === 0) {
    setCouponError("COUPON NOT VALID!");
    console.log("COUPON NOT VALID!");
    return 0;
  }

  if (finalPrice < filter[0].min_amount) {
    setCouponError(`Only valid if amount > ${filter[0].min_amount}`);
    console.log(`Only valid if amount > ${filter[0].min_amount}`);

    return 0;
  }
  setDiscountId(filter[0].id);
  return filter[0].discount_amount;
}
