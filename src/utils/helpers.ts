import { categories } from "@/constants/config";

export const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export const selectOptions = categories.map((ctg) => ({
  value: ctg,
  label: capitalize(ctg),
}));

export const weekdayIndexToName = (index: number) => {
  const days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  return days[index];
};

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
