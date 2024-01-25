import { categories } from "@/constants/config";

export const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export const selectOptions = categories.map((ctg) => ({
  value: ctg,
  label: capitalize(ctg),
}));
