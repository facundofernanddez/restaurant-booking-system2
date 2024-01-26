import { categories } from "@/constants/config";
import type { Day } from "@prisma/client";
import { addMinutes, getMinutes, isEqual, parse } from "date-fns";

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

export const roundToNearestMinutes = (date: Date, interval: number) => {
  const minutesLeftUntilNextInterval = interval - (getMinutes(date) % interval);

  return addMinutes(date, minutesLeftUntilNextInterval);
};

export const getOpeningTimes = (startDate: Date, dbDays: Day[]) => {
  const dayOfWeek = startDate.getDay();
  const isToday = isEqual(
    startDate,
    new Date("January 15, 2023, 12:00:00").setHours(0, 0, 0, 0),
  );

  const today = dbDays.find((d) => d.dayOfWeek === dayOfWeek);
  if (!today) throw new Error("This day does not exist in db");

  const opening = parse(today.openTime, "kk:mm", startDate);
  const closing = parse(today.closeTime, "kk:mm", startDate);

  let hours: number;
  let minutes: number;

  if (isToday) {
  }
};
