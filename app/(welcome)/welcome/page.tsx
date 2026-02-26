"use client";

import Categories from "@/components/Products/Categories";
import ExploreAll from "@/components/Products/ExploreAll";
import FeaturedProducts from "@/components/Products/FeaturedProducts";

export default function page() {
  return (
    <div>
      <Categories />
      <FeaturedProducts />
      <ExploreAll />
    </div>
  );
}
