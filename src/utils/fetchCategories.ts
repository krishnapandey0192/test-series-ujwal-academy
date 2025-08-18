// Utility to fetch categories for dropdown
import axiosInstance from "../utils/axiosInstance";

export async function fetchCategories() {
  const res = await axiosInstance.get("/api/categories");
  return res.data.categories || [];
}
