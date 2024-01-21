import type { categories } from "@/constants/config";

type DateType = {
  justDate: Date | null;
  dateTime: Date | null;
};

type Categories = (typeof categories)[number];
