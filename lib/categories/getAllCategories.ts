import { BASE_URL } from "@/config/api";

export default async function getAllCategories() {
  const response = await fetch(`${BASE_URL}/api/course/categories`, {
    next: { revalidate: 7200 },
  }).then((res) => res.json());
  return response.data.categories;
}
